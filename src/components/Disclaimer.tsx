import { DISCLAIMER_TEXT } from '@/data/content';
import swin from './swin.png';

export function Disclaimer({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-sand-200 bg-white/70 overflow-hidden ${className}`}
    >
      <img
        src={swin}
        alt="Важно знать"
        className="w-full block object-cover"
      />
    </div>
  );
}