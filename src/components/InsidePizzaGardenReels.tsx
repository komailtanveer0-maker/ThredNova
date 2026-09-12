import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Maximize2, 
  Calendar,
  CheckCircle2, 
  Smartphone,
  Utensils
} from 'lucide-react';
import { VIDEO_REELS } from '../data/menuData';
import { VideoReel } from '../types';

interface VideoCardProps {
  reel: VideoReel;
  onSelectFeatured: (reelId: string) => void;
  onOpenReservation?: () => void;
}

const ReelCard: React.FC<VideoCardProps> = ({ reel, onSelectFeatured, onOpenReservation }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [showTapFeedback, setShowTapFeedback] = useState<boolean>(false);

  // Auto-play immediately and on viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    // Start playback immediately
    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // If browser blocked initial autoplay, set state to paused
      setIsPlaying(false);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              setIsPlaying(false);
            });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    setShowTapFeedback(true);
    setTimeout(() => setShowTapFeedback(false), 500);

    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);

    // If video was paused, start playback with sound
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {});
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const isKitchenReel = reel.id === 'reel-kitchen';

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full max-w-[340px] sm:max-w-[360px]">
      {/* 9:16 Vertical Reel Frame */}
      <div 
        onClick={togglePlay}
        className="group relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-neutral-900 border-2 border-amber-500/30 shadow-2xl shadow-black/80 cursor-pointer select-none transition-all duration-300 hover:border-amber-500 hover:shadow-amber-500/20"
      >
        {/* Background Poster Image as instant fallback */}
        <img
          src={reel.posterUrl}
          alt={reel.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* HTML5 Native Video Tag */}
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.posterUrl}
          autoPlay
          preload="auto"
          playsInline
          loop
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="relative z-10 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
        />

        {/* Top Floating Glass Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950/85 backdrop-blur-md border border-neutral-700/60 text-[11px] font-bold text-amber-300 shadow-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>CHAKWAL REEL</span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-200">{reel.duration}</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-1.5">
            {/* Audio Toggle Button with Visual Status */}
            <button
              onClick={toggleMute}
              className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg ${
                isMuted 
                  ? 'bg-neutral-950/90 border-neutral-700/80 text-neutral-200 hover:text-amber-400 hover:border-amber-400/60' 
                  : 'bg-emerald-600/90 border-emerald-400/80 text-white animate-pulse'
              }`}
              title={isMuted ? "Tap to turn sound on" : "Mute sound"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px]">Unmute 🔊</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px]">Sound On 🎵</span>
                </>
              )}
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={handleFullscreen}
              className="p-1.5 rounded-full bg-neutral-950/85 backdrop-blur-md border border-neutral-700/60 text-white hover:text-amber-400 hover:bg-neutral-900 transition-colors shadow-lg"
              title="View Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Play/Pause Animated Overlay */}
        <div 
          className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-opacity duration-300 ${
            !isPlaying 
              ? 'opacity-100 bg-neutral-950/40 backdrop-blur-[1px]' 
              : showTapFeedback 
                ? 'opacity-90' 
                : 'opacity-0 group-hover:opacity-75'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-amber-500/90 text-neutral-950 flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110">
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-neutral-950" />
            ) : (
              <Play className="w-8 h-8 fill-neutral-950 ml-1" />
            )}
          </div>
        </div>

        {/* Bottom Card Information Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-transparent p-5 pt-12 z-30 pointer-events-none">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/25 rounded-full mb-3 overflow-hidden">
            <div 
              className="h-full bg-amber-400 transition-all duration-100" 
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-lg font-bold text-white tracking-wide font-['Cabinet_Grotesk',sans-serif]">
                {reel.title}
              </h4>
              <p className="text-xs text-amber-300 font-semibold mt-0.5">
                {reel.tagline}
              </p>
            </div>
            
            <button
              onClick={handleRestart}
              className="pointer-events-auto p-1.5 rounded-full bg-neutral-800/80 text-neutral-300 hover:text-white"
              title="Replay from start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {reel.features.slice(0, 3).map((feat, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 rounded-md bg-neutral-900/90 border border-neutral-700/50 text-[10px] text-neutral-300 font-medium"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Under-Reel Info & Action Buttons */}
      <div className="mt-4 w-full text-center space-y-2.5">
        <p className="text-xs text-neutral-400 line-clamp-2 px-2 leading-relaxed">
          {reel.description}
        </p>

        <div className="flex flex-col gap-1.5 pt-1">
          <button
            onClick={() => onSelectFeatured(reel.id)}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold shadow-md shadow-amber-500/10 transition-all flex items-center justify-center gap-1.5 hover:scale-[1.01]"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>
              {isKitchenReel 
                ? 'Order Fresh Baked Pizza & Rolls' 
                : 'Order Featured Dishes From Reel'}
            </span>
          </button>

          {!isKitchenReel && onOpenReservation && (
            <button
              onClick={onOpenReservation}
              className="w-full py-2 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 hover:text-white text-xs font-semibold border border-neutral-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table in This Ambience</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface InsidePizzaGardenProps {
  onOrderFeatured: (reelId: string) => void;
  onOpenReservation?: () => void;
}

export const InsidePizzaGardenReels: React.FC<InsidePizzaGardenProps> = ({ 
  onOrderFeatured,
  onOpenReservation
}) => {
  return (
    <section id="reels" className="py-20 bg-neutral-950 border-t border-neutral-800/80 relative overflow-hidden">
      {/* Ambient background glow decoration */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Vertical Video Reels Experience</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Cabinet_Grotesk',sans-serif]">
            Experience{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
              Inside PizzaGarden
            </span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base leading-relaxed">
            Step directly into our kitchen and dining halls in Chakwal. Watch our signature oven-baked pizzas, 
            bubbling cheese pulls, stuffed Behari spin rolls, and explore the warm, illuminated dining atmosphere.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              9:16 Authentic Chakwal Reels
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Continuous Auto-Looping
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Tap "Unmute 🔊" For Music
            </span>
          </div>
        </div>

        {/* 2-Column Vertical Video Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-4xl mx-auto justify-items-center">
          {VIDEO_REELS.map((reel) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              onSelectFeatured={onOrderFeatured}
              onOpenReservation={onOpenReservation}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
