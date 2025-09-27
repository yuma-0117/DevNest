// src/components/icons/pin-icon.tsx
import React from 'react';

export const PinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 17V20" />
    <path d="M18 18H6" />
    <path d="M10 12L12 2L14 12L22 14L14 16L12 22L10 16L2 14L10 12Z" />
  </svg>
);
