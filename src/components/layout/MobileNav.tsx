import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/assets/pdfs/refikcanmalli_cv_20251229.pdf', label: 'CV', external: true },
];

function MobileNavOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 9998 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-background shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 9999 }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Decorative accent line */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-sm text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-200"
          aria-label="Close menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="pt-20 px-8 pb-6 border-b border-border/50">
          <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">Menu</span>
        </div>

        {/* Navigation links */}
        <nav className="px-8 py-6">
          <ul className="space-y-1">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                className={`transform transition-all duration-300 ${
                  open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${(index + 1) * 75}ms` : '0ms' }}
              >
                <a
                  href={link.href}
                  onClick={onClose}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center py-4 text-lg font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  <span className="w-0 h-px bg-foreground/50 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-3" />
                  {link.label}
                  {link.external && (
                    <svg
                      className="ml-2 w-4 h-4 opacity-50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer decoration */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center gap-2 text-muted-foreground/50">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <div className="flex-1 h-px bg-gradient-to-r from-current to-transparent" />
          </div>
        </div>
      </div>
    </>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Hamburger menu button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-sm text-foreground hover:bg-foreground/10 transition-colors"
        aria-label="Open navigation menu"
        aria-expanded={open}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      {/* Portal the overlay to document body */}
      {mounted && createPortal(
        <MobileNavOverlay open={open} onClose={() => setOpen(false)} />,
        document.body
      )}
    </>
  );
}
