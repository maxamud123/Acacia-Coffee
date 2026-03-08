import React from 'react';

interface LogoProps {
  className?: string;
  classNameText?: string; // For the 'A' inside if needed, though we use current color
}

export const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3" />
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {/* The 'A' Shape */}
      <path 
        d="M50 15 L80 85 H70 L64 70 H36 L30 85 H20 L50 15Z" 
        fill="currentColor" 
        opacity="0.9"
      />
      
      {/* Cutout for the leaf/bean effect (Inverse) or overlay */}
      <path 
        d="M50 35 C50 35 30 50 35 65 C40 80 60 70 60 70 C60 70 45 75 40 60 C35 45 50 35 50 35Z" 
        fill="currentColor"
        className="text-dark-900" 
        style={{ fill: 'var(--color-bg, #0e1013)' }} // Uses background color to create 'cutout' look
      />
      
      {/* Coffee Bean Accent */}
      <path 
        d="M65 55 C65 55 58 55 55 60 C52 65 55 70 55 70" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  );
};