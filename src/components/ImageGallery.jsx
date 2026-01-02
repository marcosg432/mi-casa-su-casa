import React from 'react';
import './ImageGallery.css';

export function ImageGallery() {
  // Imagens Desktop
  const images = [
    // Imagens essa1 até essa14
    { number: 1, src: '/imagem/essa1.jpg' },
    { number: 2, src: '/imagem/essa2.jpg' },
    { number: 3, src: '/imagem/essa3.jpg' },
    { number: 4, src: '/imagem/essa4.jpg' },
    { number: 5, src: '/imagem/essa5.jpg' },
    { number: 6, src: '/imagem/essa6.jpg' },
    { number: 7, src: '/imagem/essa7.jpg' },
    { number: 8, src: '/imagem/essa8.jpg' },
    { number: 9, src: '/imagem/essa9.jpg' },
    { number: 10, src: '/imagem/essa10.jpg' },
    { number: 11, src: '/imagem/essa11.jpg' },
    { number: 12, src: '/imagem/essa12.jpg' },
    { number: 13, src: '/imagem/essa13.jpg' },
    { number: 14, src: '/imagem/essa14.jpg' },
    // Imagens numeradas 1 até 14 (verificando pastas vertical e horizontal)
    { number: 15, src: '/imagem/vertical/1.jpg' },
    { number: 16, src: '/imagem/vertical/3.jpg' },
    { number: 18, src: '/imagem/vertical/8.jpg' },
    { number: 19, src: '/imagem/vertical/9.jpg' },
    { number: 20, src: '/imagem/vertical/10.jpg' },
    { number: 21, src: '/imagem/vertical/11.jpg' },
    { number: 22, src: '/imagem/vertical/14.jpg' },
    { number: 23, src: '/imagem/orizontal/2.jpg' },
    { number: 24, src: '/imagem/orizontal/5.jpg' },
    { number: 25, src: '/imagem/orizontal/6.jpg' },
    { number: 26, src: '/imagem/orizontal/7.jpg' },
    { number: 27, src: '/imagem/orizontal/13.jpg' },
    { number: 28, src: '/imagem/orizontal/14.jpg' },
  ];

  // Imagens Mobile (sem a última imagem - orizontal/14.jpg)
  const imagesMobile = [
    // Imagens essa1 até essa14
    { number: 1, src: '/imagem/essa1.jpg' },
    { number: 2, src: '/imagem/essa2.jpg' },
    { number: 3, src: '/imagem/essa3.jpg' },
    { number: 4, src: '/imagem/essa4.jpg' },
    { number: 5, src: '/imagem/essa5.jpg' },
    { number: 6, src: '/imagem/essa6.jpg' },
    { number: 7, src: '/imagem/essa7.jpg' },
    { number: 8, src: '/imagem/essa8.jpg' },
    { number: 9, src: '/imagem/essa9.jpg' },
    { number: 10, src: '/imagem/essa10.jpg' },
    { number: 11, src: '/imagem/essa11.jpg' },
    { number: 12, src: '/imagem/essa12.jpg' },
    { number: 13, src: '/imagem/essa13.jpg' },
    { number: 14, src: '/imagem/essa14.jpg' },
    // Imagens numeradas 1 até 14 (verificando pastas vertical e horizontal)
    { number: 15, src: '/imagem/vertical/1.jpg' },
    { number: 16, src: '/imagem/vertical/3.jpg' },
    { number: 18, src: '/imagem/vertical/8.jpg' },
    { number: 19, src: '/imagem/vertical/9.jpg' },
    { number: 20, src: '/imagem/vertical/10.jpg' },
    { number: 21, src: '/imagem/vertical/11.jpg' },
    { number: 22, src: '/imagem/vertical/14.jpg' },
    { number: 23, src: '/imagem/orizontal/2.jpg' },
    { number: 24, src: '/imagem/orizontal/5.jpg' },
    { number: 25, src: '/imagem/orizontal/6.jpg' },
    { number: 26, src: '/imagem/orizontal/7.jpg' },
    { number: 27, src: '/imagem/orizontal/13.jpg' },
  ];

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
    </>
  );
}


