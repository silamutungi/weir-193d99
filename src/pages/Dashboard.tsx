import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency, formatDate } from '../lib/utils'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Shield, TrendingUp, AlertTriangle, CheckCircle, DollarSign, Zap, Eye, XCircle } from 'lucide-react'
import type { NilMatch, RiskLevel, ActionType } from '../types'
import Navbar from '../components/Navbar'

const SEED_MATCHES: NilMatch[] = [
  { id: '1', user_id: 'demo', platform: 'Instagram', url: 'https://instagram.com/p/abc123', title: 'Nike ad using your likeness without authorization', description: 'Commercial post featuring your image in a sponsored Nike campaign. High revenue potential.', risk_level: 'high', action: 'pending', estimated_revenue: 4200, detected_at: '2024-07-10T09:15:00Z', created_at: '2024-07-10T09:15:00Z', deleted_at: null },
  { id: '2', user_id: 'demo', platform: 'YouTube', url: 'https://youtube.com/watch?v=xyz', title: 'Fitness brand tutorial featuring your name', description: 'Educational video referencing your coaching methods and name prominently in title and description.', risk_level: 'medium', action: 'pending', estimated_revenue: 980, detected_at: '2024-07-09T14:22:00Z', created_at: '2024-07-09T14:22:00Z', deleted_at: null },
  { id: '3', user_id: 'demo', platform: 'TikTok', url: 'https://tiktok.com/@brand/video/123', title: 'Energy drink using your image in AI-generated content', description: 'AI-generated video using a deepfake of your likeness to promote a beverage brand.', risk_level: 'high', action: 'pending', estimated_revenue: 6100, detected_at: '2024-07-09T08:00:00Z', created_at: '2024-07-09T08:00:00Z', deleted_at: null },
  { id: '4', user_id: 'demo', platform: 'News', url: 'https://espn.com/article/456', title: 'ESPN article referencing your performance stats', description: 'Editorial sports article. Fair use likely applies — low enforcement priority.', risk_level: 'low', action: 'approve', estimated_revenue: 0, detected_at: '2024-07-08T18:45:00Z', created_at: '2024-07-08T18:45:00Z', deleted_at: null },
  { id: '5', user_id: 'demo', platform: 'Twitter', url: 'https://twitter.com/brand/status/789', title: 'Supplement brand quoting your endorsement', description: 'Brand claiming your endorsement without a signed deal. Misrepresentation risk.', risk_level: 'high', action: 'pending', estimated_revenue: 2800, detected_at: '2024-07-08T12:00:00Z', created_at: '2024-07-08T12:00:00Z', deleted_at: null },
  { id: '6', user_id: 'demo', platform: 'Commercial', url: 'https://example-brand.com/ad', title: 'Local car dealership using your image', description: 'Regional ad campaign using a photo from your public Instagram without permission.', risk_level: 'medium', action: 'pending', estimated_revenue: 1500, detected_at: '2024-07-07T10:30:00Z', created_at: '2024-07-07T10:30:00Z', deleted_at: null },
]

