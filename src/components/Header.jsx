import React from 'react';

function Header({ view, setView, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#131313]/30 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] h-20 transition-all duration-500">
        <div className="flex justify-between items-center px-4 md:px-16 h-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <span className="material-symbols-outlined text-primary text-3xl">blur_on</span>
            <span className="font-bold text-xl tracking-tighter text-primary brightness-125">MEMORA</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => setView('home')}
              className={`font-medium text-sm transition-colors px-3 py-1 rounded-full cursor-pointer ${view === 'home' ? 'text-primary brightness-150 bg-white/5' : 'text-on-surface-variant/70 hover:text-primary'}`}
            >
              Home
            </button>
            <a
              href="#archive"
              onClick={() => {
                setView('home');
                setTimeout(() => {
                  document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="font-medium text-sm text-on-surface-variant/70 hover:text-primary transition-colors px-3 py-1 rounded-full"
            >
              Archive
            </a>
            <button
              onClick={() => setView('upload')}
              className={`font-medium text-sm transition-colors px-3 py-1 rounded-full cursor-pointer ${view === 'upload' ? 'text-primary brightness-150 bg-white/5' : 'text-on-surface-variant/70 hover:text-primary'}`}
            >
              Upload
            </button>
          </nav>

          {/* Mobile hamburger icon */}
          <button
            className="md:hidden material-symbols-outlined text-on-surface text-3xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 'close' : 'menu'}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-0 w-full bg-[#131313]/95 backdrop-blur-2xl border-b border-white/10 z-40 flex flex-col items-center py-8 gap-6 md:hidden">
          <button
            onClick={() => { setView('home'); setMobileMenuOpen(false); }}
            className={`font-semibold text-lg cursor-pointer ${view === 'home' ? 'text-primary' : 'text-on-surface-variant'}`}
          >
            Home
          </button>
          <a
            href="#archive"
            onClick={() => {
              setView('home');
              setMobileMenuOpen(false);
              setTimeout(() => {
                document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="font-semibold text-lg text-on-surface-variant"
          >
            Archive
          </a>
          <button
            onClick={() => { setView('upload'); setMobileMenuOpen(false); }}
            className={`font-semibold text-lg cursor-pointer ${view === 'upload' ? 'text-primary' : 'text-on-surface-variant'}`}
          >
            Upload
          </button>
        </div>
      )}
    </>
  );
}

export default Header;
