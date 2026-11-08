import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
}

/**
 * Faithful geometric representation of the SK Developers monogram.
 * Note: When used in the Top Bar, follow the 3-Zone Top Bar Contract
 * (single clean brand element without extra badge/location clutter).
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
}) => {
  const dimensions =
    size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : 'w-8 h-8';
  const textSize =
    size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg';

  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${dimensions} shrink-0`}
        aria-hidden="true"
      >
        <rect
          width="64"
          height="64"
          rx="12"
          className="fill-slate-900 dark:fill-[#0E131A]"
        />
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="10.5"
          className="stroke-cyan-500/40 dark:stroke-cyan-400/35"
          strokeWidth="1.5"
        />
        {/* Precision Geometric S */}
        <path
          d="M28 16H17L12 23.5L17 31H26L29 35.5L25 42H13V48H28L35 37.5L30 30H20L18 27L20 22H28V16Z"
          className="fill-white dark:fill-slate-100"
        />
        {/* Precision Geometric K */}
        <path
          d="M36 16V48H42V34.5L50 48H57L47.5 32L56.5 16H49.5L42 29.5V16H36Z"
          className="fill-cyan-400"
        />
      </svg>
      {showWordmark && (
        <span
          className={`font-display font-bold tracking-normal text-slate-900 dark:text-white ${textSize}`}
        >
          SK{' '}Developers
        </span>
      )}
    </span>
  );
};
