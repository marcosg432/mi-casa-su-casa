import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaTv, FaWifi, FaBox, FaEye, FaSnowflake, FaUtensils, FaWind } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import { getQuartoImages } from '../utils/quartosImages'
import './Quartos.css'

const Quartos = () => {
  // Imagens de cada quarto - usando função compartilhada
  const quarto1Images = getQuartoImages('quarto1')
  const quarto2Images = getQuartoImages('quarto2')
  const quarto3Images = getQuartoImages('quarto3')
  const quarto4Images = getQuartoImages('quarto4')

  // Estados para cada carrossel
  const [currentImage1, setCurrentImage1] = useState(0)
  const [currentImage2, setCurrentImage2] = useState(0)
  const [currentImage3, setCurrentImage3] = useState(0)
  const [currentImage4, setCurrentImage4] = useState(0)

  // Componente de carrossel reutilizável
  const RoomCarousel = ({ images, currentIndex, setCurrentIndex, roomId }) => {
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
    }, [images.length])

    return (
      <div className="quartos-page-card-carousel">
        <div className="quartos-page-card-carousel-images">
          {images.map((image, index) => (
            <div
              key={index}
              className={`quartos-page-card-carousel-image ${index === currentIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>
        <div className="quartos-page-card-carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`quartos-page-card-carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="quartos-page">
      {/* Hero Section */}
      <section className="quartos-hero">
        <div className="quartos-hero-background"></div>
        <Header />
        <div className="quartos-hero-content">
          <h1 className="quartos-hero-title">Quartos</h1>
        </div>
      </section>

      {/* Text Section */}
      <ScrollReveal>
        <section className="quartos-text-section quartos-text-section-desktop">
          <p className="quartos-text">
            CONHEÇA TODOS OS NOSSOS QUARTOS E ESCOLHA A OPÇÃO IDEAL PARA A SUA ESTADIA.
            NA POUSADA MI CASA SUA CASA, CADA SUÍTE OFERECE CONFORTO, TRANQUILIDADE E O AMBIENTE
            PERFEITO PARA VOCÊ RELAXAR E APROVEITAR MOMENTOS INESQUECÍVEIS.
          </p>
        </section>
      </ScrollReveal>

      {/* Text Section - Duplicada */}
      <ScrollReveal>
        <section className="quartos-text-section quartos-text-section-mobile">
          <p className="quartos-text">
            CONHEÇA TODOS OS NOSSOS QUARTOS E ESCOLHA A OPÇÃO IDEAL PARA A SUA ESTADIA.
            NA POUSADA MI CASA SUA CASA, CADA SUÍTE OFERECE CONFORTO, TRANQUILIDADE E O AMBIENTE
            PERFEITO PARA VOCÊ RELAXAR E APROVEITAR MOMENTOS INESQUECÍVEIS.
          </p>
        </section>
      </ScrollReveal>

      {/* Quartos Cards */}
      <ScrollReveal delay={0.1}>
        <section className="quartos-cards-section">
        <div className="quartos-cards-container">
          <ScrollReveal delay={0.1}>
            <div className="quartos-page-card">
            <RoomCarousel 
              images={quarto1Images} 
              currentIndex={currentImage1} 
              setCurrentIndex={setCurrentImage1}
              roomId="quarto1"
            />
            <div className="quartos-page-card-icons">
              <span className="quartos-page-card-icon"><FaWifi /></span>
              <span className="quartos-page-card-icon"><FaBox /></span>
              <span className="quartos-page-card-icon"><FaEye /></span>
            </div>
            <h3 className="quartos-page-card-title">Tem-tem</h3>
            <p className="quartos-page-card-description">
              Quarto duplo aconchegante, ideal para casais que buscam conforto e tranquilidade. O ambiente conta com cama de casal, vista para o jardim, terraço e acesso a banheiro compartilhado com chuveiro. Uma opção prática e acolhedora para uma estadia relaxante.
            </p>
            <div className="quartos-page-card-price">R$ 150 / Noite</div>
            <Link to="/quarto1" className="quartos-page-card-button">saiba mais</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="quartos-page-card">
            <RoomCarousel 
              images={quarto2Images} 
              currentIndex={currentImage2} 
              setCurrentIndex={setCurrentImage2}
              roomId="quarto2"
            />
            <div className="quartos-page-card-icons">
              <span className="quartos-page-card-icon"><FaSnowflake /></span>
              <span className="quartos-page-card-icon"><FaUtensils /></span>
              <span className="quartos-page-card-icon"><FaWifi /></span>
            </div>
            <h3 className="quartos-page-card-title">Soco</h3>
            <p className="quartos-page-card-description">
              Espaçoso quarto família, perfeito para grupos ou famílias que desejam mais conforto. O quarto dispõe de quatro camas de solteiro, ar-condicionado, cozinha compacta privativa e vista para o jardim. Conta ainda com terraço e banheiro compartilhado, garantindo praticidade durante toda a estadia.
            </p>
            <div className="quartos-page-card-price">R$ 150 / Noite</div>
            <Link to="/quarto2" className="quartos-page-card-button">saiba mais</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="quartos-page-card">
            <RoomCarousel 
              images={quarto3Images} 
              currentIndex={currentImage3} 
              setCurrentIndex={setCurrentImage3}
              roomId="quarto3"
            />
            <div className="quartos-page-card-icons">
              <span className="quartos-page-card-icon"><FaWifi /></span>
              <span className="quartos-page-card-icon"><FaSnowflake /></span>
              <span className="quartos-page-card-icon"><FaEye /></span>
            </div>
            <h3 className="quartos-page-card-title">Sabia</h3>
            <p className="quartos-page-card-description">
              Ideal para famílias maiores ou grupos de amigos, este quarto oferece amplo espaço e conforto. Possui uma cama de casal e três camas de solteiro, ar-condicionado, cozinha compacta privativa e terraço com vista para o jardim. Banheiro compartilhado disponível para maior praticidade.
            </p>
            <div className="quartos-page-card-price">R$ 150 / Noite</div>
            <Link to="/quarto3" className="quartos-page-card-button">saiba mais</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="quartos-page-card">
            <RoomCarousel 
              images={quarto4Images} 
              currentIndex={currentImage4} 
              setCurrentIndex={setCurrentImage4}
              roomId="quarto4"
            />
            <div className="quartos-page-card-icons">
              <span className="quartos-page-card-icon"><FaBox /></span>
              <span className="quartos-page-card-icon"><FaWind /></span>
              <span className="quartos-page-card-icon"><FaWifi /></span>
            </div>
            <h3 className="quartos-page-card-title">Ararajuba</h3>
            <p className="quartos-page-card-description">
              Quarto duplo confortável, indicado para casais ou viajantes que buscam um ambiente tranquilo. Conta com cama de casal, vista para o jardim, terraço e acesso a banheiro compartilhado com chuveiro. Uma opção simples e agradável para sua hospedagem.
            </p>
            <div className="quartos-page-card-price">R$ 150 / Noite</div>
            <Link to="/quarto4" className="quartos-page-card-button">saiba mais</Link>
            </div>
          </ScrollReveal>
        </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Quartos

