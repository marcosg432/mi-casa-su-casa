import React, { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getGaleriaImagens } from '../utils/storage';
import './ImageGallery.css';

export function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesMobile, setImagesMobile] = useState([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const todasImagens = getGaleriaImagens();
    setImages(todasImagens);
    // Mobile: todas as imagens exceto a última
    setImagesMobile(todasImagens.slice(0, -1));
  }, []);

  const currentImages = isMobile ? imagesMobile : images;

  const openModal = (image, index) => {
    setSelectedImage({ ...image, index });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedImage) {
      const nextIndex = (selectedImage.index + 1) % currentImages.length;
      setSelectedImage({ ...currentImages[nextIndex], index: nextIndex });
    }
  };

  const prevImage = () => {
    if (selectedImage) {
      const prevIndex = selectedImage.index === 0 ? currentImages.length - 1 : selectedImage.index - 1;
      setSelectedImage({ ...currentImages[prevIndex], index: prevIndex });
    }
  };

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        const nextIndex = (selectedImage.index + 1) % currentImages.length;
        setSelectedImage({ ...currentImages[nextIndex], index: nextIndex });
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = selectedImage.index === 0 ? currentImages.length - 1 : selectedImage.index - 1;
        setSelectedImage({ ...currentImages[prevIndex], index: prevIndex });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImages]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {/* Galeria Desktop */}
      <section className="galeria-mosaico galeria-mosaico-desktop">
        <div className="masonry-container masonry-container-desktop">
          {images.map((image, index) => {
            // Identificar a última imagem da coluna do meio
            // Com 27 imagens em 3 colunas, a coluna do meio vai aproximadamente do índice 9 ao 18
            const totalImages = images.length
            const imagesPerCol = Math.ceil(totalImages / 3)
            const middleColStart = imagesPerCol
            const middleColEnd = imagesPerCol * 2
            // Última imagem da coluna do meio
            const isLastMiddleImage = index === middleColEnd - 1
            return (
              <div 
                key={image.number || index} 
                className={`masonry-item ${isLastMiddleImage ? 'masonry-item-middle-align' : ''}`}
                onClick={() => openModal(image, index)}
              >
                <img
                  src={image.src}
                  alt={`Imagem ${image.number || index}`}
                  loading="lazy"
                />
              </div>
            )
          })}
        </div>
      </section>

      {/* Galeria Mobile */}
      <section className="galeria-mosaico galeria-mosaico-mobile">
        <div className="masonry-container masonry-container-mobile">
          {imagesMobile.map((image, index) => {
            return (
              <div 
                key={`mobile-${image.number || index}`} 
                className="masonry-item masonry-item-mobile"
                onClick={() => openModal(image, index)}
              >
                <img
                  src={image.src}
                  alt={`Imagem ${image.number || index}`}
                  loading="lazy"
                />
              </div>
            )
          })}
        </div>
      </section>

      {/* Modal Lightbox - Estilo Instagram */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={closeModal} aria-label="Fechar">
              <FaTimes />
            </button>
            
            <button 
              className="image-modal-nav image-modal-nav-prev" 
              onClick={prevImage}
              aria-label="Imagem anterior"
            >
              <FaChevronLeft />
            </button>
            
            <div className="image-modal-image-container">
              <img
                src={selectedImage.src}
                alt={`Imagem ${selectedImage.number || selectedImage.index}`}
                className="image-modal-image"
              />
            </div>
            
            <button 
              className="image-modal-nav image-modal-nav-next" 
              onClick={nextImage}
              aria-label="Próxima imagem"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
}


