'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';
import { cn } from '@/lib/utils';

interface Option {
  id: string;
  optionKey: string;
  content: string;
}

interface QuestionCardProps {
  questionNumber: number;
  content: string;
  options: Option[];
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
}

function renderLatex(text: string): string {
  // Replace display math $$...$$ then inline $...$
  return text
    .replace(/\$\$(.+?)\$\$/g, (_, math) => {
      try { return katex.renderToString(math, { displayMode: true, throwOnError: false }); } catch { return math; }
    })
    .replace(/\$(.+?)\$/g, (_, math) => {
      try { return katex.renderToString(math, { displayMode: false, throwOnError: false }); } catch { return math; }
    })
    .replace(/\\begin\{cases\}([\s\S]+?)\\end\{cases\}/g, (_, inner) => {
      try { return katex.renderToString(`\\begin{cases}${inner}\\end{cases}`, { displayMode: true, throwOnError: false }); } catch { return _; }
    });
}

function LatexContent({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = renderLatex(text);
    }
  }, [text]);
  return <div ref={ref} className={cn('katex-question', className)} />;
}

export default function QuestionCard({ questionNumber, content, options, selectedOptionId, onSelect }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
      <div className="flex gap-3 mb-6">
        <span className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
          {questionNumber}
        </span>
        <LatexContent text={content} className="text-gray-800 leading-relaxed text-base" />
      </div>

      <div className="space-y-3">
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          return (
            <label
              key={opt.id}
              className={cn(
                'option-label',
                isSelected && 'selected'
              )}
            >
              <input
                type="radio"
                name="answer"
                value={opt.id}
                checked={isSelected}
                onChange={() => onSelect(opt.id)}
                className="sr-only"
              />
              <span className={cn(
                'shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors',
                isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              )}>
                {opt.optionKey}
              </span>
              <LatexContent text={opt.content} className="text-sm text-gray-700 leading-relaxed" />
            </label>
          );
        })}
      </div>
    </div>
  );
}
