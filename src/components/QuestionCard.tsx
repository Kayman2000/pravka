import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { Question, OptionLetter } from '@/data/content';
import { ProgressBar } from './ProgressBar';

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  answeredCount: number;
  selected: OptionLetter | undefined;
  onSelect: (letter: OptionLetter) => void;
  onBack: () => void;
  onNext: () => void;
  isLast: boolean;
}

export function QuestionCard({
  question,
  index,
  total,
  answeredCount,
  selected,
  onSelect,
  onBack,
  onNext,
  isLast,
}: QuestionCardProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [question.id]);

  return (
    <section className="animate-fadeIn" aria-labelledby={`q-${question.id}-title`}>
      <ProgressBar current={index + 1} total={total} answeredCount={answeredCount} />

      <fieldset className="mt-2">
        <legend className="sr-only">Вопрос {index + 1}</legend>
        <h2
          id={`q-${question.id}-title`}
          ref={headingRef}
          tabIndex={-1}
          className="text-pretty text-xl font-semibold leading-snug text-ink-800 sm:text-2xl"
        >
          {question.text}
        </h2>

        <div
          className="mt-5 grid gap-3 sm:grid-cols-2"
          role="radiogroup"
          aria-label={question.text}
        >
          {question.options.map((opt) => {
            const isSelected = selected === opt.letter;
            return (
              <label
                key={opt.letter}
                className={`group relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all duration-200 sm:p-5 ${
                  isSelected
                    ? 'border-moss-600 bg-moss-500/10 shadow-cardFocus'
                    : 'border-sand-200 bg-white shadow-card hover:border-moss-500/60 hover:bg-sand-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={opt.letter}
                  checked={isSelected}
                  onChange={() => onSelect(opt.letter)}
                  className="sr-only"
                />
                <span
                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-sm font-semibold transition-colors ${
                    isSelected
                      ? 'border-moss-600 bg-moss-600 text-white'
                      : 'border-sand-300 bg-white text-ink-600 group-hover:border-moss-500'
                  }`}
                  aria-hidden="true"
                >
                  {opt.letter}
                </span>
                <span
                  className={`text-[15px] leading-relaxed sm:text-base ${
                    isSelected ? 'text-ink-800' : 'text-ink-700'
                  }`}
                >
                  {opt.text}
                </span>
                <span
                  className="sr-only"
                  aria-checked={isSelected}
                  role="status"
                >
                  {isSelected ? 'Выбрано' : 'Не выбрано'}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-7 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-[15px] font-medium text-ink-600 transition-colors hover:bg-sand-100 hover:text-ink-800 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={index === 0}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Назад
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!selected}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-moss-600 px-7 text-[15px] font-semibold text-white shadow-card transition-all hover:bg-moss-700 disabled:cursor-not-allowed disabled:bg-ink-300 disabled:shadow-none"
        >
          {isLast ? (
            <>
              Показать результат
              <Check className="h-4 w-4" aria-hidden="true" />
            </>
          ) : (
            <>
              Далее
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
