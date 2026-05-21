import React from 'react';

function SuccessView({ uploadedMoment, onBackToArchive, onShareAnother }) {
  if (!uploadedMoment) return null;

  return (
    <div className="max-w-[700px] mx-auto px-6 py-20 text-center flex flex-col items-center">
      
      <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-8 animate-bounce shadow-[0_0_30px_rgba(34,197,94,0.2)]">
        <span className="material-symbols-outlined text-6xl">verified</span>
      </div>

      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-on-surface mb-2">Moment Preserved</h2>
      <p className="text-sm md:text-base text-green-400 font-semibold tracking-wider uppercase mb-8">
        Stored Safely in the digital vault
      </p>

      <div className="glass-panel p-8 rounded-2xl w-full text-left space-y-4 mb-10 border-green-500/10">
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-xs text-on-surface-variant/60 font-semibold uppercase tracking-wider">Moment Title</span>
          <span className="text-sm font-bold text-primary">{uploadedMoment.label}</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-xs text-on-surface-variant/60 font-semibold uppercase tracking-wider">Uploaded files</span>
          <span className="text-sm font-semibold text-secondary">{uploadedMoment.files?.length || 0} items</span>
        </div>
        <div className="flex flex-col gap-1.5 pt-2">
          <span className="text-xs text-on-surface-variant/60 font-semibold uppercase tracking-wider">Legacy Note</span>
          <p className="text-sm text-on-surface/80 italic">"{uploadedMoment.note}"</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <button 
          onClick={onBackToArchive}
          className="px-8 py-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 font-bold text-sm tracking-wider uppercase transition-colors cursor-pointer"
        >
          Back to Archive
        </button>
        <button 
          onClick={onShareAnother}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-on-primary hover:brightness-110 font-bold text-sm tracking-wider uppercase transition-all shadow-[0_10px_30px_rgba(147,51,234,0.3)] cursor-pointer"
        >
          Share Another Moment
        </button>
      </div>

    </div>
  );
}

export default SuccessView;
