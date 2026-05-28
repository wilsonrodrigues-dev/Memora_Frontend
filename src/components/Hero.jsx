import React from 'react';
import GoldenParticles from "./GoldenParticles";

function Hero({ setView }) {
  return (
    <section className="relative h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <GoldenParticles />
      <div className="floating-glow top-1/4 -left-1/4 opacity-40"></div>
      <div className="floating-glow bottom-1/4 -right-1/4 opacity-30" style={{ background: "radial-gradient(circle, rgba(255, 176, 205, 0.15) 0%, rgba(0, 0, 0, 0) 70%)" }}></div>
      
      <div className="z-10 max-w-4xl px-4">
        <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
          Every Memory Deserves to <span className="text-primary italic font-serif">Live Forever</span>
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant/80 mb-10 max-w-2xl mx-auto">
          Upload your favorite college moments and become part of the Farewell 2026 digital archive. A timeless legacy of the class of '26.
        </p>
        <button 
          onClick={() => setView('upload')}
          className="glow-button bg-primary-container text-on-primary-container px-10 py-4 rounded-full text-lg font-semibold flex items-center gap-3 mx-auto cursor-pointer"
        >
          Upload Memories
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-on-surface-variant/40 cursor-pointer"
        onClick={() => document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs uppercase tracking-widest">Explore Archive</span>
        <span className="material-symbols-outlined animate-bounce">expand_more</span>
      </div>
    </section>
  );
}

export default Hero;
