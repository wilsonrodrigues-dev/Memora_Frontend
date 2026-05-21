import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LiveHighlights from "./components/LiveHighlights";
import ArchiveSection from "./components/ArchiveSection";
import UploadForm from "./components/UploadForm";
import SuccessView from "./components/SuccessView";
import Countdown from "./components/Countdown";
import QuoteRotator from "./components/QuoteRotator";
import MediaModal from "./components/MediaModal";
import Footer from "./components/Footer";
import { API_BASE_URL } from "./constants";
import "./App.css";

function App() {
  const [view, setView] = useState("home"); // 'home', 'upload', 'success'
  const [archiveFiles, setArchiveFiles] = useState([]);
  const [loadingArchive, setLoadingArchive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Success state storage
  const [uploadedMoment, setUploadedMoment] = useState(null);

  // Modal State for viewing archives
  const [activeMedia, setActiveMedia] = useState(null);

  // Fetch archives from Google Drive folder on mount
  useEffect(() => {
    fetchArchives();
  }, []);

  const fetchArchives = async () => {
    setLoadingArchive(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/upload`);
      if (response.data && response.data.success) {
        setArchiveFiles(response.data.files);
      }
    } catch (error) {
      console.error(
        "Failed to fetch from Google Drive, falling back to mock:",
        error,
      );
    } finally {
      setLoadingArchive(false);
    }
  };

  const handleUploadSuccess = (momentDetails) => {
    setUploadedMoment(momentDetails);
    fetchArchives(); // Refresh files list
  };

  const [serverLoading, setServerLoading] = useState(true);

  useEffect(() => {
    const wakeServer = async () => {
      try {
        await axios.get("https://memora-0oah.onrender.com");

        setServerLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    wakeServer();
  }, []);

  if (serverLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Starting Memora...</h1>

          <p className="text-sm text-zinc-400">
            Server is waking up, this may take a few seconds.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans overflow-x-hidden selection:bg-primary/30 flex flex-col justify-between pt-20">
      {/* Ambient Lights */}
      <div className="ambient-light top-[-10%] left-[-10%] opacity-70"></div>
      <div
        className="ambient-light bottom-[-10%] right-[-10%] opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(5, 102, 217, 0.1) 0%, rgba(5, 5, 5, 0) 70%)",
        }}
      ></div>

      {/* Top Header Navigation */}
      <Header
        view={view}
        setView={setView}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Container */}
      <main className="flex-grow">
        {/* ================= HOMEPAGE VIEW ================= */}
        {view === "home" && (
          <div className="flex flex-col">
            <Hero setView={setView} />
            {/* <LiveHighlights onViewArchive={() => {
              document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' });
            }} /> */}
            <ArchiveSection
              archiveFiles={archiveFiles}
              loadingArchive={loadingArchive}
              onSelectMedia={setActiveMedia}
            />

            {/* How It Works Section */}
            <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  Preserve the Journey
                </h2>
                <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-10 rounded-[2rem] hover:border-primary/40 transition-all group duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-4xl">
                      cloud_upload
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Upload</h3>
                  <p className="text-sm text-on-surface-variant/70 leading-relaxed">
                    Securely submit your photos, videos, and notes from the last
                    four years. Our system handles high-fidelity preservation.
                  </p>
                </div>
                <div className="glass-card p-10 rounded-[2rem] border-primary/20 bg-primary/5 transition-all group duration-500 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-[40px] rounded-full"></div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-4xl">
                      verified_user
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Preserve</h3>
                  <p className="text-sm text-on-surface-variant/70 leading-relaxed">
                    Your memories are archived in a secure digital vault,
                    ensuring they never fade or get lost in the noise.
                  </p>
                </div>
                <div className="glass-card p-10 rounded-[2rem] hover:border-primary/40 transition-all group duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-4xl">
                      auto_awesome
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Celebrate</h3>
                  <p className="text-sm text-on-surface-variant/70 leading-relaxed">
                    Unlock a customized farewell cinematic experience on
                    Farewell day, sharing the legacy with your peers.
                  </p>
                </div>
              </div>
            </section>

            <Countdown />
            <QuoteRotator />
          </div>
        )}

        {/* ================= UPLOAD FORM VIEW ================= */}
        {view === "upload" && (
          <UploadForm onUploadSuccess={handleUploadSuccess} setView={setView} />
        )}

        {/* ================= SUCCESS STATE VIEW ================= */}
        {view === "success" && (
          <SuccessView
            uploadedMoment={uploadedMoment}
            onBackToArchive={() => setView("home")}
            onShareAnother={() => setView("upload")}
          />
        )}
      </main>

      {/* Media Detail Modal */}
      <MediaModal
        activeMedia={activeMedia}
        onClose={() => setActiveMedia(null)}
      />

      {/* Footer Component */}
      <Footer />

      {/* Responsive Bottom Mobile Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-40 md:hidden bg-[#131313]/50 backdrop-blur-2xl border-t border-white/5 flex justify-around items-center h-20 px-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <button
          onClick={() => setView("home")}
          className={`flex flex-col items-center justify-center scale-95 active:scale-90 transition-transform cursor-pointer ${view === "home" ? "text-primary drop-shadow-[0_0_8px_rgba(221,184,255,0.8)]" : "text-on-surface-variant/50 hover:brightness-125"}`}
        >
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-semibold tracking-wider mt-0.5">
            Home
          </span>
        </button>
        <button
          onClick={() => {
            setView("home");
            setTimeout(() => {
              document
                .getElementById("archive")
                ?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          className="flex flex-col items-center justify-center text-on-surface-variant/50 hover:brightness-125 transition-all scale-95 active:scale-90 cursor-pointer"
        >
          <span className="material-symbols-outlined">collections</span>
          <span className="text-[10px] font-semibold tracking-wider mt-0.5">
            Archive
          </span>
        </button>
        <button
          onClick={() => setView("upload")}
          className={`flex flex-col items-center justify-center scale-95 active:scale-90 transition-transform cursor-pointer ${view === "upload" ? "text-primary drop-shadow-[0_0_8px_rgba(221,184,255,0.8)]" : "text-on-surface-variant/50 hover:brightness-125"}`}
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span className="text-[10px] font-semibold tracking-wider mt-0.5">
            Upload
          </span>
        </button>
      </nav>
    </div>
  );
}

export default App;
