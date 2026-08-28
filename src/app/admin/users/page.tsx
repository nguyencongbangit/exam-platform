'use client';

import { useEffect, useState, useCallback } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Pagination from '@/components/ui/Pagination';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import Modal from '@/components/ui/Modal';
import { getRoleLabel, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

const ROLES = [
  { value: 'STUDENT', label: 'Học sinh' },
  { value: 'TEACHER', label: 'Giáo viên' },
  { value: 'PARENT', label: 'Phụ huynh' },
  { value: 'ADMIN', label: 'Quản trị viên' },
];

const STATUSES = [
  { value: 'ACTIVE', label: 'Hoạt động' },
  { value: 'INACTIVE', label: 'Không hoạt động' },
  { value: 'BANNED', label: 'Bị cấm' },
];

const emptyAddForm = { email: '', password: '', fullName: '', role: 'STUDENT', phone: '' };
const emptyEditForm = { id: '', fullName: '', email: '', phone: '', role: 'STUDENT', status: 'ACTIVE', password: '' };

const roleVariants: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'default'> = {
  STUDENT: 'primary', TEACHER: 'success', PARENT: 'warning', ADMIN: 'danger',
};

const statusVariants: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
  ACTIVE: 'success', INACTIVE: 'warning', BANNED: 'danger',
};

const statusLabel: Record<string, string> = {
  ACTIVE: 'Hoạt động', INACTIVE: 'Không hoạt động', BANNED: 'Bị cấm',
};

