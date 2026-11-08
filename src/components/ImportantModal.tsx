import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { DISCLAIMER_TEXT } from '@/data/content';

interface ImportantModalProps {
  open: boolean;
  onClose: () => void;
}

export function ImportantModal({ open, onClose }: ImportantModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink-900/40 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="important-modal-title"
    >
      <div
        ref={dialogRef}
        className="my-8 w-full max-w-xl animate-scaleIn rounded-3xl border border-sand-200 bg-sand-50 p-6 shadow-card sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="important-modal-title"
            className="text-xl font-semibold text-ink-800 sm:text-2xl"
          >
            Важно знать
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink-600 transition-colors hover:bg-sand-100 hover:text-ink-800"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
          {DISCLAIMER_TEXT}
        </p>
      </div>
    </div>
  );
}
