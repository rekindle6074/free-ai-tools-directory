import React, { useEffect } from 'react';

interface BgradientAnimProps {
  className?: string;
  animationDuration?: number;
}

const BgradientAnim: React.FC<BgradientAnimProps> = ({
  className = "",
  animationDuration = 5,
}) => {
  useEffect(() => {
    // Add required CSS for the oklch gradient animation
    const styleId = 'oklch-gradient-style';
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = `
        @property --hue1 {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        @property --hue2 {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        
        .oklch-gradient-bg {
          background-image: linear-gradient(
              in oklch longer hue to right,
              oklch(0.85 0.07 var(--hue1) / 40%),
              oklch(0.82 0.08 var(--hue2) / 40%)
            ),
            linear-gradient(
              in oklch longer hue to bottom,
              oklch(0.85 0.07 var(--hue1) / 40%),
              oklch(0.82 0.08 var(--hue2) / 40%)
            );
          background-size: 100% 100%;
          animation-name: anim_bg;
          animation-duration: ${animationDuration}s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        
        @keyframes anim_bg {
          0% {
            --hue1: 30deg;
            --hue2: 180deg;
          }
          100% {
            --hue1: 390deg;
            --hue2: 540deg;
          }
        }
      `;
      document.head.appendChild(styleEl);
    }
    
    return () => {
      // We might want to keep the style if multiple components use it, 
      // but usually for a global background we can just keep it.
    };
  }, [animationDuration]);

  return (
    <div className={`oklch-gradient-bg w-full h-full ${className}`} />
  );
};

export { BgradientAnim };
