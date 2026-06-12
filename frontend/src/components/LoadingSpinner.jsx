import React from 'react';
import Logo from './Logo';

export default function LoadingSpinner({ size = 'xs', dark = false, className = '' }) {
  return (
    <Logo
      showText={false}
      dark={dark}
      animated={true}
      size={size}
      className={`inline-block ${className}`}
    />
  );
}
