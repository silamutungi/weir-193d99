import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Shield, AlertCircle } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Email and password are required.')
      return
    }
    if (!isSupabaseConfigured || !supabase) {
      navigate('/dashboard')
      return
    }
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
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
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Welcome back</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>Sign in to your identity rights dashboard</p>

        {!isSupabaseConfigured && (
          <div className="mb-6 p-3 rounded-lg border text-sm" style={{ backgroundColor: 'rgba(30,64,175,0.08)', borderColor: 'rgba(30,64,175,0.2)', color: 'var(--color-info)' }}>
            Demo mode — any credentials will work.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-error)' }} role="alert">
              <AlertCircle size={16} aria-hidden="true" />
              {error}
            </div>
          )}
          <Button type="submit" className="w-full min-h-[44px] font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <p className="mt-6 text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>
          No account?{' '}
          <Link to="/signup" className="font-semibold underline" style={{ color: 'var(--color-primary)' }}>Start free</Link>
        </p>
      </div>
    </div>
  )
}
