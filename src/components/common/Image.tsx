import React, { useState } from 'react';
import { MediaAsset } from '../../types';
import { ImageOff, Sparkles } from 'lucide-react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  asset?: MediaAsset;
  aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
  showTemporaryBadge?: boolean;
  caption?: string;
  wrapperClassName?: string;
}

export const Image: React.FC<ImageProps> = ({
  asset,
  src,
  alt,
  aspectRatio = 'auto',
  showTemporaryBadge = false,
  caption,
  wrapperClassName = '',
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const finalSrc = asset?.src || src || '';
  const finalAlt = asset?.alt || alt || 'Image Preview';
  const isTemporary = asset?.isTemporary ?? false;
  const finalCaption = asset?.caption || caption;

  const aspectStyles = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
    auto: '',
  };

  return (
    <figure className={`relative group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-hover)] ${wrapperClassName}`}>
      <div className={`relative w-full h-full ${aspectStyles[aspectRatio]}`}>
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-[var(--color-surface-hover)] animate-pulse flex items-center justify-center">
            <span className="text-xs font-mono text-[var(--color-muted)]">Loading preview...</span>
          </div>
        )}

        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[var(--color-surface-hover)] text-[var(--color-muted)]">
            <ImageOff className="w-8 h-8 mb-2 stroke-1" />
            <span className="text-xs font-mono">Image asset pending upload</span>
          </div>
        ) : (
          <img
            src={finalSrc}
            alt={finalAlt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            {...props}
          />
        )}

        {/* Temporary Asset Notice Overlay */}
        {isTemporary && showTemporaryBadge && isLoaded && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span
              className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-black/75 text-amber-300 border border-amber-400/30 backdrop-blur-xs shadow-xs"
              title="Temporary sample media. Replaceable with verified project asset."
            >
              <Sparkles className="w-2.5 h-2.5" />
              Temporary Asset
            </span>
          </div>
        )}
      </div>

      {finalCaption && (
        <figcaption className="p-2.5 text-xs text-[var(--color-muted)] font-mono border-t border-[var(--color-border)] bg-[var(--color-surface)]/80">
          {finalCaption}
        </figcaption>
      )}
    </figure>
  );
};
