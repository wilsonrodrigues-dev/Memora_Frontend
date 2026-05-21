import React from 'react';

const getMediaIcon = (mimeType) => {
  if (!mimeType) return 'draft';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video_library';
  if (mimeType.startsWith('audio/')) return 'audio_file';
  return 'draft';
};

function MediaModal({ activeMedia, onClose }) {
  if (!activeMedia) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={onClose}>
      <div className="glass-panel max-w-[800px] w-full rounded-3xl overflow-hidden relative border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]" onClick={(e) => e.stopPropagation()}>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Media Canvas */}
        <div className="w-full aspect-video bg-[#050505] flex items-center justify-center border-b border-white/5 relative">
          {activeMedia.isMock ? (
            <img src={activeMedia.thumbnailLink} alt={activeMedia.name} className="max-w-full max-h-full object-contain" />
          ) : activeMedia.mimeType && activeMedia.mimeType.startsWith('image/') ? (
            <img 
              src={activeMedia.webViewLink || `https://lh3.googleusercontent.com/d/${activeMedia.id}=w800`} 
              alt={activeMedia.name} 
              className="max-w-full max-h-full object-contain" 
            />
          ) : activeMedia.mimeType && activeMedia.mimeType.startsWith('video/') ? (
            <video 
              src={activeMedia.webContentLink} 
              controls 
              className="max-w-full max-h-full object-contain"
              poster={activeMedia.thumbnailLink}
            />
          ) : (
            <div className="text-center p-8">
              <span className="material-symbols-outlined text-8xl text-primary/80 mb-4">
                {getMediaIcon(activeMedia.mimeType)}
              </span>
              <p className="text-lg font-bold">Preview not available directly</p>
              <a 
                href={activeMedia.webViewLink} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-block mt-4 px-6 py-2.5 rounded-full bg-primary text-on-primary-container font-semibold hover:brightness-110"
              >
                View on Google Drive
              </a>
            </div>
          )}
        </div>

        {/* Meta details */}
        <div className="p-8">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-on-surface tracking-tight">{activeMedia.name}</h3>
              <p className="text-xs text-on-surface-variant/60 uppercase tracking-widest mt-1">
                {activeMedia.category || 'Archived Moment'}
              </p>
            </div>
            {activeMedia.mimeType && (
              <div className="text-right">
                <span className="inline-block bg-white/5 border border-white/10 px-3.5 py-1 rounded-full text-xs text-secondary font-semibold uppercase tracking-wider">
                  {activeMedia.mimeType.split('/')[0]}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-6 border-t border-white/5 pt-4 text-xs text-on-surface-variant/50">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">person</span>
              <span>Contributed by {activeMedia.author || 'Anonymous Grad'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">event</span>
              <span>{new Date(activeMedia.createdTime || Date.now()).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MediaModal;