const RISK_CONFIG: Record<RiskLevel, { label: string; color: string; bg: string }> = {
  high: { label: 'High Risk', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
  medium: { label: 'Medium Risk', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
  low: { label: 'Low Risk', color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
}

export default function Dashboard() {
  const [matches, setMatches] = useState<NilMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<RiskLevel | 'all'>('all')

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured || !supabase) {
        setMatches(SEED_MATCHES)
        setLoading(false)
        return
      }
      const { data } = await supabase
        .from('nil_matches')
        .select('*')
        .is('deleted_at', null)
        .order('detected_at', { ascending: false })
      setMatches(data ?? SEED_MATCHES)
      setLoading(false)
    }
    load()
  }, [])

  async function handleAction(id: string, action: ActionType) {
    setMatches((prev) => prev.map((m) => (m.id === id ? { ...m, action } : m)))
    if (isSupabaseConfigured && supabase) {
      await supabase.from('nil_matches').update({ action }).eq('id', id)
    }
  }

  const filtered = filter === 'all' ? matches : matches.filter((m) => m.risk_level === filter)
  const pending = matches.filter((m) => m.action === 'pending')
  const totalRevenue = matches.filter((m) => m.action === 'monetize').reduce((s, m) => s + m.estimated_revenue, 0)
  const protectionScore = Math.max(0, 100 - pending.length * 8)

  const stats = [
    { label: 'Protection Score', value: `${protectionScore}`, suffix: '/100', icon: Shield, color: 'var(--color-primary)' },
    { label: 'Monthly Earnings', value: formatCurrency(totalRevenue), suffix: '', icon: DollarSign, color: 'var(--color-success)' },
    { label: 'Total Matches', value: `${matches.length}`, suffix: '', icon: Eye, color: 'var(--color-accent)' },
    { label: 'Pending Actions', value: `${pending.length}`, suffix: '', icon: AlertTriangle, color: 'var(--color-warning)' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      {!isSupabaseConfigured && (
        <div className="text-center py-2.5 text-sm font-medium" style={{ backgroundColor: 'rgba(30,64,175,0.12)', color: 'var(--color-info)' }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Identity Dashboard</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Real-time monitoring of your name, image, and likeness across the web.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-overline)' }}>{s.label}</span>
                  <Icon size={16} style={{ color: s.color }} aria-hidden="true" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{s.value}</span>
                  {s.suffix && <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{s.suffix}</span>}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mb-6 flex items-center gap-3 flex-wrap">
          <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Filter:</span>
          {(['all', 'high', 'medium', 'low'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors min-h-[36px]"
              style={{
                backgroundColor: filter === f ? 'var(--color-primary)' : 'transparent',
                color: filter === f ? '#ffffff' : 'var(--color-text-secondary)',
                borderColor: filter === f ? 'var(--color-primary)' : 'var(--color-border)',
              }}
            >
              {f === 'all' ? 'All matches' : RISK_CONFIG[f].label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-24" style={{ color: 'var(--color-text-muted)' }}>
            <Zap size={32} className="mx-auto mb-3 animate-pulse" style={{ color: 'var(--color-primary)' }} />
            <p className="text-sm">Scanning for identity matches...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
            <CheckCircle size={32} className="mx-auto mb-3" style={{ color: 'var(--color-success)' }} />
            <p className="font-semibold" style={{ color: 'var(--color-text)' }}>No matches in this category</p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Your identity is clean in this risk tier.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((match) => {
              const risk = RISK_CONFIG[match.risk_level]
              return (
                <div key={match.id} className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: risk.bg, color: risk.color }}>{risk.label}</span>
                        <Badge variant="outline" className="text-xs">{match.platform}</Badge>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{formatDate(match.detected_at)}</span>
                      </div>
                      <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{match.title}</h3>
                      <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{match.description}</p>
                    </div>
                    {match.estimated_revenue > 0 && (
                      <div className="text-right shrink-0">
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Est. value</p>
                        <p className="font-bold text-sm" style={{ color: 'var(--color-success)' }}>{formatCurrency(match.estimated_revenue)}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {match.action === 'pending' ? (
                      <>
                        <Button size="sm" className="min-h-[36px] text-xs font-semibold" style={{ backgroundColor: 'var(--color-error)', color: '#ffffff' }} onClick={() => handleAction(match.id, 'takedown')}>
                          <XCircle size={14} className="mr-1" aria-hidden="true" /> Take Down
                        </Button>
                        <Button size="sm" className="min-h-[36px] text-xs font-semibold" style={{ backgroundColor: 'var(--color-success)', color: '#ffffff' }} onClick={() => handleAction(match.id, 'monetize')}>
                          <DollarSign size={14} className="mr-1" aria-hidden="true" /> Monetize
                        </Button>
                        <Button size="sm" variant="outline" className="min-h-[36px] text-xs font-semibold" onClick={() => handleAction(match.id, 'approve')}>
                          <CheckCircle size={14} className="mr-1" aria-hidden="true" /> Approve
                        </Button>
                      </>
                    ) : (
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{
                        backgroundColor: match.action === 'takedown' ? 'rgba(220,38,38,0.1)' : match.action === 'monetize' ? 'rgba(22,163,74,0.1)' : 'rgba(30,64,175,0.1)',
                        color: match.action === 'takedown' ? 'var(--color-error)' : match.action === 'monetize' ? 'var(--color-success)' : 'var(--color-primary)',
                      }}>
                        {match.action === 'takedown' ? 'Takedown requested' : match.action === 'monetize' ? 'Monetized' : 'Approved'}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
