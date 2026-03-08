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
        <div className="group relative overflow-hidden rounded-sm cursor-pointer border border-white/5 bg-dark-700 h-72">
             {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-800 z-0">
                    <div className="w-full h-full absolute inset-0 bg-dark-700 animate-pulse"></div>
                    <div className="relative z-10 w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin"></div>
                </div>
            )}
            
            <div className="absolute inset-0 bg-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            
            <img 
                src={image.src} 
                alt={image.alt}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoading(false)}
                className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            />
            
            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <div className="w-10 h-1 bg-gold-500 mb-2"></div>
                <p className="text-white font-serif tracking-widest uppercase text-sm">{image.alt}</p>
            </div>
        </div>
    );
};

export const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-dark-800">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
            <p className="text-gold-500 font-serif italic text-xl mb-2">Photos</p>
            <div className="separator"><div className="separator-icon"></div></div>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Our Gallery</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((image) => (
                <GalleryImage key={image.id} image={image} />
            ))}
        </div>

      </div>
    </section>
  );
};