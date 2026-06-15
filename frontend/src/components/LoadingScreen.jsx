import React from 'react';
import Logo from './Logo';

export default function LoadingScreen({ message = 'Loading...', dark = true }) {
  const bgClass = dark ? 'bg-deep-green' : 'bg-cream';
  const textColor = dark ? 'text-cream/80' : 'text-deep-green/80';

  return (
    <div className={`flex justify-center items-center min-h-screen ${bgClass} transition-colors duration-500`}>
      <div className="text-center p-6 flex flex-col items-center">
        {/* Animated Brand Logo */}
        <Logo
          showText={true}
          showTagline={true}
          dark={dark}
          animated={true}
          size="2xl"
          layout="vertical"
          className="mb-6 transform hover:scale-105 transition-transform duration-300"
        />
        
        {/* Message */}
        <p className={`text-sm sm:text-base font-medium tracking-wide animate-pulse mt-2 ${textColor}`}>
          {message}
        </p>
      </div>
    </div>
  );
}
