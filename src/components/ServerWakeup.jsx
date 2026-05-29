import React, { useEffect, useRef, useState } from "react";

// --- Dummy senior data (replace src with real images later) ---
const SENIORS = [
  { id: 1, name: "Senior 1", src: "/main_loading_img.jpeg", angle: 0 },
  { id: 2, name: "Senior 2", src: "/s_img1.jpeg", angle: 60 },
  { id: 3, name: "Senior 3", src: "/s_img2.jpeg", angle: 120 },
  { id: 4, name: "Senior 4", src: "/s_img3.jpeg", angle: 180 },
  { id: 5, name: "Senior 5", src: "/s_img1.jpeg", angle: 240 },
  { id: 6, name: "Senior 6", src: "/s_img2.jpeg", angle: 300 },
];

// Twinkling starfield canvas
function StarCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const STARS = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      STARS.forEach((s) => {
        s.alpha = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(221,184,255,${s.alpha * 0.6})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

// Single floating portrait card
function FloatingCard({ senior, index }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200 + index * 200);
    return () => clearTimeout(t);
  }, [index]);

  const baseAngle = (senior.angle * Math.PI) / 180;
  const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 130 : 200;
  const cx = Math.cos(baseAngle) * radius;
  const cy = Math.sin(baseAngle) * radius;

  const floatNames = ["floatCard0", "floatCard1", "floatCard2"];

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% + ${cx}px)`,
        top: `calc(50% + ${cy}px)`,
        transform: "translate(-50%, -50%)",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.8s ease ${index * 0.08}s`,
        zIndex: 5,
        animation: visible
          ? `${floatNames[index % 3]} ${4 + index * 0.4}s ease-in-out infinite`
          : "none",
      }}
    >
      {/* Spinning conic glow ring */}
      <div
        style={{
          position: "absolute",
          inset: "-6px",
          borderRadius: "50%",
          background: `conic-gradient(from ${senior.angle}deg, #ddb8ff, #9333ea, #0566d9, #ffb0cd, #ddb8ff)`,
          animation: "spinRing 6s linear infinite",
          zIndex: -1,
          filter: "blur(2px)",
        }}
      />
      <div
        style={{
          width: 84,
          height: 84,
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid rgba(221,184,255,0.3)",
          boxShadow:
            "0 0 24px rgba(147,51,234,0.5), 0 0 8px rgba(221,184,255,0.3)",
          position: "relative",
          background: "rgba(19,19,19,0.8)",
        }}
      >
        {/* Fallback gradient avatar (always visible) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, rgba(147,51,234,0.4), rgba(5,102,217,0.4))",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ color: "#ddb8ff", fontSize: 30 }}
          >
            person
          </span>
        </div>
        <img
          src={senior.src}
          alt={senior.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>
    </div>
  );
}

// Animated progress dots
function ProgressDots({ step }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: i <= step ? "#ddb8ff" : "rgba(221,184,255,0.2)",
            boxShadow: i <= step ? "0 0 10px rgba(221,184,255,0.8)" : "none",
            transition: "all 0.5s ease",
            animation: i === step ? "pulseDot 1s ease-in-out infinite" : "none",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
// Props:
//   serverReady  – boolean, true once the server ping succeeds
//   onComplete   – callback fired after the exit animation finishes
export default function ServerWakeup({ serverReady = false, onComplete }) {
  // Whether all animation phases are fully revealed (true after ~2.4 s)
  const [fullyRevealed, setFullyRevealed] = useState(false);
  // Exit animation state (triggered once server is ready + fullyRevealed)
  const [exiting, setExiting] = useState(false);

  const [dotStep, setDotStep] = useState(0);
  const [statusText, setStatusText] = useState("Connecting to TWILIGHT...");

  // ── Phase reveal (runs once on mount, ~2.4 s total) ─────────────────────
  useEffect(() => {
    // After 2.4 s all visuals are on screen and we mark "fully revealed"
    const t = setTimeout(() => setFullyRevealed(true), 2400);
    return () => clearTimeout(t);
  }, []);

  // ── Exit: trigger only when BOTH server is ready AND animation is revealed ─
  useEffect(() => {
    if (!serverReady || !fullyRevealed) return;
    // Give the user 1.5 s to see the "server is ready" moment, then exit
    const t = setTimeout(() => {
      setExiting(true);
      // Allow CSS fade-out (0.6 s), then actually unmount
      setTimeout(() => onComplete?.(), 600);
    }, 1500);
    return () => clearTimeout(t);
  }, [serverReady, fullyRevealed, onComplete]);

  // ── Cycle loading status messages (stops when server is ready) ───────────
  useEffect(() => {
    if (serverReady) {
      setStatusText("Archive is ready ✦");
      return;
    }
    const messages = [
      "Connecting to TWILIGHT...",
      "Waking up the archive...",
      "Gathering your memories...",
      "Almost there...",
    ];
    let i = 0;
    const iv = setInterval(() => {
      i = (i + 1) % messages.length;
      setStatusText(messages[i]);
    }, 2500);
    return () => clearInterval(iv);
  }, [serverReady]);

  // ── Progress dots cycle ──────────────────────────────────────────────────
  useEffect(() => {
    if (serverReady) { setDotStep(2); return; }
    const iv = setInterval(() => setDotStep((d) => (d + 1) % 3), 900);
    return () => clearInterval(iv);
  }, [serverReady]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 9999,
        fontFamily: "'Geist', sans-serif",
        // Fade the whole screen out on exit
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* ── Keyframes ─────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1);   opacity: 1; }
          50%       { transform: scale(1.5); opacity: 0.7; }
        }
        @keyframes floatCard0 {
          0%, 100% { transform: translate(-50%,-50%) translateY(0px); }
          50%       { transform: translate(-50%,-50%) translateY(-12px); }
        }
        @keyframes floatCard1 {
          0%, 100% { transform: translate(-50%,-50%) translateY(-8px); }
          50%       { transform: translate(-50%,-50%) translateY(8px); }
        }
        @keyframes floatCard2 {
          0%, 100% { transform: translate(-50%,-50%) translateY(6px); }
          50%       { transform: translate(-50%,-50%) translateY(-10px); }
        }
        @keyframes revealInvited {
          0%   { opacity:0; transform:scale(0.6) translateY(30px); filter:blur(20px); }
          60%  { filter:blur(2px); }
          100% { opacity:1; transform:scale(1) translateY(0px);  filter:blur(0px); }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0px); }
        }
        @keyframes ambientPulse {
          0%,100% { opacity:0.4; transform:scale(1);   }
          50%      { opacity:0.7; transform:scale(1.1); }
        }
        @keyframes orbitalRing {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to   { transform:translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes spinnerRotate {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes shimmerText {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glowPulse {
          0%,100% { text-shadow:0 0 30px rgba(221,184,255,0.4), 0 0 60px rgba(147,51,234,0.2); }
          50%      { text-shadow:0 0 50px rgba(221,184,255,0.8), 0 0 100px rgba(147,51,234,0.5); }
        }
        @keyframes readyBurst {
          0%   { transform:scale(1);   box-shadow:0 0 0px rgba(147,51,234,0); }
          50%  { transform:scale(1.12); box-shadow:0 0 60px rgba(147,51,234,0.6); }
          100% { transform:scale(1);   box-shadow:0 0 0px rgba(147,51,234,0); }
        }
      `}</style>

      {/* ── Starfield ─────────────────────────────────────────────────────── */}
      <StarCanvas />

      {/* ── Ambient glow blobs ────────────────────────────────────────────── */}
      {[
        { w:500, h:500, color:"rgba(147,51,234,0.18)",  top:"10%", left:"10%",  dur:"5s", del:"0s"  },
        { w:400, h:400, color:"rgba(5,102,217,0.15)",   bottom:"10%",right:"10%",dur:"6s", del:"1s"  },
        { w:300, h:300, color:"rgba(255,176,205,0.12)", top:"60%", left:"70%",  dur:"7s", del:"2s"  },
      ].map((b, i) => (
        <div key={i} style={{
          position:"absolute", width:b.w, height:b.h, borderRadius:"50%",
          background:`radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
          filter:"blur(80px)", top:b.top, left:b.left, bottom:b.bottom, right:b.right,
          animation:`ambientPulse ${b.dur} ease-in-out infinite ${b.del}`,
          pointerEvents:"none",
        }}/>
      ))}

      {/* ── Orbital rings ─────────────────────────────────────────────────── */}
      {[
        { size:480, border:"rgba(221,184,255,0.08)", dur:"30s",  dir:"normal",  dotColor:"#ddb8ff", dotPos:"top" },
        { size:560, border:"rgba(5,102,217,0.06)",   dur:"45s",  dir:"reverse", dotColor:"#adc6ff", dotPos:"bottom" },
      ].map((ring, i) => (
        <div key={i} style={{
          position:"absolute", width:ring.size, height:ring.size,
          left:"50%", top:"50%", borderRadius:"50%",
          border:`1px solid ${ring.border}`,
          animation:`orbitalRing ${ring.dur} linear infinite ${ring.dir}`,
          pointerEvents:"none",
        }}>
          <div style={{
            position:"absolute",
            ...(ring.dotPos === "top" ? { top:-4 } : { bottom:-4 }),
            left:"50%", transform:"translateX(-50%)",
            width:8, height:8, borderRadius:"50%",
            background:ring.dotColor,
            boxShadow:`0 0 12px ${ring.dotColor}cc`,
          }}/>
        </div>
      ))}

      {/* ── Floating senior portrait cards ────────────────────────────────── */}
      <div style={{ position:"absolute", width:0, height:0, left:"50%", top:"42%" }}>
        {SENIORS.map((s, i) => (
          <FloatingCard key={s.id} senior={s} index={i} />
        ))}
      </div>

      {/* ── Main text content ─────────────────────────────────────────────── */}
      <div style={{
        position:"relative", zIndex:10, textAlign:"center",
        display:"flex", flexDirection:"column", alignItems:"center", gap:0,
        // Burst effect when server becomes ready
        animation: serverReady ? "readyBurst 0.8s ease forwards" : "none",
      }}>

        {/* Invitation chip */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:6,
          background:"rgba(221,184,255,0.08)",
          border:"1px solid rgba(221,184,255,0.2)",
          borderRadius:999, padding:"4px 14px", marginBottom:20,
          animation:"fadeSlideUp 0.8s ease 0.2s both",
        }}>
          <span className="material-symbols-outlined" style={{ fontSize:14, color:"#ddb8ff" }}>
            mail
          </span>
          <span style={{
            fontSize:11, fontWeight:500, letterSpacing:"0.12em",
            color:"#ddb8ff", textTransform:"uppercase",
          }}>
            Class of 2026
          </span>
        </div>

        {/* "You Are Invited." headline */}
        <h1 style={{
          fontSize:"clamp(2.2rem, 8vw, 5rem)", fontWeight:700,
          lineHeight:1.1, letterSpacing:"-0.04em", margin:0,
          background:"linear-gradient(135deg, #ffffff 20%, #ddb8ff 50%, #9333ea 80%)",
          backgroundSize:"200% auto",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          animation:"revealInvited 1.2s cubic-bezier(0.22,1,0.36,1) forwards, shimmerText 4s linear infinite, glowPulse 3s ease-in-out infinite",
        }}>
          You Are
          <br />
          <span style={{
            background:"linear-gradient(135deg, #ddb8ff 0%, #adc6ff 40%, #ffb0cd 80%)",
            backgroundSize:"200% auto",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            animation:"shimmerText 3s linear infinite reverse",
          }}>
            Invited.
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          marginTop:20,
          fontSize:"clamp(0.85rem, 2.5vw, 1.05rem)",
          color:"rgba(207,194,215,0.7)",
          fontWeight:400, lineHeight:1.6, maxWidth:340,
          animation:"fadeSlideUp 0.8s ease 0.6s both",
        }}>
          A digital farewell to the Class of 2026.
          <br />
          Your journey, forever preserved.
        </p>

        {/* Thin divider */}
        <div style={{
          marginTop:28, width:60, height:1,
          background:"linear-gradient(90deg, transparent, rgba(221,184,255,0.5), transparent)",
          animation:"fadeSlideUp 0.8s ease 0.8s both",
        }}/>

        {/* Loading / ready status area */}
        <div style={{
          marginTop:28, display:"flex", flexDirection:"column",
          alignItems:"center", gap:14,
          animation:"fadeSlideUp 0.8s ease 1.2s both",
        }}>
          {/* Spinner — replaced by checkmark when ready */}
          {serverReady ? (
            <div style={{
              width:44, height:44, borderRadius:"50%",
              background:"linear-gradient(135deg, rgba(147,51,234,0.3), rgba(5,102,217,0.3))",
              border:"2px solid rgba(221,184,255,0.6)",
              boxShadow:"0 0 24px rgba(221,184,255,0.5)",
              display:"flex", alignItems:"center", justifyContent:"center",
              animation:"revealInvited 0.5s ease forwards",
            }}>
              <span className="material-symbols-outlined" style={{ color:"#ddb8ff", fontSize:22 }}>
                check
              </span>
            </div>
          ) : (
            <div style={{ position:"relative", width:44, height:44 }}>
              <div style={{
                position:"absolute", inset:0, borderRadius:"50%",
                border:"2px solid rgba(221,184,255,0.1)",
              }}/>
              <div style={{
                position:"absolute", inset:0, borderRadius:"50%",
                border:"2px solid transparent",
                borderTopColor:"#ddb8ff",
                borderRightColor:"rgba(221,184,255,0.3)",
                animation:"spinnerRotate 1.2s cubic-bezier(0.4,0,0.2,1) infinite",
              }}/>
              <div style={{
                position:"absolute", inset:6, borderRadius:"50%",
                border:"1.5px solid transparent",
                borderTopColor:"#9333ea",
                animation:"spinnerRotate 1.8s cubic-bezier(0.4,0,0.2,1) infinite reverse",
              }}/>
            </div>
          )}

          {/* Status text */}
          <p key={statusText} style={{
            fontSize:"0.8rem",
            color: serverReady ? "rgba(221,184,255,0.85)" : "rgba(207,194,215,0.5)",
            letterSpacing:"0.06em", textTransform:"uppercase",
            fontWeight: serverReady ? 600 : 500,
            animation:"fadeSlideUp 0.4s ease forwards",
            margin:0,
            transition:"color 0.4s ease",
          }}>
            {statusText}
          </p>

          {/* Progress dots */}
          <ProgressDots step={dotStep} />
        </div>
      </div>

      {/* Bottom watermark */}
      <div style={{
        position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)",
        zIndex:10, animation:"fadeSlideUp 1s ease 2s both",
      }}>
        <p style={{
          fontSize:"0.7rem", color:"rgba(221,184,255,0.25)",
          letterSpacing:"0.1em", textTransform:"uppercase",
          textAlign:"center", margin:0,
        }}>
          TWILIGHT · Digital Archive · 2026
        </p>
      </div>
    </div>
  );
}
