import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const PIE_DATA = [
  { name: 'Social Media', value: 64 },
  { name: 'News', value: 18 },
  { name: 'Commercial', value: 12 },
  { name: 'AI Generated', value: 6 },
]

const PIE_COLORS = ['#3182CE', '#38A169', '#ED8936', '#E53E3E']

type LicenseType = 'restricted' | 'balanced' | 'open'

const LICENSE_OPTIONS: { type: LicenseType; title: string; desc: string }[] = [
  { type: 'restricted', title: 'Restricted', desc: 'Approve every use individually. Maximum control over your identity.' },
  { type: 'balanced', title: 'Balanced', desc: 'Auto-approve editorial and news. Manual review for commercial uses.' },
  { type: 'open', title: 'Open', desc: 'License freely with automatic CPM billing. Maximum reach and earnings.' },
]

const PLATFORM_TOGGLES = ['Social Media', 'News', 'Commercial', 'AI Generated']

export default function Monetize() {
  const [license, setLicense] = useState<LicenseType>('balanced')
  const [platforms, setPlatforms] = useState<Record<string, boolean>>({
    'Social Media': true,
    'News': true,
    'Commercial': false,
    'AI Generated': false,
  })
  const [cpm, setCpm] = useState('12')

  function togglePlatform(name: string) {
    setPlatforms((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <div className="space-y-8">
      {/* Total earnings */}
      <div className="rounded-xl bg-white p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <p className="text-sm font-medium mb-1" style={{ color: '#718096' }}>Total Earnings</p>
        <p className="text-4xl font-bold" style={{ color: '#38A169' }}>$2,847.50</p>
      </div>

      {/* License type picker */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#2D3748' }}>License Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LICENSE_OPTIONS.map((opt) => (
            <button
              key={opt.type}
              onClick={() => setLicense(opt.type)}
              className="p-4 rounded-xl border-2 text-left transition-all"
              style={{
                borderColor: license === opt.type ? '#3182CE' : '#E2E8F0',
                backgroundColor: license === opt.type ? '#EBF4FF' : '#FFFFFF',
              }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: license === opt.type ? '#3182CE' : '#2D3748' }}>
                {opt.title}
              </p>
              <p className="text-xs" style={{ color: '#718096' }}>{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Per-platform toggles */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#2D3748' }}>Platform Permissions</h3>
        <div className="space-y-3">
          {PLATFORM_TOGGLES.map((name) => (
            <label
              key={name}
              className="flex items-center justify-between p-4 rounded-xl bg-white cursor-pointer"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            >
              <span className="text-sm font-medium" style={{ color: '#2D3748' }}>{name}</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={platforms[name]}
                  onChange={() => togglePlatform(name)}
                  className="sr-only peer"
                />
                <div
                  className="w-11 h-6 rounded-full transition-colors peer-checked:bg-[#3182CE]"
                  style={{ backgroundColor: platforms[name] ? '#3182CE' : '#CBD5E0' }}
                />
                <div
                  className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm"
                  style={{ transform: platforms[name] ? 'translateX(20px)' : 'translateX(0)' }}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* CPM rate */}
      <div className="rounded-xl bg-white p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#2D3748' }}>CPM Rate</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm" style={{ color: '#718096' }}>Earn</span>
          <div className="flex items-center">
            <span className="text-sm font-semibold mr-1" style={{ color: '#2D3748' }}>$</span>
            <input
              type="number"
              value={cpm}
              onChange={(e) => setCpm(e.target.value)}
              className="w-20 px-3 py-2 rounded-lg border text-sm font-semibold text-center"
              style={{ borderColor: '#E2E8F0', color: '#2D3748' }}
              min="1"
              max="100"
            />
          </div>
          <span className="text-sm" style={{ color: '#718096' }}>per 1,000 views</span>
        </div>
      </div>

      {/* Earnings pie chart */}
      <div className="rounded-xl bg-white p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: '#2D3748' }}>Earnings Breakdown</h3>
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={2}>
                {PIE_DATA.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {PIE_DATA.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
              <span className="text-xs" style={{ color: '#718096' }}>{d.name} ({d.value}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
