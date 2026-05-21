import React, { useEffect, useState } from "react";

function LiveHighlights({ onViewArchive }) {

  const [memories, setMemories] = useState([]);

  useEffect(() => {

    const fetchHighlights = async () => {

      try {

        const res = await fetch("http://localhost:5000/gallery");

        const data = await res.json();

        // only images
        const imageFiles = data.files
          .filter(
            (file) =>
              file.mimeType &&
              file.mimeType.startsWith("image/")
          )
          .slice(0, 10);

        // duplicate for infinite scrolling
        setMemories([...imageFiles, ...imageFiles]);

      } catch (error) {

        console.log(error);
      }
    };

    fetchHighlights();

  }, []);

  return (
    <section className="py-20 overflow-hidden border-y border-white/5 bg-surface-container-lowest/50">

      {/* Header */}
      <div className="px-6 md:px-16 mb-10 flex justify-between items-end max-w-[1440px] mx-auto">

        <div>

          <h2 className="text-2xl md:text-4xl font-bold mb-2">
            Live Highlights
          </h2>

          <p className="text-sm md:text-base text-on-surface-variant/60">
            Candid moments being preserved in real time.
          </p>

        </div>

        <button
          onClick={onViewArchive}
          className="text-primary font-semibold flex items-center gap-2 hover:underline text-sm md:text-base cursor-pointer"
        >
          View Archive

          <span className="material-symbols-outlined text-sm">
            open_in_new
          </span>
        </button>

      </div>

      {/* Infinite Carousel */}
      <div className="relative overflow-hidden">

        {/* Left Fade */}
        <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />

        {/* Right Fade */}
        <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />

        <div className="flex gap-6 animate-scroll hover:[animation-play-state:paused] w-max px-6 md:px-16">

          {memories.map((m, idx) => (

            <div
              key={`${m.id}-${idx}`}
              className="w-[240px] md:w-[260px] flex-shrink-0 aspect-[3/4]
              glass-card rounded-3xl p-4 flex flex-col group
              cursor-pointer transition-all duration-500
              hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Image */}
              <div className="w-full h-[80%] rounded-2xl overflow-hidden mb-3 relative">

                <img
                  src={m.imageUrl}
                  alt={m.name}
                  className="w-full h-full object-cover grayscale
                  group-hover:grayscale-0 group-hover:scale-110
                  transition-all duration-700"
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t
                  from-black/70 via-black/10 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                  flex items-end p-4"
                >
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white">
                    LIVE MEMORY
                  </span>
                </div>

              </div>

              {/* Text */}
              <div>

                <p className="font-semibold text-sm md:text-base text-primary truncate">
                  {m.name}
                </p>

                <p className="text-xs text-on-surface-variant/50 mt-1">
                  Recently uploaded
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default LiveHighlights;