import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mật khẩu', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Detect if request comes from localhost (server machine itself)
        const forwarded = req?.headers?.['x-forwarded-for'];
        const remoteIp = Array.isArray(forwarded) ? forwarded[0] : (forwarded?.split(',')[0] || '');
        const ip = remoteIp || (req as any)?.socket?.remoteAddress || '';
        const isLocalhost = ['127.0.0.1', '::1', '::ffff:127.0.0.1', 'localhost'].includes(ip);

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            student: true,
            teacher: true,
            parent: true,
          },
        });

        if (!user || user.status !== 'ACTIVE') {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

        // LAN machines can only log in as STUDENT
        if (!isLocalhost && user.role !== 'STUDENT') {
          throw new Error('LAN_STUDENT_ONLY');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role,
          studentId: user.student?.id,
          teacherId: user.teacher?.id,
          parentId: user.parent?.id,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.studentId = (user as any).studentId;
        token.teacherId = (user as any).teacherId;
        token.parentId = (user as any).parentId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.studentId = token.studentId as string | undefined;
        session.user.teacherId = token.teacherId as string | undefined;
        session.user.parentId = token.parentId as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: { httpOnly: true, sameSite: 'lax', path: '/', secure: false },
    },
    callbackUrl: {
      name: 'next-auth.callback-url',
      options: { sameSite: 'lax', path: '/', secure: false },
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: { httpOnly: true, sameSite: 'lax', path: '/', secure: false },
    },
  },
};

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      studentId?: string;
      teacherId?: string;
      parentId?: string;
    };
  }
}
