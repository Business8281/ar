'use client';

import React, { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';

interface ARViewerProps {
  modelUrl: string;
  poster?: string;
  alt?: string;
}

const ARViewer: React.FC<ARViewerProps> = ({ modelUrl, poster, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const modelRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    // Import model-viewer for client-side use
    import('@google/model-viewer');
  }, []);

  useEffect(() => {
    const viewer = modelRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      console.log('Model loaded successfully');
      setIsLoaded(true);
    };

    const handleError = (error: any) => {
      console.error('Model failed to load:', error);
    };

    viewer.addEventListener('load', handleLoad);
    viewer.addEventListener('error', handleError);

    return () => {
      viewer.removeEventListener('load', handleLoad);
      viewer.removeEventListener('error', handleError);
    };
  }, [modelUrl]);

  return (
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/5 shadow-2xl">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0F0F0F] z-20">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
          <p className="text-primary font-medium animate-pulse tracking-widest text-xs uppercase">Initializing AR Reality...</p>
        </div>
      )}
      <model-viewer
        ref={modelRef}
        src={modelUrl}
        alt={alt || "3D Food Model"}
        ar
        ar-modes="webxr scene-viewer quick-look"
        ar-placement="floor"
        camera-controls
        auto-rotate
        shadow-intensity="2"
        shadow-softness="1"
        exposure="1.2"
        environment-image="neutral"
        loading="eager"
        reveal="auto"
        poster={poster}
        enable-pan
        style={{ width: '100%', height: '100%', outline: 'none', background: '#0F0F0F' }}
      >
        <div 
          slot="ar-button"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 w-full px-6"
        >
          <button className="glass border-primary/50 text-white px-10 py-5 rounded-2xl font-black shadow-[0_0_50px_rgba(255,77,77,0.3)] flex items-center gap-3 hover:bg-primary transition-all active:scale-95 group overflow-hidden relative">
            <span className="relative z-10 flex items-center gap-3 text-lg">
              <Camera size={24} className="group-hover:rotate-12 transition-transform" /> 
              ACTIVATE REAL AR
            </span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity -z-0" />
          </button>
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <p className="text-[10px] text-white/80 font-bold uppercase tracking-[0.2em]">
              LiDAR Depth Sensing Active
            </p>
          </div>
        </div>
      </model-viewer>
    </div>
  );
};

export default ARViewer;
