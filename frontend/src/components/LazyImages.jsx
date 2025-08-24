// Créez un composant LazyImage.jsx
import { useState, useRef, useEffect } from 'react';

const LazyImage = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsLoaded(true);
                    observer.disconnect();
                }
                });
            },
            { threshold: 0.1 }
            );

            if (imgRef.current) {
            observer.observe(imgRef.current);
            }

            return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
            };
        }, []);

        return (
            <div ref={imgRef} className={`bg-gray-200 ${className}`}>
            {isLoaded ? (
                <img src={src} alt={alt} className="w-full h-full object-contain" />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                <i className="fas fa-spinner fa-spin text-gray-400"></i>
                </div>
            )}
            </div>
        );
};

export default LazyImage;

// Utilisation dans ProductCard.jsx
// Remplacez l'image par: <LazyImage src={product.image} alt={product.name} className="h-48" />