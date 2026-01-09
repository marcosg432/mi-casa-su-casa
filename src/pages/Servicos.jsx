import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import { FaChevronLeft, FaChevronRight, FaBed, FaBirthdayCake, FaGlassCheers, FaUtensils, FaUsers } from 'react-icons/fa'
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
  const [failedImages, setFailedImages] = useState(new Set())
  
  // Filtrar imagens que falharam
  const validVanImages = vanImages.filter((_, index) => !failedImages.has(index))

  useEffect(() => {
    if (validVanImages.length === 0) return
    
    // Ajustar índice atual se necessário
    if (currentVanImage >= validVanImages.length) {
      setCurrentVanImage(0)
      return
    }
    
    const interval = setInterval(() => {
      setCurrentVanImage((prev) => (prev + 1) % validVanImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [validVanImages.length, currentVanImage])

  const nextVanImage = () => {
    if (validVanImages.length === 0) return
    setCurrentVanImage((prev) => (prev + 1) % validVanImages.length)
  }

  const prevVanImage = () => {
    if (validVanImages.length === 0) return
    setCurrentVanImage((prev) => (prev - 1 + validVanImages.length) % validVanImages.length)
  }

  const handleImageError = (imageIndex) => {
    setFailedImages(prev => {
      const newSet = new Set([...prev, imageIndex])
      // Ajustar índice se necessário
      const remainingImages = vanImages.filter((_, idx) => !newSet.has(idx))
      if (remainingImages.length > 0 && currentVanImage >= remainingImages.length) {
        setCurrentVanImage(0)
      }
      return newSet
    })
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

      {/* Seção 1: Transporte / Van - Desktop */}
      <ScrollReveal>
        <section className="servicos-transporte-section servicos-transporte-section-desktop">
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
                {validVanImages.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt=""
                      style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
                      onError={() => {
                        const originalIndex = vanImages.indexOf(image)
                        handleImageError(originalIndex)
                      }}
                    />
                    <div
                      className={`servicos-van-image ${index === currentVanImage ? 'active' : ''}`}
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </div>
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
                {validVanImages.map((_, index) => (
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

      {/* Seção 1: Transporte / Van - Mobile */}
      <ScrollReveal>
        <section className="servicos-transporte-section servicos-transporte-section-mobile">
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
                {validVanImages.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt=""
                      style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
                      onError={() => {
                        const originalIndex = vanImages.indexOf(image)
                        handleImageError(originalIndex)
                      }}
                    />
                    <div
                      className={`servicos-van-image ${index === currentVanImage ? 'active' : ''}`}
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </div>
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
                {validVanImages.map((_, index) => (
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

      {/* Seção 2: Atividades e Eventos */}
      <ScrollReveal delay={0.1}>
        <section className="servicos-atividades-section">
          <div className="servicos-atividades-container">
            <h2 className="servicos-atividades-title">Atividades e Eventos</h2>
            <p className="servicos-atividades-subtitle">
              Nosso espaço é versátil e pode acolher diferentes tipos de eventos e atividades. 
              Conheça todas as possibilidades que oferecemos:
            </p>
            <div className="servicos-atividades-grid">
              <ScrollReveal delay={0.1}>
                <div className="servicos-atividade-card">
                  <div className="servicos-atividade-icon">
                    <FaBed />
                  </div>
                  <h3 className="servicos-atividade-card-title">Hospedagem</h3>
                  <p className="servicos-atividade-card-text">
                    Quartos aconchegantes e confortáveis para uma estadia tranquila. 
                    Ambiente acolhedor cercado pela natureza, ideal para descanso e relaxamento.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="servicos-atividade-card">
                  <div className="servicos-atividade-icon">
                    <FaBirthdayCake />
                  </div>
                  <h3 className="servicos-atividade-card-title">Aniversários</h3>
                  <p className="servicos-atividade-card-text">
                    Celebre seu aniversário em um ambiente especial e acolhedor. 
                    Espaço preparado para receber seus convidados com conforto e praticidade.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="servicos-atividade-card">
                  <div className="servicos-atividade-icon">
                    <FaGlassCheers />
                  </div>
                  <h3 className="servicos-atividade-card-title">Comemorações</h3>
                  <p className="servicos-atividade-card-text">
                    Momentos especiais merecem um lugar especial. Nosso espaço está pronto 
                    para receber suas comemorações, sejam elas grandes ou pequenas.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <div className="servicos-atividade-card">
                  <div className="servicos-atividade-icon">
                    <FaUtensils />
                  </div>
                  <h3 className="servicos-atividade-card-title">Almoço e Jantar</h3>
                  <p className="servicos-atividade-card-text">
                    Desfrute de refeições preparadas com carinho em nosso restaurante. 
                    Sabores locais e pratos que harmonizam com o ambiente natural do lugar.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.5}>
                <div className="servicos-atividade-card">
                  <div className="servicos-atividade-icon">
                    <FaUsers />
                  </div>
                  <h3 className="servicos-atividade-card-title">Retiros e Encontros</h3>
                  <p className="servicos-atividade-card-text">
                    Ambiente tranquilo e inspirador para retiros, encontros e atividades em grupo. 
                    Espaço que favorece conexão, reflexão e momentos de qualidade juntos.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Seção 3: Cardápio */}
      <ScrollReveal delay={0.2}>
        <section className="servicos-cardapio-section">
          <div className="servicos-cardapio-container">
            <div className="servicos-cardapio-card">
              <div className="servicos-cardapio-image"></div>
              <div className="servicos-cardapio-content">
                <h3 className="servicos-cardapio-title">Venha conhecer nosso cardápio</h3>
                <p className="servicos-cardapio-text">
                  Preparamos nossas refeições com cuidado e carinho, oferecendo opções que trazem mais conforto e praticidade durante a sua estadia.
                </p>
                <Link to="/cardapio" className="servicos-cardapio-button">Ver Cardápio</Link>
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

