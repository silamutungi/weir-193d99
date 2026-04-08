import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from './ui/button'
import { Shield, LogOut, X } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [authed, setAuthed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!menuOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

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
    <>
      <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--color-text)' }}>
            <Shield size={22} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
            WEIR
          </Link>

          {/* Desktop nav — unchanged, md and above */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium"
                style={{ color: location.pathname === l.to ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
              >
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

          {/* Hamburger button — visible only below md */}
          <button
            className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md transition-colors"
            style={{ color: 'var(--color-text)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
          >
            {menuOpen
              ? <X size={20} />
              : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="16" height="2" rx="1" fill="currentColor" />
                  <rect x="2" y="9" width="16" height="2" rx="1" fill="currentColor" />
                  <rect x="2" y="14" width="16" height="2" rx="1" fill="currentColor" />
                </svg>
              )
            }
          </button>
        </div>
      </nav>

      {/* Overlay backdrop */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(0,0,0,0.45)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide-in drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        className="fixed top-0 left-0 z-50 h-full w-72 md:hidden flex flex-col"
        style={{
          backgroundColor: 'var(--color-bg-surface)',
          borderRight: '1px solid var(--color-border)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: menuOpen ? '4px 0 24px rgba(0,0,0,0.12)' : 'none',
          willChange: 'transform',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div
          className="h-16 flex items-center justify-between px-6 border-b flex-shrink-0"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg"
            style={{ color: 'var(--color-text)' }}
            onClick={() => setMenuOpen(false)}
          >
            <Shield size={20} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
            WEIR
          </Link>
          <button
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md"
            style={{ color: 'var(--color-text-secondary)' }}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navLinks.map((l) => {
            const isActive = location.pathname === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                  backgroundColor: isActive ? 'rgba(30, 64, 175, 0.08)' : 'transparent',
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Drawer footer actions */}
        <div className="flex-shrink-0 px-4 pb-8 pt-4 border-t space-y-3" style={{ borderColor: 'var(--color-border)' }}>
          {authed ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => { handleLogout(); setMenuOpen(false) }}
              className="w-full min-h-[44px] gap-1.5"
            >
              <LogOut size={14} aria-hidden="true" /> Sign out
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => { navigate('/signup'); setMenuOpen(false) }}
              className="w-full min-h-[44px] font-semibold"
              style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}
            >
              Start free
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
