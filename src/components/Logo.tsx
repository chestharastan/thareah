/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const tmorLogo = new URL('../assets/images/tmor.svg', import.meta.url).href;

interface LogoProps {
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
}: LogoProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        backgroundColor: hasBackground ? '#f2eee3' : 'transparent',
        color: iconColor,
        overflow: 'hidden',
        borderRadius: hasBackground ? '9999px' : undefined,
      }}
    >
      <img
        src={tmorLogo}
        alt=""
        aria-hidden="true"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </span>
  );
}
