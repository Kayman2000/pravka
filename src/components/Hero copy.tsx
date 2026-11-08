import { ArrowRight } from 'lucide-react';
import { DISCLAIMER_TEXT, INSTRUCTION_TEXT } from '@/data/content';
import { Disclaimer } from './Disclaimer';

interface HeroProps {
  onStart: () => void;
  onOpenImportant: () => void;
}

export function Hero({ onStart, onOpenImportant }: HeroProps) {
  return (
    <header className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-moss-500/10 blur-3xl" />
        <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-clay-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-5 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-moss-600">
          Тест Вашей личности
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-[1.15] text-ink-900 sm:text-5xl">
          Узнайте свои привычные стратегии
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600 sm:text-xl">
          Тест показывает привычные стратегии — как вы чаще реагируете, принимаете решения
          и отдыхаете. Результат — повод для самонаблюдения, а не приговор.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-moss-600 px-8 text-base font-semibold text-white shadow-card transition-all hover:bg-moss-700"
          >
            Пройти тест
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onOpenImportant}
            className="inline-flex h-14 items-center justify-center rounded-full px-6 text-base font-medium text-ink-600 underline-offset-4 transition-colors hover:bg-sand-100 hover:text-ink-800 hover:underline"
          >
            Важно знать
          </button>
        </div>

        <p className="mt-3 text-sm text-ink-500">
          16 вопросов, около 3–5 минут.
        </p>
        <p className="mt-3 text-sm text-ink-500">
          Без регистрации и сбора данных. Результат — повод для самонаблюдения, а не диагноз. Данные ответов хранятся только в этом браузере и не передаются на сторонние серверы.
        </p>

        
      </div>
    </header>
  );
}

interface TestIntroProps {
  onStart: () => void;
  onBack: () => void;
}

export function TestIntro({ onStart, onBack }: TestIntroProps) {
  return (
    <section className="mx-auto max-w-2xl animate-fadeIn px-5 py-12 sm:px-6 sm:py-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-moss-600">
        Перед началом
      </p>
      <h2 className="text-2xl font-semibold text-ink-800 sm:text-3xl">
        Как проходить
      </h2>
      <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-600">
        {INSTRUCTION_TEXT}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onStart}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-moss-600 px-8 text-base font-semibold text-white shadow-card transition-all hover:bg-moss-700"
        >
          Начать
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-14 items-center justify-center rounded-full px-6 text-base font-medium text-ink-600 transition-colors hover:bg-sand-100 hover:text-ink-800"
        >
          На главную
        </button>
      </div>
      <p className="mt-6 text-sm text-ink-500">
        Напоминаем: {DISCLAIMER_TEXT}
      </p>
    </section>
  );
}
