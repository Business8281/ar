'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Camera, RefreshCcw } from 'lucide-react';

interface ARViewerProps {
  modelUrl: string;
  poster?: string;
  alt?: string;
}

const ARViewer: React.FC<ARViewerProps> = ({ modelUrl, poster, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modelRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Import model-viewer for client-side use
    import('@google/model-viewer');
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setError(null);
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      setError('Camera access required for Real-Time AR');
    }
  };

  useEffect(() => {
    const viewer = modelRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      setIsLoaded(true);
    };

    viewer.addEventListener('load', handleLoad);
    return () => viewer.removeEventListener('load', handleLoad);
  }, [modelUrl]);

  return (
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-3xl bg-black border border-white/5 shadow-2xl group flex flex-col items-center justify-center">
      {/* Background Video for Inline AR */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${cameraActive ? 'opacity-50' : 'opacity-0'}`}
      />

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      
      <model-viewer
        ref={modelRef}
        src={modelUrl}
        alt={alt || "3D Product"}
        ar
        ar-modes="webxr quick-look scene-viewer"
        ar-placement="floor"
        ar-scale="fixed"
        camera-controls
        auto-rotate
        shadow-intensity="1.5"
        exposure="1"
        environment-image="neutral"
        loading="eager"
        reveal="auto"
        poster={poster}
        enable-pan
        touch-action="none"
        style={{ width: '100%', height: '100%', outline: 'none', background: 'transparent' }}
      >
        {/* Real-Time AR Toggle */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          {!cameraActive && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                startCamera();
              }}
              className="pointer-events-auto glass-dark text-[10px] font-black text-white/80 px-6 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <Camera size={14} /> Enable Reality Mode
            </button>
          )}
          {error && (
            <span className="text-[10px] text-red-500 font-bold bg-black/80 px-4 py-2 rounded-full border border-red-500/30">
              {error}
            </span>
          )}
        </div>

        {/* Existing System AR Button Slot (Renamed to "View in 3D Space") */}
        <div slot="ar-button" className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 w-full max-w-xs">
          <button className="w-full glass border-primary/50 text-white px-8 py-4 rounded-2xl font-black shadow-[0_0_40px_rgba(255,77,77,0.2)] flex items-center justify-center gap-3 hover:bg-primary transition-all active:scale-95 text-sm uppercase">
            <RefreshCcw size={18} /> Full Space View
          </button>
        </div>
      </model-viewer>
    </div>
  );
};

export default ARViewer;

