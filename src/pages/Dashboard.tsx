import { useState } from 'react'
import Navbar from '../components/Navbar'
import MatchesFeed from './Dashboard/MatchesFeed'
import Monetize from './Dashboard/Monetize'
import Insights from './Dashboard/Insights'
import { Shield, DollarSign, TrendingUp, FileText, LayoutDashboard, Eye, AlertTriangle } from 'lucide-react'

type Tab = 'matches' | 'monetize' | 'insights'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Protect', icon: Shield, active: false },
  { label: 'Monetize', icon: DollarSign, active: false },
  { label: 'Growth', icon: TrendingUp, active: false },
  { label: 'Licensing', icon: FileText, active: false },
]

const STATS = [
  { label: 'Protection Score', value: '89', suffix: '/100', icon: Shield, color: '#3182CE' },
  { label: 'Monthly Earnings', value: '$2,847', suffix: '', icon: DollarSign, color: '#38A169' },
  { label: 'Content Matches', value: '156', suffix: '', icon: Eye, color: '#3182CE' },
  { label: 'Pending Actions', value: '12', suffix: '', icon: AlertTriangle, color: '#ED8936' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('matches')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'matches', label: 'Matches' },
    { key: 'monetize', label: 'Monetize' },
    { key: 'insights', label: 'Insights' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <Navbar />

      <div className="flex">
        {/* Sidebar — hidden on mobile */}
        <aside
          className="hidden lg:flex flex-col w-60 min-h-[calc(100vh-64px)] py-6 px-4 flex-shrink-0"
          style={{ backgroundColor: '#112B52' }}
        >
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px]"
                  style={{
                    color: item.active ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                    backgroundColor: item.active ? 'rgba(255,255,255,0.12)' : 'transparent',
                  }}
                >
                  <Icon size={18} aria-hidden="true" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#1A202C' }}>Identity Dashboard</h1>
            <p className="text-sm" style={{ color: '#718096' }}>
              Real-time monitoring of your name, image, and likeness across the web.
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.label}
                  className="p-5 rounded-xl bg-white"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#A0AEC0', letterSpacing: '0.08em' }}>
                      {s.label}
                    </span>
                    <Icon size={16} style={{ color: s.color }} aria-hidden="true" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold" style={{ color: '#1A202C' }}>{s.value}</span>
                    {s.suffix && <span className="text-sm" style={{ color: '#A0AEC0' }}>{s.suffix}</span>}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Tab bar */}
          <div className="flex items-center gap-2 mb-6 border-b" style={{ borderColor: '#E2E8F0' }}>
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="px-4 py-3 text-sm font-semibold transition-colors min-h-[44px]"
                style={{
                  color: activeTab === t.key ? '#3182CE' : '#718096',
                  borderBottom: activeTab === t.key ? '2px solid #3182CE' : '2px solid transparent',
                  marginBottom: '-1px',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'matches' && <MatchesFeed />}
          {activeTab === 'monetize' && <Monetize />}
          {activeTab === 'insights' && <Insights />}
        </main>
      </div>
    </div>
  )
}
