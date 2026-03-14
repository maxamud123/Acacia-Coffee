import React, { useState } from 'react';

const GALLERY_IMAGES = [
  { id: 1, src: "https://picsum.photos/id/431/800/600", alt: "Cozy interior with coffee" },
  { id: 2, src: "https://picsum.photos/id/225/800/600", alt: "Tea setting" },
  { id: 3, src: "https://picsum.photos/id/292/800/600", alt: "Gourmet dishes" },
  { id: 4, src: "https://picsum.photos/id/1060/800/600", alt: "Barista crafting drinks" },
  { id: 5, src: "https://picsum.photos/id/429/800/600", alt: "Fresh ingredients" },
  { id: 6, src: "https://picsum.photos/id/326/800/600", alt: "Signature beverages" },
];

const GalleryImage: React.FC<{ image: typeof GALLERY_IMAGES[0] }> = ({ image }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="group relative overflow-hidden cursor-pointer bg-gray-100 h-64 rounded-sm">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-10" />

      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />

      <div className="absolute bottom-0 left-0 w-full p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-20">
        <div className="w-8 h-0.5 bg-gold-500 mb-2" />
        <p className="text-white font-sans tracking-widest uppercase text-xs font-medium">{image.alt}</p>
      </div>
    </div>
  );
};

export const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-10">

        <div className="text-center mb-14">
          <p className="text-gold-500 text-[10px] tracking-[0.5em] uppercase mb-4 font-medium">Photos</p>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 font-bold tracking-wide mb-5">Our Gallery</h2>
          <div className="w-10 h-px bg-gold-500/50 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {GALLERY_IMAGES.map((image) => (
            <GalleryImage key={image.id} image={image} />
          ))}
        </div>

      </div>
    </section>
  );
};
