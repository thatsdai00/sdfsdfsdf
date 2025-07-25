import React from 'react';

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center transition-all duration-1000">
      <button
        onClick={onEnter}
        className="group relative w-48 h-48 text-3xl font-black text-white overflow-hidden transition-all duration-300 hover:scale-105 rounded-full flex items-center justify-center"
        style={{
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
          letterSpacing: '0.1em',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)',
          border: '2px solid transparent',
          backgroundClip: 'padding-box',
          boxShadow: `
            0 0 20px rgba(139, 69, 19, 0.3),
            0 0 40px rgba(139, 69, 19, 0.2),
            inset 0 0 20px rgba(139, 69, 19, 0.1)
          `
        }}
      >
        {/* Glowing border effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(45deg, #8b4513, #a0522d, #8b4513, #654321)',
            backgroundSize: '400% 400%',
            animation: 'borderGlow 3s ease-in-out infinite',
            padding: '2px'
          }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)'
            }}
          />
        </div>
        
        <span className="relative z-10 block group-hover:animate-pulse">
          Tıkla
        </span>
        
        {/* Hover flicker effect */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-75 group-hover:animate-ping rounded-full"></div>
        
        {/* Subtle vibration on hover */}
        <style jsx>{`
          .group:hover {
            animation: subtleVibrate 0.1s ease-in-out infinite;
          }
          
          @keyframes subtleVibrate {
            0%, 100% { transform: translateX(0px) translateY(0px) scale(1.05); }
            25% { transform: translateX(-0.5px) translateY(0.5px) scale(1.05); }
            50% { transform: translateX(0.5px) translateY(-0.5px) scale(1.05); }
            75% { transform: translateX(-0.5px) translateY(-0.5px) scale(1.05); }
          }
          
          @keyframes borderGlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
      </button>
    </div>
  );
};

export default SplashScreen;