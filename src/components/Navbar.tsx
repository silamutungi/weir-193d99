import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from './ui/button'
import { Shield, LogOut, Menu, X } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [authed, setAuthed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      if (location.pathname === '/dashboard') setAuthed(true)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(Boolean(data.session))
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(Boolean(session))
    })
    return () => listener.subscription.unsubscribe()
  }, [location.pathname])

  async function handleLogout() {
    if (isSupabaseConfigured && supabase) await supabase.auth.signOut()
    navigate('/')
  }

  const navLinks = authed
    ? [{ to: '/dashboard', label: 'Dashboard' }]
    : [
        { to: '/#features', label: 'Features' },
        { to: '/login', label: 'Sign in' },
      ]

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--color-text)' }}>
          <Shield size={22} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
          WEIR
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              {l.label}
            </Link>
          ))}
          {authed ? (
            <Button size="sm" variant="outline" onClick={handleLogout} className="min-h-[36px] gap-1.5">
              <LogOut size={14} aria-hidden="true" /> Sign out
            </Button>
          ) : (
            <Button size="sm" onClick={() => navigate('/signup')} className="min-h-[36px] font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
              Start free
            </Button>
          )}
        </div>

        <button className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={20} style={{ color: 'var(--color-text)' }} /> : <Menu size={20} style={{ color: 'var(--color-text)' }} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 space-y-3" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className="block text-sm font-medium py-1" style={{ color: 'var(--color-text-secondary)' }}>
              {l.label}
            </Link>
          ))}
          {authed ? (
            <Button size="sm" variant="outline" onClick={handleLogout} className="w-full min-h-[44px]">
              Sign out
            </Button>
          ) : (
            <Button size="sm" onClick={() => { navigate('/signup'); setMenuOpen(false) }} className="w-full min-h-[44px] font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
              Start free
            </Button>
          )}
        </div>
      )}
    </nav>
  )
}
