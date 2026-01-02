import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import './Sobre.css'

// Sempre as MESMAS 3 imagens, apenas trocando de posição (carrossel)
const carouselImages = [
  '/imagem/entrada.jpg',
  '/imagem/flores.jpg',
  '/imagem/rio.jpg'
]

// Imagens para mobile
const carouselImagesMobile = [
  '/imagem/essa10.jpg',
  '/imagem/essa13.jpg',
  '/imagem/essa11.jpg'
]

const Sobre = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentIndexMobile, setCurrentIndexMobile] = useState(0)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexMobile((prev) => (prev + 1) % carouselImagesMobile.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  // Calcula qual imagem ocupa cada posição (esquerda, centro, direita) - Desktop
  const leftImage = carouselImages[currentIndex]
  const centerImage = carouselImages[(currentIndex + 1) % carouselImages.length]
  const rightImage = carouselImages[(currentIndex + 2) % carouselImages.length]

  // Calcula qual imagem ocupa cada posição (esquerda, centro, direita) - Mobile
  const leftImageMobile = carouselImagesMobile[currentIndexMobile]
  const centerImageMobile = carouselImagesMobile[(currentIndexMobile + 1) % carouselImagesMobile.length]
  const rightImageMobile = carouselImagesMobile[(currentIndexMobile + 2) % carouselImagesMobile.length]

  return (
    <div className="sobre-page">
      {/* Hero Section */}
      <section className="sobre-page-hero">
        <div className="sobre-page-hero-background"></div>
        <Header />
        <div className="sobre-page-hero-content">
          <h1 className="sobre-page-hero-title">Sobre nós</h1>
        </div>
      </section>

      {/* Conheça Section */}
      <ScrollReveal>
        <section className="conheca-section conheca-section-desktop">
          <h2 className="conheca-title">Conheça o Pousada Mi Casa Sua Casa</h2>
          <div className="conheca-images">
            <div
              className="conheca-image-left"
              style={{ backgroundImage: `url(${leftImage})` }}
            ></div>
            <div
              className="conheca-image-center"
              style={{ backgroundImage: `url(${centerImage})` }}
            ></div>
            <div
              className="conheca-image-right"
              style={{ backgroundImage: `url(${rightImage})` }}
            ></div>
          </div>
        </section>
      </ScrollReveal>

      {/* Conheça Section - Duplicada */}
      <ScrollReveal>
        <section className="conheca-section conheca-section-mobile">
          <h2 className="conheca-title">Conheça o Pousada Mi Casa Sua Casa</h2>
          <div className="conheca-images">
            <div
              className="conheca-image-left"
              style={{ backgroundImage: `url(${leftImageMobile})` }}
            ></div>
            <div
              className="conheca-image-center"
              style={{ backgroundImage: `url(${centerImageMobile})` }}
            ></div>
            <div
              className="conheca-image-right"
              style={{ backgroundImage: `url(${rightImageMobile})` }}
            ></div>
          </div>
        </section>
      </ScrollReveal>

      {/* Nossa História Section - Desktop */}
      <ScrollReveal delay={0.1}>
        <section className="historia-section historia-section-desktop">
        <div className="historia-background"></div>
        <div className="historia-content">
          <h2 className="historia-title">Nossa Historia</h2>
          <div className="historia-text">
            <p>
              A Pousada Mi Casa Su Casa nasceu com o propósito de oferecer mais do que uma hospedagem: criar uma experiência de acolhimento, conexão com a natureza e desaceleração do ritmo do dia a dia. Nossa missão é proporcionar um ambiente simples, verdadeiro e humano, onde cada hóspede se sinta em casa desde o primeiro momento.
            </p>
            <p>
              Inspirados pela tranquilidade do ambiente natural que nos cerca, cada espaço foi pensado para convidar ao descanso, à convivência e ao bem-estar. A piscina natural, os ambientes integrados ao verde, a cozinha compartilhada e o restaurante refletem nosso cuidado em criar experiências leves, autênticas e memoráveis.
            </p>
            <p>
              Seguimos construindo nossa história com carinho, respeito e atenção aos detalhes, acreditando que receber bem é criar laços, momentos e lembranças que ficam. Aqui, cada estadia é única, porque cada pessoa também é.
            </p>
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* Nossa História Section - Mobile */}
      <ScrollReveal delay={0.1}>
        <section className="historia-section historia-section-mobile">
        <div className="historia-background"></div>
        <div className="historia-content">
          <h2 className="historia-title">Nossa Historia</h2>
          <div className="historia-text">
            <p>
              A Pousada Mi Casa Su Casa nasceu com o propósito de oferecer mais do que uma hospedagem: criar uma experiência de acolhimento, conexão com a natureza e desaceleração do ritmo do dia a dia. Nossa missão é proporcionar um ambiente simples, verdadeiro e humano, onde cada hóspede se sinta em casa desde o primeiro momento.
            </p>
            <p>
              Inspirados pela tranquilidade do ambiente natural que nos cerca, cada espaço foi pensado para convidar ao descanso, à convivência e ao bem-estar. A piscina natural, os ambientes integrados ao verde, a cozinha compartilhada e o restaurante refletem nosso cuidado em criar experiências leves, autênticas e memoráveis.
            </p>
            <p>
              Seguimos construindo nossa história com carinho, respeito e atenção aos detalhes, acreditando que receber bem é criar laços, momentos e lembranças que ficam. Aqui, cada estadia é única, porque cada pessoa também é.
            </p>
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* Localização e Conforto Section - Desktop */}
      <ScrollReveal delay={0.2}>
        <section className="localizacao-section localizacao-section-desktop">
          <div className="localizacao-container">
            <ScrollReveal delay={0.1}>
              <div className="localizacao-card">
                <h3 className="localizacao-card-title">Um refúgio para desacelerar</h3>
                <p className="localizacao-card-text">
                  Na Pousada & Restaurante Mi Casa Su Casa, o tempo desacelera e a natureza convida você a respirar fundo, se reconectar consigo mesmo e viver momentos simples que ficam na memória. Cada espaço foi pensado para oferecer acolhimento, tranquilidade e uma verdadeira pausa da rotina agitada.
                </p>
                <div className="localizacao-card-image entrada"></div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="localizacao-card">
                <h3 className="localizacao-card-title">Mais do que uma estadia, sentir-se em casa</h3>
                <p className="localizacao-card-text">
                  Nossa proposta é ir além da hospedagem. Queremos que você se sinta em casa. Cercada pela natureza, a pousada oferece ambientes integrados ao verde, uma piscina natural para relaxar e uma cozinha compartilhada que inspira encontros, conversas e boas histórias.
                </p>
                <div className="localizacao-card-image matinho"></div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="localizacao-card localizacao-card-full">
                <h3 className="localizacao-card-title">Sabores, natureza e simplicidade</h3>
                <p className="localizacao-card-text">
                  Para completar a experiência, nosso restaurante oferece sabores preparados com carinho, em harmonia com o clima natural do lugar. Na Mi Casa Su Casa, cada detalhe existe para transformar sua passagem por aqui em uma experiência leve, autêntica e inesquecível.
                </p>
                <div className="localizacao-card-image restaurante"></div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* Localização e Conforto Section - Mobile */}
      <ScrollReveal delay={0.2}>
        <section className="localizacao-section localizacao-section-mobile">
          <div className="localizacao-container">
            <ScrollReveal delay={0.1}>
              <div className="localizacao-card">
                <h3 className="localizacao-card-title">Um refúgio para desacelerar</h3>
                <p className="localizacao-card-text">
                  Na Pousada & Restaurante Mi Casa Su Casa, o tempo desacelera e a natureza convida você a respirar fundo, se reconectar consigo mesmo e viver momentos simples que ficam na memória. Cada espaço foi pensado para oferecer acolhimento, tranquilidade e uma verdadeira pausa da rotina agitada.
                </p>
                <div className="localizacao-card-image entrada"></div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="localizacao-card">
                <h3 className="localizacao-card-title">Mais do que uma estadia, sentir-se em casa</h3>
                <p className="localizacao-card-text">
                  Nossa proposta é ir além da hospedagem. Queremos que você se sinta em casa. Cercada pela natureza, a pousada oferece ambientes integrados ao verde, uma piscina natural para relaxar e uma cozinha compartilhada que inspira encontros, conversas e boas histórias.
                </p>
                <div className="localizacao-card-image matinho"></div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="localizacao-card localizacao-card-full">
                <h3 className="localizacao-card-title">Sabores, natureza e simplicidade</h3>
                <p className="localizacao-card-text">
                  Para completar a experiência, nosso restaurante oferece sabores preparados com carinho, em harmonia com o clima natural do lugar. Na Mi Casa Su Casa, cada detalhe existe para transformar sua passagem por aqui em uma experiência leve, autêntica e inesquecível.
                </p>
                <div className="localizacao-card-image restaurante"></div>
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

export default Sobre
