import { useMemo } from 'react';
import {
  CTA_CONFIG,
  FINAL_TEXT,
  SCORES_NOTE,
  SECONDARY_EXPLANATION,
  SHORT_SECTION_TITLES,
  STRATEGY_DESCRIPTIONS,
  STRATEGY_NAMES,
  type StrategyDescription,
  type StrategyKey,
} from '@/data/content';
import type { ScoreResult } from '@/lib/scoring';
import { Disclaimer } from './Disclaimer';
import { RotateCcw, ExternalLink } from 'lucide-react';

interface ResultScreenProps {
  result: ScoreResult;
  onRestart: () => void;
}

function FullStrategy({ desc }: { desc: StrategyDescription }) {
  return (
    <article className="rounded-3xl border border-sand-200 bg-white p-6 shadow-card sm:p-8">
      <header className="mb-5 border-b border-sand-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-moss-600">
          Ведущая стратегия
        </p>
        <h3 className="mt-1 text-3xl font-semibold text-ink-900">
          «{desc.name}»
        </h3>
        <p className="mt-1 text-[15px] text-ink-500">{desc.subtitle}</p>
      </header>
      <div className="space-y-6">
        {desc.sections.map((section) => (
          <section key={section.title}>
            <h4 className="text-lg font-semibold text-ink-800">
              {section.title}
            </h4>
            {Array.isArray(section.body) ? (
              <div className="mt-2 space-y-1.5">
                {section.body.map((line, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-ink-600">
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                {section.body}
              </p>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

function ShortStrategy({ desc }: { desc: StrategyDescription }) {
  const shortSections = desc.sections.filter((s) =>
    SHORT_SECTION_TITLES.includes(s.title),
  );
  return (
    <article className="rounded-3xl border border-sand-200 bg-white/80 p-6 shadow-card sm:p-7">
      <header className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-clay-500">
          Сопутствующая стратегия
        </p>
        <h3 className="mt-1 text-2xl font-semibold text-ink-900">
          «{desc.name}»
        </h3>
        <p className="mt-1 text-sm text-ink-500">{desc.subtitle}</p>
      </header>
      <div className="space-y-4">
        {shortSections.map((section) => (
          <section key={section.title}>
            <h4 className="text-base font-semibold text-ink-800">
              {section.title}
            </h4>
            {Array.isArray(section.body) ? (
              <div className="mt-2 space-y-1.5">
                {section.body.map((line, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-ink-600">
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                {section.body}
              </p>
            )}
          </section>
        ))}
        <p className="border-t border-sand-200 pt-4 text-[15px] italic leading-relaxed text-ink-600">
          {SECONDARY_EXPLANATION}
        </p>
      </div>
    </article>
  );
}

export function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const { top1, top2, mixed, flexible, leading } = result;
  const primaryDesc = STRATEGY_DESCRIPTIONS[top1.key];
  const secondaryDesc = STRATEGY_DESCRIPTIONS[top2.key];

  const additionalLeading = useMemo(
    () => leading.slice(1).map((s) => STRATEGY_DESCRIPTIONS[s.key]),
    [leading],
  );

  const headerText = `По вашим ответам чаще всего проявляется стратегия «${STRATEGY_NAMES[top1.key]}», на втором месте — «${STRATEGY_NAMES[top2.key]}». Это не приговор, а моментальный снимок привычных стратегий, и он может меняться. Ниже — описание.`;

  return (
    <section className="mx-auto max-w-3xl animate-fadeIn px-5 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h2 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
          Спасибо за прохождение теста
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-600">
          {headerText}
        </p>
      </header>

      {(mixed || flexible) && (
        <div className="mb-8 space-y-3">
          {mixed && (
            <div className="rounded-2xl border border-clay-400/40 bg-clay-400/10 px-5 py-4">
              <p className="text-base font-semibold text-clay-600">
                Ваш профиль — смешанный
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Разрыв между ведущей и сопутствующей стратегией небольшой, поэтому обе
                могут проявляться почти одинаково часто.
              </p>
            </div>
          )}
          {flexible && (
            <div className="rounded-2xl border border-moss-500/40 bg-moss-500/10 px-5 py-4">
              <p className="text-base font-semibold text-moss-700">
                У вас гибкий набор стратегий
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Несколько стратегий идут вплотную — в разных ситуациях вы можете
                опираться на разные из них.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="space-y-6">
        <FullStrategy desc={primaryDesc} />

        {additionalLeading.map((desc) => (
          <ShortStrategy key={desc.key} desc={desc} />
        ))}

        <ShortStrategy desc={secondaryDesc} />
      </div>

      <div className="mt-8 rounded-2xl bg-sand-100 px-5 py-4">
        <p className="text-sm leading-relaxed text-ink-600">{SCORES_NOTE}</p>
      </div>

      <div className="mt-10 rounded-3xl border border-sand-200 bg-white p-6 shadow-card sm:p-8">
        <h3 className="text-xl font-semibold text-ink-800">Что дальше</h3>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-ink-600">
          {FINAL_TEXT}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={CTA_CONFIG.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-moss-600 px-8 text-base font-semibold text-white shadow-card transition-all hover:bg-moss-700"
          >
            {CTA_CONFIG.label}
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full px-6 text-base font-medium text-ink-600 transition-colors hover:bg-sand-100 hover:text-ink-800"
          >
            <RotateCcw className="h-5 w-5" aria-hidden="true" />
            Пройти заново
          </button>
        </div>
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </section>
  );
}
