import React from 'react';

function Footer() {
  return (
    <footer className="relative w-full border-t border-white/5 bg-surface-container-lowest mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 px-6 md:px-16 max-w-[1200px] mx-auto opacity-80 hover:opacity-100 transition-opacity">
        <div>
          <span className="font-bold text-xl text-on-surface mb-1 block tracking-tight">TWILIGHT</span>
          <p className="text-xs text-secondary font-semibold">© 2026 TWILIGHT ARCHIVE. PRESERVING THE LIGHT.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
