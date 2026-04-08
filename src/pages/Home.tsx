import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Shield, Zap, DollarSign, Eye, Lock, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Eye,
    title: 'Real-Time Detection',
    description: 'AI scans the web 24/7, surfacing unauthorized uses of your identity before they spread. Matches ranked by risk in minutes, not weeks.',
  },
  {
    icon: Shield,
    title: 'One-Click Enforcement',
    description: 'Issue takedowns, approve legitimate uses, or flip violations into licensed revenue — no legal team required.',
  },
  {
    icon: DollarSign,
    title: 'Monetize Violations',
    description: 'Convert infringement into income. Set your CPM rates per platform and turn every unauthorized use into a licensing opportunity.',
  },
  {
    icon: Lock,
    title: 'Compliance Tracking',
    description: 'NCAA, state, and federal NIL disclosure requirements tracked automatically. Never miss a filing deadline.',
  },
  {
    icon: Zap,
    title: 'Automated Workflows',
    description: 'AI-powered risk scoring triggers pre-set enforcement actions. Your identity stays protected even when you sleep.',
  },
  {
    icon: BarChart3,
    title: 'Performance Insights',
    description: 'Transparent earnings breakdowns by platform, brand, and content type. Know exactly what your identity is worth.',
  },
]

const stats = [
  { value: '$2.4M', label: 'Creator earnings recovered' },
  { value: '94%', label: 'Takedown success rate' },
  { value: '48 min', label: 'Average detection time' },
  { value: '12,000+', label: 'Violations resolved' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Navbar />

      <section
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1589127128000-dcc98f1b77f5?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIwY29uZmlkZW50JTIwY3JlYXRvciUyMHN0YW5kaW5nJTIwaW4lMjBhJTIwbW9kZXJuJTJDJTIwbWluaW1hbGlzdCUyMHN0dWRpbyUyQ3xlbnwwfDB8fHwxNzc1NjEwMTc3fDA&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.28) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <Badge className="mb-6 text-xs font-semibold tracking-widest uppercase border-blue-400 text-blue-300 bg-blue-950/60">
            Identity Rights Management
          </Badge>
          <h1
            className="font-bold text-white mb-6 max-w-3xl"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-display)' }}
          >
            Your identity earns money. Stop letting others use it for free.
          </h1>
          <p className="text-lg text-slate-200 mb-10 max-w-xl" style={{ lineHeight: 'var(--leading-relaxed)' }}>
            WEIR detects unauthorized uses of your name, image, and likeness across the web in under an hour. Enforce, license, and monetize — automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => navigate('/signup')} className="text-base font-semibold px-8 py-4 min-h-[52px]" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
              Start free
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="text-base font-semibold px-8 py-4 min-h-[52px] border-white/40 text-white hover:bg-white/10">
              See it in action
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-bold text-white mb-1" style={{ letterSpacing: 'var(--tracking-display)' }}>{s.value}</div>
                <div className="text-sm text-blue-200 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent)', letterSpacing: 'var(--tracking-overline)' }}>Platform capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text)', lineHeight: 'var(--leading-tight)' }}>
              Everything your identity rights need.
            </h2>
            <p className="text-lg max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
              From detection to enforcement to monetization — WEIR handles the full lifecycle of your NIL rights, with zero legal overhead.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(30,64,175,0.1)' }}>
                    <Icon size={20} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{f.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent)', letterSpacing: 'var(--tracking-overline)' }}>Built for every creator</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--color-text)', lineHeight: 'var(--leading-tight)' }}>
              Not just for college athletes. For anyone with a following.
            </h2>
            <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              Opendorse locks you into NCAA. NIL Club has a 1-star BBB rating for opacity and refunds. WEIR is transparent, instant, and built for the full creator economy — athletes, influencers, musicians, and public figures.
            </p>
            <Button size="lg" onClick={() => navigate('/signup')} className="font-semibold px-8 py-4 min-h-[52px]" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
              Get your dashboard
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
