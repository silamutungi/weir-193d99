import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Shield, AlertCircle } from 'lucide-react'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || password.length < 8) {
      setError('Please fill all fields. Password must be 8+ characters.')
      return
    }
    if (!isSupabaseConfigured || !supabase) {
      navigate('/dashboard')
      return
    }
    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    })
    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <Shield size={28} style={{ color: 'var(--color-primary)' }} />
          <span className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>WEIR</span>
        </div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Protect your identity</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>Free setup in under 5 minutes. No credit card required.</p>

        {!isSupabaseConfigured && (
          <div className="mb-6 p-3 rounded-lg border text-sm" style={{ backgroundColor: 'rgba(30,64,175,0.08)', borderColor: 'rgba(30,64,175,0.2)', color: 'var(--color-info)' }}>
            Demo mode — registration will navigate you to the dashboard.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" type="text" autoComplete="name" placeholder="Alex Rivera" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete="new-password" placeholder="8+ characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-error)' }} role="alert">
              <AlertCircle size={16} aria-hidden="true" />
              {error}
            </div>
          )}
          <Button type="submit" className="w-full min-h-[44px] font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }} disabled={loading}>
            {loading ? 'Creating account...' : 'Get started free'}
          </Button>
        </form>
        <p className="mt-4 text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
          By signing up you agree to our{' '}
          <Link to="/" className="underline" style={{ color: 'var(--color-primary)' }}>Terms</Link>{' '}and{' '}
          <Link to="/" className="underline" style={{ color: 'var(--color-primary)' }}>Privacy Policy</Link>.
        </p>
        <p className="mt-4 text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold underline" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
