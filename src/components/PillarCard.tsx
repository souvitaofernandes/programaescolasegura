import { PillarScore, ScoreBand } from '@/lib/types';
import { getBandColor, getBandLabel } from '@/lib/scoring';

interface PillarCardProps {
  pillarScore: PillarScore;
  showBar?: boolean;
}

const bandBgClasses: Record<ScoreBand, string> = {
  critico: 'bg-red-50 border-red-200',
  atencao: 'bg-amber-50 border-amber-200',
  adequado: 'bg-blue-50 border-blue-200',
  avancado: 'bg-green-50 border-green-200',
};

export default function PillarCard({ pillarScore, showBar = true }: PillarCardProps) {
  const color = getBandColor(pillarScore.band);
  const label = getBandLabel(pillarScore.band);

  return (
    <div className={`rounded-xl border p-5 ${bandBgClasses[pillarScore.band]}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-navy-900 leading-tight flex-1 mr-3">
          {pillarScore.pillarName}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-2xl font-bold" style={{ color }}>
            {Math.round(pillarScore.score)}
          </span>
          <span className="text-xs text-text-muted">/100</span>
        </div>
      </div>
      {showBar && (
        <div className="mb-2">
          <div className="h-2 w-full rounded-full bg-white/60">
            <div
              className="h-2 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${pillarScore.score}%`, backgroundColor: color }}
            />
          </div>
        </div>
      )}
      <span
        className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
        style={{ color, backgroundColor: `${color}15` }}
      >
        {label}
      </span>
    </div>
  );
}
