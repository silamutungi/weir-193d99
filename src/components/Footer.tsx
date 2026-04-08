import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t py-12" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Shield size={18} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
          <span className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>WEIR</span>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>&copy; {year}</span>
        </div>
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          <Link to="/" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Privacy</Link>
          <Link to="/" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Terms</Link>
          <Link to="/" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Contact</Link>
        </nav>
      </div>
    </footer>
  )
}
