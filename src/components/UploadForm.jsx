import React, { useState, useRef } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';

function UploadForm({ onUploadSuccess, setView }) {

const api=axios.create({
  baseURL:"https://memora-0oah.onrender.com/api"
})

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [momentLabel, setMomentLabel] = useState('');
  const [archiveCategory, setArchiveCategory] = useState('Family Legacy');
  const [legacyNote, setLegacyNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    addFilesToQueue(files);
  };

  const addFilesToQueue = (files) => {
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isAudio = file.type.startsWith('audio/');
      return isImage || isVideo || isAudio;
    });

    if (validFiles.length === 0) return;

    setSelectedFiles((prev) => [...prev, ...validFiles]);

    const newPreviews = validFiles.map(file => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file)
    }));

    setFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeFileFromQueue = (index) => {
    URL.revokeObjectURL(filePreviews[index].url);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.style.boxShadow = "0 0 50px rgba(221, 184, 255, 0.4)";
      dropZoneRef.current.style.transform = "scale(1.02)";
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.style.boxShadow = "0 0 30px rgba(221, 184, 255, 0.2)";
      dropZoneRef.current.style.transform = "scale(1)";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.style.boxShadow = "0 0 30px rgba(221, 184, 255, 0.2)";
      dropZoneRef.current.style.transform = "scale(1)";
    }
    const files = Array.from(e.dataTransfer.files);
    addFilesToQueue(files);
  };

  const handleSubmitUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(20);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const progressTimer = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressTimer);
            return 90;
          }
          return prev + 15;
        });
      }, 400);

      const response = await api.post(`/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      clearInterval(progressTimer);
      setUploadProgress(100);

      if (response.data && response.data.success) {
        onUploadSuccess({
          label: momentLabel || 'Preserved Moment',
          category: archiveCategory,
          note: legacyNote || 'No notes left.',
          files: response.data.files,
          timestamp: new Date().toLocaleDateString()
        });

        // Trigger confetti!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ddb8ff', '#adc6ff', '#ffb0cd', '#9333ea']
        });

        setTimeout(() => {
          setView('success');
          // Reset states
          setSelectedFiles([]);
          setFilePreviews([]);
          setMomentLabel('');
          setLegacyNote('');
          setIsUploading(false);
        }, 1500);

      } else {
        setIsUploading(false);
        alert('Upload failed: ' + (response.data.message || 'Unknown error'));
      }

    } catch (error) {
      console.error(error);
      setIsUploading(false);
      alert('Upload failed: ' + error.message);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-12 w-full">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-on-surface">Share a Moment</h2>
        <p className="text-sm md:text-base text-on-surface-variant/60 max-w-xl mt-2">
          Upload your memories to the 2026 Archive. Help us preserve the light for the generations that follow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Left Column: Dropzone & File queue */}
        <div className="lg:col-span-7 space-y-8">

          {/* Upload Area */}
          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="glass-panel animated-dashed-border h-[350px] flex flex-col items-center justify-center cursor-pointer group transition-all duration-500"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*,video/*,audio/*"
              className="hidden"
            />
            <div className="upload-icon-float mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-all">
                <span className="material-symbols-outlined text-4xl">cloud_upload</span>
              </div>
            </div>
            <p className="text-xl font-bold text-on-surface mb-1">Drag & Drop</p>
            <p className="text-sm text-on-surface-variant/60">or click to browse your digital library</p>
            <p className="mt-8 text-xs font-semibold text-on-surface-variant/40 uppercase tracking-widest">
              Supports High Fidelity Video, Audio & Images
            </p>
          </div>

          {/* Queue display */}
          {filePreviews.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-widest">
                Queue ({filePreviews.length} Files)
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {filePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden glass-panel group">
                    {preview.type.startsWith('image/') ? (
                      <img src={preview.url} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:scale-115 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-[#101010] flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-primary/70">
                          {preview.type.startsWith('video/') ? 'play_circle' : 'audio_file'}
                        </span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFileFromQueue(index)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-on-surface hover:bg-red-500 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Form inputs */}
        <aside className="lg:col-span-5">
          <div className="glass-panel p-8 rounded-2xl space-y-6">

            {/* Moment Label */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant/80 ml-1">Moment Label</label>
              <input
                type="text"
                value={momentLabel}
                onChange={(e) => setMomentLabel(e.target.value)}
                placeholder="e.g. Sunday Morning in June"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-on-surface text-sm glow-input transition-all placeholder:text-on-surface-variant/30"
              />
            </div>

            {/* Category Dropdown */}
            {/* <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant/80 ml-1">Archive Category</label>
              <div className="relative">
                <select 
                  value={archiveCategory}
                  onChange={(e) => setArchiveCategory(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-on-surface text-sm glow-input appearance-none transition-all"
                >
                  <option className="bg-[#1a1a1a]" value="Family Legacy">Family Legacy</option>
                  <option className="bg-[#1a1a1a]" value="Personal Milestones">Personal Milestones</option>
                  <option className="bg-[#1a1a1a]" value="Professional Journey">Professional Journey</option>
                  <option className="bg-[#1a1a1a]" value="Creative Works">Creative Works</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/50">
                  expand_more
                </span>
              </div>
            </div> */}

            {/* Legacy Note */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant/80 ml-1">Legacy Note</label>
              <textarea
                value={legacyNote}
                onChange={(e) => setLegacyNote(e.target.value)}
                rows="4"
                placeholder="Describe the memory for those who will find it in the future..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-on-surface text-sm glow-input transition-all placeholder:text-on-surface-variant/30 resize-none"
              ></textarea>
            </div>

            {/* Privacy Toggle */}
            {/* <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex gap-3 items-center">
                <span className="material-symbols-outlined text-secondary">lock</span>
                <div>
                  <p className="text-xs font-bold text-on-surface">
                    Anonymous Upload
                  </p>

                  <p className="text-[10px] text-on-surface-variant/50">
                    Hide your identity from the memory wall.
                  </p>
                </div>
              </div>
              <div
                onClick={() => setIsPrivate(!isPrivate)}
                className={`w-12 h-6 rounded-full relative cursor-pointer flex items-center px-1 transition-colors duration-300 ${isPrivate ? 'bg-secondary/20' : 'bg-white/10'}`}
              >
                <div
                  className={`w-4 h-4 bg-secondary rounded-full shadow-[0_0_8px_#adc6ff] transition-transform duration-300 ${isPrivate ? 'translate-x-6' : 'translate-x-0'}`}
                ></div>
              </div>
            </div> */}

            {/* Submit Button */}
            <button
              onClick={handleSubmitUpload}
              disabled={selectedFiles.length === 0 || isUploading}
              className={`w-full py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3 cursor-pointer ${selectedFiles.length === 0
                ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                : isUploading
                  ? 'bg-primary/70 text-on-primary-container cursor-wait'
                  : 'bg-gradient-to-r from-primary-container to-secondary-container text-on-primary shadow-[0_10px_30px_rgba(147,51,234,0.4)] hover:brightness-110 active:scale-[0.98]'
                }`}
            >
              <span>
                {isUploading
                  ? `Encoding Light (${uploadProgress}%)`
                  : 'Add to Archive'
                }
              </span>
              {isUploading && (
                <div className="loader-ring"></div>
              )}
            </button>
            <p className="text-center text-[10px] text-on-surface-variant/40">
              Some memories deserve to outlive time itself.
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default UploadForm;
