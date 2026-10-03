import React, { useEffect } from 'react';

export default function CampusBuddyEnhancer() {
  useEffect(() => {
    // Inject smooth, subtle entrance and idle floating styles to the Botpress container
    const styleId = 'campus-buddy-custom-animation';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      /* Target Botpress launcher container with smooth hardware-accelerated entrance and gentle breathing */
      #bp-web-widget-container,
      div:has(> iframe[title*="chat" i]),
      div:has(> iframe[src*="botpress" i]),
      .bp-widget-web,
      #bp-web-widget {
        animation: botpressEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                   botpressGlowPulse 2.5s ease-out 1,
                   botpressSubtleFloat 6s ease-in-out infinite 2.5s !important;
        transform-origin: bottom right;
        transition: transform 0.25s ease, filter 0.25s ease !important;
      }

      #bp-web-widget-container:hover,
      .bp-widget-web:hover {
        transform: scale(1.05) !important;
        filter: drop-shadow(0 0 16px rgba(14, 165, 233, 0.4)) !important;
      }

      @keyframes botpressEntrance {
        0% {
          opacity: 0;
          transform: translateY(20px) scale(0.88);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes botpressGlowPulse {
        0% {
          box-shadow: 0 0 0 0 rgba(58, 136, 254, 0.7);
        }
        50% {
          box-shadow: 0 0 0 16px rgba(58, 136, 254, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(58, 136, 254, 0);
        }
      }

      @keyframes botpressSubtleFloat {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-3px);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        #bp-web-widget-container,
        .bp-widget-web {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return null;
}
