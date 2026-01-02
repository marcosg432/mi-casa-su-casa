import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaTv, FaWifi, FaBox, FaEye, FaSnowflake, FaUtensils, FaWind } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import './Quartos.css'

const Quartos = () => {
  // Imagens de cada quarto
  const quarto1Images = [
    '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/01326756-1b5e-42e3-9bb6-49125bdecaf0.jpg',
    '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/0928ff2f-28ad-455f-99d9-99dbc34fb6c2.jpg',
    '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/17b7bc69-311f-487a-826b-1930a3343b3d.jpg',
    '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/50cac846-d63d-4cb9-885f-d3f8071e7518.jpg',
    '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/70e05b71-e628-4e87-a108-31ab8d696e2c.jpg',
    '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/72b019e4-58f3-422f-979a-a5fc6b0e0472.jpg',
    '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/7453ce3a-62db-4466-aff7-5c2532a38dbf.jpg',
    '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/a5c7cd38-4cb0-435f-944c-bf5700615e27.jpg',
    '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/b00af959-61c0-4233-95fc-1176ee4147f0.jpg',
    '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/cc50e465-6f65-48e1-9139-50c7255cdc08.jpg'
  ]

  const quarto2Images = [
    '/fotos_dos_quartos/quarto-familia/0c12b8c5-3f4e-40f2-a33c-652dbd44554a.jpg',
    '/fotos_dos_quartos/quarto-familia/13c7eb7a-219b-4bd2-b5b9-b842eb1cd363.jpg',
    '/fotos_dos_quartos/quarto-familia/56b5474f-3533-4f9a-ba14-8661b0567691.jpg',
    '/fotos_dos_quartos/quarto-familia/640391605.jpg',
    '/fotos_dos_quartos/quarto-familia/7fcddf93-f843-4bbb-b36f-92dc5b18bd4c.jpg',
    '/fotos_dos_quartos/quarto-familia/a786fd56-b3bb-4795-beda-28aef1b89fda.jpg',
    '/fotos_dos_quartos/quarto-familia/adf395a6-c1c1-4b9c-9af2-e6a60b0b4358.jpg'
  ]

  const quarto3Images = [
    '/fotos_dos_quartos/quarto-familia-5x/49644389-4641-4e6b-a525-48151c8f1a1a.jpg',
    '/fotos_dos_quartos/quarto-familia-5x/5ae27bd4-6c26-4cab-aa0c-71dca7b965ab.jpg',
    '/fotos_dos_quartos/quarto-familia-5x/7fcddf93-f843-4bbb-b36f-92dc5b18bd4c.jpg',
    '/fotos_dos_quartos/quarto-familia-5x/89878656-9fee-48bb-bceb-0e127917cdea.jpg',
    '/fotos_dos_quartos/quarto-familia-5x/b640c721-ae41-417e-8bdb-d704e70fc577.jpg',
    '/fotos_dos_quartos/quarto-familia-5x/db03dc39-c11b-4ce8-9de1-1bf515f82b72.jpg',
    '/fotos_dos_quartos/quarto-familia-5x/eb943dde-c60c-4c45-84de-79971adf3909.jpg'
  ]

  const quarto4Images = [
    '/fotos_dos_quartos/quarto_duplo/17594547-0116-4697-9187-e1abf4561671.jpg',
    '/fotos_dos_quartos/quarto_duplo/649ff996-e316-4fa2-94f0-6b7169eef796.jpg',
    '/fotos_dos_quartos/quarto_duplo/69dcd418-4fd5-4e0f-904e-2f15b4ad29a9.jpg',
    '/fotos_dos_quartos/quarto_duplo/70e05b71-e628-4e87-a108-31ab8d696e2c.jpg',
    '/fotos_dos_quartos/quarto_duplo/7453ce3a-62db-4466-aff7-5c2532a38dbf.jpg',
    '/fotos_dos_quartos/quarto_duplo/a5c7cd38-4cb0-435f-944c-bf5700615e27.jpg',
    '/fotos_dos_quartos/quarto_duplo/a921caca-e9f0-4597-888e-eec9d5241592.jpg',
    '/fotos_dos_quartos/quarto_duplo/b00af959-61c0-4233-95fc-1176ee4147f0.jpg',
    '/fotos_dos_quartos/quarto_duplo/b93d9768-2536-42a2-87ed-4f1424eeb00d.jpg',
    '/fotos_dos_quartos/quarto_duplo/cc50e465-6f65-48e1-9139-50c7255cdc08.jpg'
  ]

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