export default function AdminUsersPage() {
  // List state
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Add modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState(emptyAddForm);
  const [addSubmitting, setAddSubmitting] = useState(false);
  const [addError, setAddError] = useState('');

  // Edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editError, setEditError] = useState('');

  // Delete dialog
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; fullName: string } | null>(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  const buildQuery = useCallback((p: number) => {
    const params = new URLSearchParams({ page: String(p), limit: '20' });
    if (search) params.set('search', search);
    if (roleFilter) params.set('role', roleFilter);
    if (statusFilter) params.set('status', statusFilter);
    return `/api/admin/users?${params.toString()}`;
  }, [search, roleFilter, statusFilter]);

  function loadUsers(p = page) {
    setLoading(true);
    fetch(buildQuery(p))
      .then((r) => r.json())
      .then((d) => { setUsers(d.users || []); setTotal(d.total || 0); setLoading(false); })
      .catch(() => setLoading(false));
  }

  useEffect(() => { loadUsers(page); }, [page, search, roleFilter, statusFilter]);

  // Search on Enter or button
  function applySearch() {
    setSearch(searchInput);
    setPage(1);
  }

  function handleSearchKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') applySearch();
  }

  function handleRoleFilter(val: string) { setRoleFilter(val); setPage(1); }
  function handleStatusFilter(val: string) { setStatusFilter(val); setPage(1); }

  // ---- ADD ----
  function openAddModal() {
    setAddForm(emptyAddForm);
    setAddError('');
    setShowAddModal(true);
  }

  async function handleAddSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAddSubmitting(true);
    setAddError('');
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm),
      });
      const data = await res.json();
      if (!res.ok) { setAddError(data.error || 'Có lỗi xảy ra'); return; }
      toast.success(`Đã tạo tài khoản "${data.fullName}" thành công!`);
      setShowAddModal(false);
      setPage(1);
      setSearch('');
      setSearchInput('');
      setRoleFilter('');
      setStatusFilter('');
      loadUsers(1);
    } catch {
      setAddError('Không thể kết nối đến server');
    } finally {
      setAddSubmitting(false);
    }
  }

  // ---- EDIT ----
  function openEditModal(user: any) {
    setEditForm({
      id: user.id,
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'STUDENT',
      status: user.status || 'ACTIVE',
      password: '',
    });
    setEditError('');
    setShowEditModal(true);
  }

  async function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEditSubmitting(true);
    setEditError('');
    try {
      const res = await fetch(`/api/admin/users/${editForm.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: editForm.fullName,
          email: editForm.email,
          phone: editForm.phone,
          role: editForm.role,
          status: editForm.status,
          password: editForm.password || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setEditError(data.error || 'Có lỗi xảy ra'); return; }
      toast.success(`Đã cập nhật tài khoản "${data.fullName}" thành công!`);
      setShowEditModal(false);
      loadUsers(page);
    } catch {
      setEditError('Không thể kết nối đến server');
    } finally {
      setEditSubmitting(false);
    }
  }

  // ---- DELETE ----
  function openDeleteDialog(user: any) {
    setDeleteTarget({ id: user.id, fullName: user.fullName });
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteSubmitting(true);
    try {
      const res = await fetch(`/api/admin/users/${deleteTarget.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || 'Có lỗi khi xóa'); return; }
      toast.success(`Đã xóa tài khoản "${deleteTarget.fullName}"`);
      setDeleteTarget(null);
      // if last item on page, go back
      const newPage = users.length === 1 && page > 1 ? page - 1 : page;
      setPage(newPage);
      loadUsers(newPage);
    } catch {
      toast.error('Không thể kết nối đến server');
    } finally {
      setDeleteSubmitting(false);
    }
  }

  if (loading && users.length === 0) return <PageLoader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Người dùng</h1>
          <p className="text-gray-500 text-sm">Tổng: {total} người dùng</p>
        </div>
        <Button onClick={openAddModal}>+ Thêm người dùng</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="py-3 px-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="flex gap-2 flex-1 min-w-[220px]">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder="Tìm tên hoặc email..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button size="sm" onClick={applySearch}>Tìm</Button>
              {(search || roleFilter || statusFilter) && (
                <Button size="sm" variant="ghost" onClick={() => {
                  setSearchInput(''); setSearch(''); setRoleFilter(''); setStatusFilter(''); setPage(1);
                }}>Xóa lọc</Button>
              )}
            </div>

            {/* Role filter */}
            <select
              value={roleFilter}
              onChange={(e) => handleRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả vai trò</option>
              {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả trạng thái</option>
              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Người dùng</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Vai trò</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Trạng thái</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Tham gia</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-400">Không tìm thấy người dùng nào</td>
                  </tr>
                ) : users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold">
                          {user.fullName?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.fullName}</div>
                          {user.phone && <div className="text-xs text-gray-400">{user.phone}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{user.email}</td>
                    <td className="px-4 py-4 text-center">
                      <Badge variant={roleVariants[user.role] || 'default'}>{getRoleLabel(user.role)}</Badge>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Badge variant={statusVariants[user.status] || 'default'}>
                        {statusLabel[user.status] || user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-center text-gray-500">{formatDate(user.createdAt)}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <Button variant="ghost" size="xs" onClick={() => openEditModal(user)}>Sửa</Button>
                        <button
                          onClick={() => openDeleteDialog(user)}
                          className="text-xs px-2 py-1 rounded text-red-600 hover:bg-red-50 border border-red-200 font-medium transition"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {total > 20 && (
            <div className="flex justify-center py-4">
              <Pagination page={page} totalPages={Math.ceil(total / 20)} onPageChange={setPage} />
            </div>
          )}
        </CardBody>
      </Card>

      {/* ---- ADD MODAL ---- */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Thêm người dùng mới" size="md">
        <form onSubmit={handleAddSubmit} className="px-6 py-4 space-y-4">
          {addError && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-2 rounded-lg border border-red-200">{addError}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
            <input type="text" required value={addForm.fullName}
              onChange={(e) => setAddForm({ ...addForm, fullName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nguyễn Văn A" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input type="email" required value={addForm.email}
              onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu * (tối thiểu 6 ký tự)</label>
            <input type="password" required minLength={6} value={addForm.password}
              onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò *</label>
            <select required value={addForm.role}
              onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input type="tel" value={addForm.phone}
              onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0901234567" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1" disabled={addSubmitting}>
              {addSubmitting ? 'Đang tạo...' : 'Tạo tài khoản'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)} disabled={addSubmitting}>Hủy</Button>
          </div>
        </form>
      </Modal>

      {/* ---- EDIT MODAL ---- */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Chỉnh sửa người dùng" size="md">
        <form onSubmit={handleEditSubmit} className="px-6 py-4 space-y-4">
          {editError && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-2 rounded-lg border border-red-200">{editError}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
            <input type="text" required value={editForm.fullName}
              onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nguyễn Văn A" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input type="email" required value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input type="tel" value={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0901234567" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò *</label>
            <select required value={editForm.role}
              onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái *</label>
            <select required value={editForm.status}
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu mới <span className="text-gray-400 font-normal">(để trống = không đổi)</span>
            </label>
            <input type="password" minLength={6} value={editForm.password}
              onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1" disabled={editSubmitting}>
              {editSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowEditModal(false)} disabled={editSubmitting}>Hủy</Button>
          </div>
        </form>
      </Modal>

      {/* ---- DELETE DIALOG ---- */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Xác nhận xóa người dùng" size="sm">
        <div className="px-6 py-4 space-y-4">
          <p className="text-gray-700 text-sm">
            Bạn có chắc chắn muốn xóa tài khoản{' '}
            <span className="font-semibold text-gray-900">"{deleteTarget?.fullName}"</span> không?
            Hành động này không thể hoàn tác.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={deleteSubmitting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition disabled:opacity-60"
            >
              {deleteSubmitting ? 'Đang xóa...' : 'Xóa tài khoản'}
            </button>
            <Button type="button" variant="ghost" onClick={() => setDeleteTarget(null)} disabled={deleteSubmitting}>Hủy</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
