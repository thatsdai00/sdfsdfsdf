import React, { useState, useEffect, useRef } from 'react';
import SplashScreen from './components/SplashScreen';
import MainScene from './components/MainScene';
import { useDiscordNotification } from './utils/useDiscordNotification';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { notifyVisitor } = useDiscordNotification();

  const handleEnterSite = () => {
    setIsTransitioning(true);
    
    // Log visitor data when user clicks Continue button
    notifyVisitor();
    
    // Start playing music when user interacts
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
    
    // Glitch transition effect
    setTimeout(() => {
      setShowSplash(false);
      setIsTransitioning(false);
    }, 1000);
  };



  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Hidden audio element for background music */}
      <audio
        ref={audioRef}
        src="/song.mp3"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />
      
      {showSplash ? (
        <div className={isTransitioning ? 'animate-pulse' : ''}>
          <SplashScreen onEnter={handleEnterSite} />
          {isTransitioning && (
            <div className="fixed inset-0 z-50 pointer-events-none">
              {/* Intense digital corruption effects */}
              <div 
                className="absolute inset-0 bg-red-600 opacity-40 animate-pulse"
                style={{ 
                  animationDuration: '0.08s',
                  filter: 'blur(2px)'
                }}
              />
              <div 
                className="absolute inset-0 bg-purple-600 opacity-30 animate-ping"
                style={{ 
                  animationDuration: '0.12s',
                  filter: 'blur(1px)'
                }}
              />
              <div 
                className="absolute inset-0 bg-green-500 opacity-20 animate-bounce"
                style={{ 
                  animationDuration: '0.06s',
                  filter: 'blur(3px)'
                }}
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(255, 255, 255, 0.1) 2px,
                      rgba(255, 255, 255, 0.1) 4px
                    )
                  `,
                  animation: 'glitchLines 0.05s linear infinite'
                }}
              />
              {/* Screen tearing effect */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 50px,
                      rgba(255, 0, 0, 0.2) 50px,
                      rgba(255, 0, 0, 0.2) 52px
                    )
                  `,
                  animation: 'screenTear 0.1s linear infinite'
                }}
              />
              {/* Broken text flashes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="text-6xl font-black text-white opacity-60"
                  style={{
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                    animation: 'brokenText 0.2s linear infinite',
                    filter: 'blur(1px) contrast(2)',
                    textShadow: '2px 0 #ff0000, -2px 0 #00ff00'
                  }}
                >
                  ER█OR
                </div>
              </div>
              {/* Digital noise overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(circle at 20% 30%, rgba(255, 0, 0, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(0, 255, 0, 0.2) 0%, transparent 50%),
                    radial-gradient(circle at 40% 80%, rgba(0, 0, 255, 0.25) 0%, transparent 50%)
                  `,
                  animation: 'digitalNoise 0.03s linear infinite'
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <MainScene />
      )}
      
      <style jsx>{`
        @keyframes glitchLines {
          0% { transform: translateY(0px); }
          100% { transform: translateY(4px); }
        }
        
        @keyframes screenTear {
          0% { transform: translateX(0px); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(3px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0px); }
        }
        
        @keyframes brokenText {
          0% { transform: translateX(0px) skew(0deg); opacity: 0.6; }
          25% { transform: translateX(-3px) skew(2deg); opacity: 0.8; }
          50% { transform: translateX(2px) skew(-1deg); opacity: 0.4; }
          75% { transform: translateX(-1px) skew(3deg); opacity: 0.9; }
          100% { transform: translateX(0px) skew(0deg); opacity: 0.6; }
        }
        
        @keyframes digitalNoise {
          0% { opacity: 0.8; filter: hue-rotate(0deg); }
          25% { opacity: 0.6; filter: hue-rotate(90deg); }
          50% { opacity: 0.9; filter: hue-rotate(180deg); }
          75% { opacity: 0.4; filter: hue-rotate(270deg); }
          100% { opacity: 0.8; filter: hue-rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;