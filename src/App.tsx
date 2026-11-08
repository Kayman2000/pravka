import { useEffect, useMemo, useState } from 'react';
import { QUESTIONS, type OptionLetter } from '@/data/content';
import { calculateScores, type AnswersMap, type ScoreResult } from '@/lib/scoring';
import { Hero, TestIntro } from '@/components/Hero';
import { ImportantModal } from '@/components/ImportantModal';
import { QuestionCard } from '@/components/QuestionCard';
import { ResultScreen } from '@/components/ResultScreen';

type Stage = 'hero' | 'intro' | 'test' | 'result';

const TOTAL = QUESTIONS.length;
const STORAGE_KEY = 'mirror-test:answers';
const STAGE_KEY = 'mirror-test:stage';

function loadAnswers(): AnswersMap {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed as AnswersMap;
  } catch {
    /* ignore */
  }
  return {};
}

export default function App() {
  const [stage, setStage] = useState<Stage>('hero');
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showImportant, setShowImportant] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [showUnansweredHint, setShowUnansweredHint] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(STAGE_KEY);
    if (saved === 'test' || saved === 'intro' || saved === 'result' || saved === 'hero') {
      setStage(saved);
      setAnswers(loadAnswers());
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      sessionStorage.setItem(STAGE_KEY, stage);
    } catch {
      /* ignore */
    }
  }, [answers, stage]);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const resetTest = () => {
    setAnswers({});
    setResult(null);
    setCurrentIdx(0);
    setShowUnansweredHint(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const handleSelect = (letter: OptionLetter) => {
    const qid = QUESTIONS[currentIdx].id;
    setAnswers((prev) => ({ ...prev, [qid]: letter }));
    setShowUnansweredHint(false);
  };

  const handleNext = () => {
    const qid = QUESTIONS[currentIdx].id;
    if (!answers[qid]) {
      setShowUnansweredHint(true);
      return;
    }

    if (currentIdx < TOTAL - 1) {
      setCurrentIdx((i) => i + 1);
      return;
    }

    // last question -> compute result, but ensure all answered
    const firstUnanswered = QUESTIONS.find((q) => !answers[q.id]);
    if (firstUnanswered) {
      const idx = QUESTIONS.findIndex((q) => q.id === firstUnanswered.id);
      setCurrentIdx(idx);
      setShowUnansweredHint(true);
      return;
    }

    const res = calculateScores(answers);
    setResult(res);
    setStage('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setShowUnansweredHint(false);
    if (currentIdx > 0) {
      setCurrentIdx((i) => i - 1);
    } else {
      setStage('intro');
    }
  };

  const startTest = () => {
    setCurrentIdx(0);
    setStage('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToHero = () => {
    setStage('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <main>
        {stage === 'hero' && (
          <Hero
            onStart={() => setStage('intro')}
            onOpenImportant={() => setShowImportant(true)}
          />
        )}

        {stage === 'intro' && (
          <TestIntro onStart={startTest} onBack={goToHero} />
        )}

        {stage === 'test' && (
          <div className="mx-auto max-w-2xl px-5 py-8 sm:px-6 sm:py-12">
            <QuestionCard
              question={QUESTIONS[currentIdx]}
              index={currentIdx}
              total={TOTAL}
              answeredCount={answeredCount}
              selected={answers[QUESTIONS[currentIdx].id]}
              onSelect={handleSelect}
              onBack={handleBack}
              onNext={handleNext}
              isLast={currentIdx === TOTAL - 1}
            />
            {showUnansweredHint && (
              <p
                role="alert"
                className="mt-4 rounded-xl bg-clay-400/15 px-4 py-3 text-sm font-medium text-clay-600"
              >
                Выберите один из вариантов, чтобы продолжить.
              </p>
            )}
          </div>
        )}

        {stage === 'result' && result && (
          <ResultScreen result={result} onRestart={resetTest} />
        )}
      </main>

      <footer className="border-t border-sand-200 bg-white/60">
        <div className="mx-auto max-w-3xl px-5 py-8 text-center text-sm text-ink-500 sm:px-6">
          <p>
            Результат — повод для самонаблюдения, а не диагноз.
            Данные ответов хранятся только в этом браузере и не передаются
            на сторонние серверы.
          </p>
        </div>
      </footer>

      <ImportantModal open={showImportant} onClose={() => setShowImportant(false)} />
    </div>
  );
}
