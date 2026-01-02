import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './Servicos.css'

const Servicos = () => {
  // Imagens da van da pasta /foto_van/
  const vanImages = [
    '/foto_van/van1.jpg',
    '/foto_van/van2.jpg',
    '/foto_van/van3.jpg',
    '/foto_van/van4.jpg'
  ]

  const [currentVanImage, setCurrentVanImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVanImage((prev) => (prev + 1) % vanImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [vanImages.length])

  const nextVanImage = () => {
    setCurrentVanImage((prev) => (prev + 1) % vanImages.length)
  }

  const prevVanImage = () => {
    setCurrentVanImage((prev) => (prev - 1 + vanImages.length) % vanImages.length)
  }

  return (
    <div className="servicos-page">
      {/* Hero Section */}
      <section className="servicos-hero">
        <div className="servicos-hero-background"></div>
        <Header />
        <div className="servicos-hero-content">
          <h1 className="servicos-hero-title">Serviços</h1>
        </div>
      </section>

      {/* Seção 1: Transporte / Van */}
      <ScrollReveal>
        <section className="servicos-transporte-section">
          <div className="servicos-transporte-container">
            <h2 className="servicos-transporte-title">Transporte para Hóspedes</h2>
            <div className="servicos-transporte-text">
              <p>
                Pensando no conforto dos nossos hóspedes, a Pousada Mi Casa Sua Casa oferece serviço de transporte em van, realizando buscas e deslocamentos entre residências, pontos combinados e regiões do Pará.
              </p>
              <p>
                Uma opção prática e segura para quem deseja chegar com tranquilidade e aproveitar melhor a estadia.
              </p>
            </div>
            <div className="servicos-van-gallery">
              <button 
                className="servicos-van-button servicos-van-button-prev"
                onClick={prevVanImage}
                aria-label="Imagem anterior"
              >
                <FaChevronLeft />
              </button>
              <div className="servicos-van-images">
                {vanImages.map((image, index) => (
                  <div
                    key={index}
                    className={`servicos-van-image ${index === currentVanImage ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                ))}
              </div>
              <button 
                className="servicos-van-button servicos-van-button-next"
                onClick={nextVanImage}
                aria-label="Próxima imagem"
              >
                <FaChevronRight />
              </button>
              <div className="servicos-van-dots">
                {vanImages.map((_, index) => (
                  <button
                    key={index}
                    className={`servicos-van-dot ${index === currentVanImage ? 'active' : ''}`}
                    onClick={() => setCurrentVanImage(index)}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Seção 2: Cardápio */}
      <ScrollReveal delay={0.1}>
        <section className="servicos-cardapio-section">
          <div className="servicos-cardapio-container">
            <div className="servicos-cardapio-card">
              <div className="servicos-cardapio-image"></div>
              <div className="servicos-cardapio-content">
                <h3 className="servicos-cardapio-title">Venha conhecer nosso cardápio</h3>
                <p className="servicos-cardapio-text">
                  Preparamos nossas refeições com cuidado e carinho, oferecendo opções que trazem mais conforto e praticidade durante a sua estadia.
                </p>
                <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="servicos-cardapio-button">Ver Cardápio</a>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Servicos

