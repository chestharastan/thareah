/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  iconColor?: string;
  hasBackground?: boolean;
}

export default function Logo({
  size = 24,
  className = '',
  iconColor = '#171717', // Neutral-900 default
  hasBackground = true,
  ...props
}: LogoProps) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 792.53 791.42"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {hasBackground && (
        <path
          d="m5.74,347.98c2.95-32.15,5.25-64.36,6.35-96.63C18.74,55.04,169.58,48.29,378.34,7.01c221.05-43.71,381.76,124.54,408.37,292.23,24.98,157.35-28.72,457.08-197.32,488.3-167.89,31.09-510.61-133.44-561.98-187.33C-8.02,563.05-1.58,427.75,5.74,347.98Z"
          fill="#f2eee3"
        />
      )}
      <g transform="translate(146, 146) scale(5)" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer Ring outline of the Cafe Bean Harmony logo */}
        <circle cx="50" cy="50" r="41" fill="none" stroke={iconColor} strokeWidth="3" />

        {/* Wavy Steam rising from coffee cup */}
        <path d="M 33,34 C 29,30.5 28.5,24 33.5,16 C 31,20.5 31.5,26 35.5,30 C 37,31.5 35.5,34 33,34 Z" fill={iconColor} />

        {/* Coffee Cup Reservoir (Bowl) */}
        <path d="M 14,44 L 56,44 C 56,52 49,61 36,61 C 24,61 17,52 14,44 Z" fill={iconColor} />

        {/* Decorative flourish brush stroke (Saucer under the cup) */}
        <path d="M 18.5,61.5 C 27.5,69 41.5,70.5 56.5,53.5 C 58.5,51.2 59.5,48.5 59.5,45.5 C 59.5,44 56.5,44 55,44.5 C 49.5,52.5 38.5,61 24.5,59 C 21.5,58.5 20,59.5 18.5,61.5 Z" fill={iconColor} />

        {/* Coffee Bean 1 (Top) */}
        <g transform="translate(62, 26) rotate(-35) scale(0.9)" id="logo-sec-bean-1">
          <path d="M 0,14 C -4,10 -3,2 5,0 C 2,4 1,11 0,14 Z" fill={iconColor} />
          <path d="M 1.5,14.5 C 4,13 6,5 5,0 C 8,2 9,10 6,13 Z" fill={iconColor} />
        </g>

        {/* Coffee Bean 2 (Middle) */}
        <g transform="translate(71, 41) rotate(15) scale(0.9)" id="logo-sec-bean-2">
          <path d="M 0,14 C -4,10 -3,2 5,0 C 2,4 1,11 0,14 Z" fill={iconColor} />
          <path d="M 1.5,14.5 C 4,13 6,5 5,0 C 8,2 9,10 6,13 Z" fill={iconColor} />
        </g>

        {/* Coffee Bean 3 (Bottom) */}
        <g transform="translate(65, 57) rotate(65) scale(0.9)" id="logo-sec-bean-3">
          <path d="M 0,14 C -4,10 -3,2 5,0 C 2,4 1,11 0,14 Z" fill={iconColor} />
          <path d="M 1.5,14.5 C 4,13 6,5 5,0 C 8,2 9,10 6,13 Z" fill={iconColor} />
        </g>
      </g>
    </svg>
  );
}
