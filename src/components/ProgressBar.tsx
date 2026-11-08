interface ProgressBarProps {
  current: number;
  total: number;
  answeredCount: number;
}

export function ProgressBar({ current, total, answeredCount }: ProgressBarProps) {
  const progressPercent = Math.round((answeredCount / total) * 100);
  const cappedPercent = answeredCount === total ? 100 : Math.min(progressPercent, 99);

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-sm font-medium text-ink-600">
        <span>
          Вопрос {current} из {total}
        </span>
        <span aria-hidden="true">{cappedPercent}%</span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-sand-200"
        role="progressbar"
        aria-valuenow={answeredCount}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Прогресс: отвечено ${answeredCount} из ${total} вопросов`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-moss-500 to-moss-600 transition-all duration-500 ease-out"
          style={{ width: `${cappedPercent}%` }}
        />
      </div>
    </div>
  );
}
