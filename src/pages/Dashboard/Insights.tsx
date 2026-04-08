import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const MONTHLY_DATA = [
  { month: 'May', matches: 42, growth: 1200 },
  { month: 'Jun', matches: 58, growth: 1800 },
  { month: 'Jul', matches: 65, growth: 2400 },
  { month: 'Aug', matches: 73, growth: 3100 },
  { month: 'Sep', matches: 89, growth: 3900 },
  { month: 'Oct', matches: 95, growth: 4800 },
  { month: 'Nov', matches: 112, growth: 5600 },
  { month: 'Dec', matches: 104, growth: 6200 },
  { month: 'Jan', matches: 118, growth: 7100 },
  { month: 'Feb', matches: 134, growth: 8200 },
  { month: 'Mar', matches: 145, growth: 9400 },
  { month: 'Apr', matches: 156, growth: 10500 },
]

const DISTRIBUTION = [
  { label: 'Social Media', pct: 64, color: '#3182CE' },
  { label: 'News', pct: 18, color: '#38A169' },
  { label: 'Commercial', pct: 12, color: '#ED8936' },
  { label: 'AI Generated', pct: 6, color: '#E53E3E' },
]

const PLATFORM_PERF = [
  { name: 'Instagram', matches: 52, earnings: '$1,240' },
  { name: 'TikTok', matches: 38, earnings: '$890' },
  { name: 'YouTube', matches: 28, earnings: '$420' },
  { name: 'News Sites', matches: 24, earnings: '$180' },
  { name: 'Ad Networks', matches: 14, earnings: '$117' },
]

export default function Insights() {
  return (
    <div className="space-y-8">
      {/* Dual-line chart */}
      <div className="rounded-xl bg-white p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: '#2D3748' }}>Content Matches & Audience Growth</h3>
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <LineChart data={MONTHLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#A0AEC0' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#A0AEC0' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#A0AEC0' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="matches" stroke="#3182CE" strokeWidth={2} name="Content Matches" dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#38A169" strokeWidth={2} name="Audience Growth" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Content Distribution */}
      <div className="rounded-xl bg-white p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: '#2D3748' }}>Content Distribution</h3>
        <div className="space-y-3">
          {DISTRIBUTION.map((d) => (
            <div key={d.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium" style={{ color: '#2D3748' }}>{d.label}</span>
                <span className="text-sm font-semibold" style={{ color: '#4A5568' }}>{d.pct}%</span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: '#EDF2F7' }}>
                <div className="h-2 rounded-full transition-all" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform performance */}
      <div className="rounded-xl bg-white p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: '#2D3748' }}>Platform Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PLATFORM_PERF.map((p) => (
            <div key={p.name} className="p-4 rounded-lg border" style={{ borderColor: '#E2E8F0' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: '#2D3748' }}>{p.name}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: '#718096' }}>{p.matches} matches</span>
                <span className="text-sm font-bold" style={{ color: '#38A169' }}>{p.earnings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
