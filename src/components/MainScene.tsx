import React, { useState, useEffect } from 'react';
import BackgroundWords from './BackgroundWords';

const MainScene: React.FC = () => {
  const [currentText, setCurrentText] = useState('ihanet');
  const [isVisible, setIsVisible] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Fade in on mount
    setTimeout(() => setIsVisible(true), 100);

    const interval = setInterval(() => {
      setIsGlitching(true);
      setIsVisible(false);
      setTimeout(() => {
        setCurrentText(prev => prev === 'ihanet' ? 'iki yüzlüsün' : 'ihanet');
        setIsGlitching(false);
        setIsVisible(true);
      }, 1200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-950 overflow-hidden">
      <BackgroundWords />
      
      {/* Subtle red/purple overlay for oppressive atmosphere */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 69, 19, 0.03) 0%, rgba(75, 0, 130, 0.02) 50%, transparent 100%)'
        }}
      />
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 
          className={`text-6xl md:text-8xl lg:text-9xl font-black text-white select-none ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${isGlitching ? 'animate-pulse' : ''}`}
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            letterSpacing: '-0.02em',
            textShadow: `
              0 0 30px rgba(255, 255, 255, 0.1),
              0 0 60px rgba(139, 69, 19, 0.2),
              0 0 90px rgba(75, 0, 130, 0.1)
            `,
            animation: `chaosSwing ${8 + Math.random() * 4}s ease-in-out infinite`,
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: isGlitching ? 'blur(1px) brightness(1.2) contrast(1.1)' : 'none'
          }}
        >
          {currentText}
        </h1>
        
        {/* Glitch overlay effect */}
        {isGlitching && (
          <>
            <h1 
              className="absolute text-6xl md:text-8xl lg:text-9xl font-black text-red-500 select-none opacity-30"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                letterSpacing: '-0.02em',
                transform: 'translateX(-2px) translateY(-1px)',
                animation: 'glitchShake 0.1s ease-in-out infinite'
              }}
            >
              {currentText}
            </h1>
            <h1 
              className="absolute text-6xl md:text-8xl lg:text-9xl font-black text-purple-500 select-none opacity-20"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                letterSpacing: '-0.02em',
                transform: 'translateX(2px) translateY(1px)',
                animation: 'glitchShake 0.15s ease-in-out infinite reverse'
              }}
            >
              {currentText}
            </h1>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes chaosSwing {
          0% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          12.5% { transform: translateX(-3px) translateY(-2px) rotate(-0.4deg); }
          25% { transform: translateX(2px) translateY(-3px) rotate(0.3deg); }
          37.5% { transform: translateX(-1px) translateY(2px) rotate(-0.2deg); }
          50% { transform: translateX(3px) translateY(-1px) rotate(0.5deg); }
          62.5% { transform: translateX(-2px) translateY(3px) rotate(-0.3deg); }
          75% { transform: translateX(1px) translateY(-2px) rotate(0.2deg); }
          87.5% { transform: translateX(-3px) translateY(1px) rotate(-0.4deg); }
          100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
        }
        
        @keyframes glitchShake {
          0%, 100% { transform: translateX(-2px) translateY(-1px) skew(0deg); }
          25% { transform: translateX(2px) translateY(1px) skew(0.5deg); }
          50% { transform: translateX(-1px) translateY(2px) skew(-0.3deg); }
          75% { transform: translateX(1px) translateY(-2px) skew(0.2deg); }
        }
      `}</style>
    </div>
  );
};

export default MainScene;