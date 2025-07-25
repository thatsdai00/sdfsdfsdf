import React, { useMemo } from 'react';

const BackgroundWords: React.FC = () => {
  const betrayalWords = [
    'betrayal', 'خيانة', 'trahison', 'предательство', '背叛',
    'traição', 'tradimento', 'verrat', 'traición', 'verrassing',
    'κλαδές', '배신', 'خیانت', 'izdaja', 'petokun', 'árulás',
    'svika', 'zrada', 'tälja', 'pettuminen', 'svek', 'zdrada',
    'pronevěra', 'iznevera', 'वेवफाई', 'धोका', 'penghianatan',
    'pagkakatraydor', 'การทรยศ', 'sự phản bội', 'vēl', 'petėl'
  ];

  const backgroundElements = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => {
      const word = betrayalWords[Math.floor(Math.random() * betrayalWords.length)];
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 0.8 + Math.random() * 1.5; // 0.8rem to 2.3rem
      const opacity = 0.03 + Math.random() * 0.15; // Darker, more subtle
      const weight = Math.random() > 0.7 ? 700 : Math.random() > 0.4 ? 500 : 300;
      const blur = Math.random() * 3; // Increased blur for depth
      const animationDelay = Math.random() * 15; // More random timing
      const animationDuration = 5 + Math.random() * 10; // More chaotic timing
      const colorVariant = Math.random();
      
      return {
        id: i,
        word,
        x,
        y,
        size,
        opacity,
        weight,
        blur,
        animationDelay,
        animationDuration,
        colorVariant
      };
    });
  }, []);

  const getTextColor = (colorVariant: number) => {
    if (colorVariant < 0.7) return '#6b7280'; // Gray-500
    if (colorVariant < 0.85) return '#8b4513'; // Saddle brown
    if (colorVariant < 0.95) return '#4b0082'; // Indigo
    return '#dc2626'; // Red-600
  };
  return (
    <div className="absolute inset-0 overflow-hidden">
      {backgroundElements.map((element) => (
        <div
          key={element.id}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}rem`,
            opacity: element.opacity,
            fontWeight: element.weight,
            filter: `blur(${element.blur}px)`,
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            color: getTextColor(element.colorVariant),
            animation: `chaosBackgroundSwing ${element.animationDuration}s ease-in-out infinite`,
            animationDelay: `${element.animationDelay}s`,
            transform: 'translate(-50%, -50%)',
            textShadow: `
              0 0 10px rgba(255, 255, 255, 0.02),
              0 0 20px rgba(139, 69, 19, 0.05),
              0 0 30px rgba(75, 0, 130, 0.03)
            `
          }}
        >
          {element.word}
        </div>
      ))}

      <style jsx>{`
        @keyframes chaosBackgroundSwing {
          0% { transform: translate(-50%, -50%) translateX(0px) translateY(0px) rotate(0deg); }
          8% { transform: translate(-50%, -50%) translateX(-4px) translateY(-3px) rotate(-0.8deg); }
          16% { transform: translate(-50%, -50%) translateX(3px) translateY(-4px) rotate(0.6deg); }
          24% { transform: translate(-50%, -50%) translateX(-2px) translateY(3px) rotate(-0.4deg); }
          32% { transform: translate(-50%, -50%) translateX(4px) translateY(-2px) rotate(0.7deg); }
          40% { transform: translate(-50%, -50%) translateX(-3px) translateY(4px) rotate(-0.5deg); }
          48% { transform: translate(-50%, -50%) translateX(2px) translateY(-3px) rotate(0.3deg); }
          56% { transform: translate(-50%, -50%) translateX(-4px) translateY(2px) rotate(-0.6deg); }
          64% { transform: translate(-50%, -50%) translateX(3px) translateY(-4px) rotate(0.4deg); }
          72% { transform: translate(-50%, -50%) translateX(-2px) translateY(3px) rotate(-0.7deg); }
          80% { transform: translate(-50%, -50%) translateX(4px) translateY(-2px) rotate(0.5deg); }
          88% { transform: translate(-50%, -50%) translateX(-3px) translateY(4px) rotate(-0.3deg); }
          96% { transform: translate(-50%, -50%) translateX(2px) translateY(-3px) rotate(0.8deg); }
          100% { transform: translate(-50%, -50%) translateX(0px) translateY(0px) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default BackgroundWords;