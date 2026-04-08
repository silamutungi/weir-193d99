import { DollarSign, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'

interface MatchItem {
  id: string
  platform: string
  description: string
  risk: 'high' | 'medium' | 'low'
  date: string
}

const RISK_COLORS: Record<string, string> = {
  high: '#E53E3E',
  medium: '#ED8936',
  low: '#38A169',
}

const SAMPLE_MATCHES: MatchItem[] = [
  { id: '1', platform: 'Instagram', description: 'Nike ad campaign using your likeness without authorization — commercial post with 240K impressions.', risk: 'high', date: 'Apr 5, 2026' },
  { id: '2', platform: 'TikTok', description: 'AI-generated deepfake video featuring your face in a supplement brand ad.', risk: 'high', date: 'Apr 4, 2026' },
  { id: '3', platform: 'YouTube', description: 'Fitness brand tutorial referencing your coaching methods and using your name in the title.', risk: 'medium', date: 'Apr 3, 2026' },
  { id: '4', platform: 'News', description: 'ESPN editorial article referencing your performance stats — fair use likely applies.', risk: 'low', date: 'Apr 2, 2026' },
]

export default function MatchesFeed() {
  function handleAction(id: string, action: string) {
    console.log(`Action: ${action} on match ${id}`)
  }

  return (
    <div className="space-y-4">
      {SAMPLE_MATCHES.map((match) => (
        <div
          key={match.id}
          className="rounded-xl bg-white p-5"
          style={{
            borderLeft: `4px solid ${RISK_COLORS[match.risk]}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full capitalize"
                  style={{
                    backgroundColor: `${RISK_COLORS[match.risk]}14`,
                    color: RISK_COLORS[match.risk],
                  }}
                >
                  {match.risk} risk
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full border" style={{ color: '#4A5568', borderColor: '#E2E8F0' }}>
                  {match.platform}
                </span>
                <span className="text-xs" style={{ color: '#A0AEC0' }}>{match.date}</span>
              </div>
              <p className="text-sm" style={{ color: '#2D3748' }}>{match.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              size="sm"
              className="min-h-[36px] text-xs font-semibold"
              style={{ backgroundColor: '#E53E3E', color: '#ffffff' }}
              onClick={() => handleAction(match.id, 'takedown')}
            >
              <XCircle size={14} className="mr-1" aria-hidden="true" /> Take Down
            </Button>
            <Button
              size="sm"
              className="min-h-[36px] text-xs font-semibold"
              style={{ backgroundColor: '#38A169', color: '#ffffff' }}
              onClick={() => handleAction(match.id, 'monetize')}
            >
              <DollarSign size={14} className="mr-1" aria-hidden="true" /> Monetize
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="min-h-[36px] text-xs font-semibold"
              onClick={() => handleAction(match.id, 'approve')}
            >
              <CheckCircle size={14} className="mr-1" aria-hidden="true" /> Approve
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
