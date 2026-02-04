import React from 'react';

interface SchematicImageProps {
  src: string;
  alt: string;
  className?: string;
  label?: string;
}

const SchematicImage: React.FC<SchematicImageProps> = ({ src, alt, className = "", label }) => {
  return (
    <div className={`scifi-image-wrapper group w-full h-full bg-zinc-900 ${className}`}>
      {/* The Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover scifi-image-filter opacity-60 group-hover:opacity-80 duration-700"
      />

      {/* Scanline Animation Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[20%] w-full animate-scanline pointer-events-none" />

      {/* Optional Label (Tech Readout style) */}
      {label && (
        <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start">
          <div className="bg-black/80 backdrop-blur px-3 py-1 border-l-2 border-white/50">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">
              IMG_REF // {label}
            </span>
          </div>
        </div>
      )}

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 z-20" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 z-20" />
    </div>
  );
};

export default SchematicImage;
