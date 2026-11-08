import {
  SCORING_KEY,
  STRATEGY_ORDER,
  type OptionLetter,
  type StrategyKey,
} from '@/data/content';

export interface ScoredStrategy {
  key: StrategyKey;
  score: number;
}

export interface ScoreResult {
  sorted: ScoredStrategy[];
  top1: ScoredStrategy;
  top2: ScoredStrategy;
  top3: ScoredStrategy;
  leading: ScoredStrategy[];
  mixed: boolean;
  flexible: boolean;
}

export type AnswersMap = Record<number, OptionLetter>;

export function calculateScores(answers: AnswersMap): ScoreResult {
  const scores: Record<StrategyKey, number> = {
    avtonom: 0,
    mayak: 0,
    opora: 0,
    dvigatel: 0,
    estet: 0,
    architector: 0,
  };

  let total = 0;
  for (const [qidStr, letter] of Object.entries(answers)) {
    const qid = Number(qidStr);
    const map = SCORING_KEY[qid];
    if (!map) continue;
    const strategy = map[letter];
    if (!strategy) continue;
    scores[strategy] += 1;
    total += 1;
  }

  const sorted: ScoredStrategy[] = STRATEGY_ORDER.map((key) => ({
    key,
    score: scores[key],
  })).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return 0;
  });

  const [top1, top2, top3] = sorted;
  const maxScore = top1.score;
  const leading = sorted.filter((s) => s.score === maxScore);

  const mixed = top1.score - top2.score < 2;
  const flexible = top1.score - top3.score <= 2;

  if (total !== sorted.reduce((acc, s) => acc + s.score, 0)) {
    console.warn('[test] score total mismatch', { total });
  }
  console.debug('[test] scores', { scores, sorted, total, mixed, flexible, leading });

  return { sorted, top1, top2, top3, leading, mixed, flexible };
}
