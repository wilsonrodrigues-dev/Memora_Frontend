import React from 'react';
import { DEFAULT_MEMORIES } from '../constants';

const getMediaIcon = (mimeType) => {
  if (!mimeType) return 'draft';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video_library';
  if (mimeType.startsWith('audio/')) return 'audio_file';
  return 'draft';
};

function ArchiveSection({ archiveFiles, loadingArchive, onSelectMedia }) {
  return (
    <section id="archive" className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Digital Memory Archive</h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        <p className="text-on-surface-variant/60 mt-4 max-w-xl mx-auto">
          Browse photos and videos contributed by the graduating seniors of 2026.
        </p>
      </div>

      {loadingArchive ? (
        <div className="flex justify-center py-20">
          <div className="loader-ring"></div>
        </div>
      ) : (
        // <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        //   {/* Real drive files first */}
        //   {archiveFiles.map((file) => (
        //     <div 
        //       key={file.id}
        //       className="glass-card rounded-2xl p-4 flex flex-col group cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(221,184,255,0.15)]"
        //       onClick={() => onSelectMedia(file)}
        //     >
        //       <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#101010] flex items-center justify-center relative mb-4">
        //         {file.mimeType && file.mimeType.startsWith('image/') ? (
        //           <img 
        //             src={file.thumbnailLink || `https://lh3.googleusercontent.com/d/${file.id}=w400`} 
        //             alt={file.name} 
        //             className="w-full h-full object-cover"
        //             onError={(e) => {
        //               e.target.style.display = 'none';
        //               const fallback = e.target.parentNode.querySelector('.fallback-icon');
        //               if (fallback) fallback.style.display = 'block';
        //             }}
        //           />
        //         ) : null}

        //         {/* Fallback & video/audio overlays */}
        //         <div className="fallback-icon hidden text-center">
        //           <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">
        //             {getMediaIcon(file.mimeType)}
        //           </span>
        //         </div>

        //         {(!file.mimeType || !file.mimeType.startsWith('image/')) && (
        //           <span className="material-symbols-outlined text-5xl text-primary drop-shadow-md">
        //             {getMediaIcon(file.mimeType)}
        //           </span>
        //         )}

        //         {file.mimeType && (
        //           <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-secondary font-semibold uppercase tracking-wider">
        //             {file.mimeType.split('/')[0]}
        //           </div>
        //         )}
        //       </div>
        //       <h3 className="font-semibold text-sm truncate text-on-surface/90" title={file.name}>
        //         {file.name}
        //       </h3>
        //       <p className="text-xs text-on-surface-variant/40 mt-1">
        //         {new Date(file.createdTime || Date.now()).toLocaleDateString()}
        //       </p>
        //     </div>
        //   ))}

        //   {/* Fallback to Default memories so archive is never empty and matches Stitch designs */}
        //   {archiveFiles.length === 0 && DEFAULT_MEMORIES.map((m) => (
        //     <div 
        //       key={m.id}
        //       className="glass-card rounded-2xl p-4 flex flex-col group cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(221,184,255,0.15)]"
        //       onClick={() => onSelectMedia({
        //         id: m.id,
        //         name: m.name,
        //         mimeType: 'image/jpeg',
        //         isMock: true,
        //         thumbnailLink: m.imageUrl,
        //         author: m.author,
        //         category: m.category
        //       })}
        //     >
        //       <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#101010] relative mb-4">
        //         <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
        //         <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-secondary font-semibold uppercase tracking-wider">
        //           IMAGE
        //         </div>
        //       </div>
        //       <h3 className="font-semibold text-sm truncate text-on-surface/90">{m.name}</h3>
        //       <p className="text-xs text-on-surface-variant/40 mt-1">By {m.author}</p>
        //     </div>
        //   ))}
        // </div>
        <div className="relative overflow-hidden">

  {/* Left Gradient */}
  <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />

  {/* Right Gradient */}
  <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />

  <div className="flex gap-6 animate-scroll w-max hover:[animation-play-state:paused]">

    {[...archiveFiles, ...archiveFiles].map((file, idx) => (

      <div
        key={`${file.id}-${idx}`}
        onClick={() => onSelectMedia(file)}
        className="
          w-[240px]
          md:w-[280px]
          flex-shrink-0
          aspect-[3/4]
          glass-card
          rounded-3xl
          overflow-hidden
          group
          cursor-pointer
          relative
          transition-all
          duration-700
          hover:-translate-y-2
          hover:shadow-[0_0_30px_rgba(221,184,255,0.2)]
        "
      >

        {/* Image */}
        {file.mimeType?.startsWith("image/") ? (

          <img
            src={
              file.thumbnailLink ||
              `https://lh3.googleusercontent.com/d/${file.id}=w1000`
            }
            alt={file.name}
            className="
              w-full
              h-full
              object-cover
              grayscale-[20%]
              group-hover:grayscale-0
              group-hover:scale-110
              transition-all
              duration-1000
            "
          />

        ) : (

          <div className="w-full h-full flex items-center justify-center bg-[#111]">

            <span className="material-symbols-outlined text-6xl text-primary">
              video_library
            </span>

          </div>

        )}

        {/* Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/80
            via-black/20
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-500
            flex
            flex-col
            justify-end
            p-5
          "
        >

          <p className="text-white font-semibold truncate">
            {file.name}
          </p>

          <p className="text-xs text-white/60 mt-1">
            {new Date(
              file.createdTime || Date.now()
            ).toLocaleDateString()}
          </p>

        </div>

      </div>

    ))}

  </div>

</div>
      )}
    </section>
  );
}

export default ArchiveSection;
