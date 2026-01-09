import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown, FaVolumeMute, FaWifi, FaEye, FaHome, FaSnowflake, FaUtensils, FaBox, FaWind } from 'react-icons/fa'
import Header from '../components/Header'
import { VerticalImageStack } from '../components/VerticalImageStack'
import CircularImages from '../components/CircularImages'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import { getQuartoImages } from '../utils/quartosImages'
import './Home.css'

const Home = () => {
  console.log('Home component rendering')
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const videoRefDesktop = useRef(null)
  const videoRefMobile = useRef(null)
  
  // Função para obter o vídeo ativo (visível)
  const getActiveVideo = () => {
    if (window.innerWidth > 768) {
      return videoRefDesktop.current
    } else {
      return videoRefMobile.current
    }
  }

  // Imagens de cada quarto
  const quarto1Images = getQuartoImages('quarto1')
  const quarto2Images = getQuartoImages('quarto2')
  const quarto4Images = getQuartoImages('quarto4')

  // Estados para cada carrossel
  const [currentImage1, setCurrentImage1] = useState(0)
  const [currentImage2, setCurrentImage2] = useState(0)
  const [currentImage4, setCurrentImage4] = useState(0)

  // Componente de carrossel reutilizável
  const RoomCarousel = ({ images, currentIndex, setCurrentIndex, roomId }) => {
    const [failedImages, setFailedImages] = useState(new Set())

    useEffect(() => {
      if (images.length === 0) return
      
      // Verificar se a imagem atual falhou e pular para próxima válida
      if (failedImages.has(currentIndex) && images.length > failedImages.size) {
        let next = (currentIndex + 1) % images.length
        let attempts = 0
        while (failedImages.has(next) && attempts < images.length) {
          next = (next + 1) % images.length
          attempts++
        }
        setCurrentIndex(next)
        return
      }

      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          let next = (prev + 1) % images.length
          // Pula imagens que falharam
          let attempts = 0
          while (failedImages.has(next) && attempts < images.length) {
            next = (next + 1) % images.length
            attempts++
          }
          return next
        })
      }, 5000)
      return () => clearInterval(interval)
    }, [images.length, setCurrentIndex, failedImages, currentIndex])

    const handleImageError = (imageIndex) => {
      setFailedImages(prev => new Set([...prev, imageIndex]))
      // Se a imagem atual falhou, vai para a próxima
      if (imageIndex === currentIndex) {
        let next = (currentIndex + 1) % images.length
        let attempts = 0
        while (failedImages.has(next) && attempts < images.length) {
          next = (next + 1) % images.length
          attempts++
        }
        setTimeout(() => setCurrentIndex(next), 100)
      }
    }

    return (
      <div className="quartos-page-card-carousel">
        <div className="quartos-page-card-carousel-images">
          {images.map((image, index) => {
            if (failedImages.has(index)) return null
            return (
              <div key={index}>
                <img
                  src={image}
                  alt=""
                  style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
                  onError={() => handleImageError(index)}
                />
                <div
                  className={`quartos-page-card-carousel-image ${index === currentIndex ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              </div>
            )
          })}
        </div>
        <div className="quartos-page-card-carousel-dots">
          {images.map((_, index) => {
            if (failedImages.has(index)) return null
            return (
              <button
                key={index}
                className={`quartos-page-card-carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            )
          })}
        </div>
      </div>
    )
  }

  useEffect(() => {
    const setupVideo = (video) => {
      if (!video) return null
      
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)
      const handleError = (e) => {
        console.error('Erro ao carregar vídeo:', e)
        console.error('Caminho do vídeo:', video.src)
      }
      
      // Inicializar volume e garantir que não está mudo
      video.volume = volume
      video.muted = false
      
      // Aguardar o vídeo estar pronto antes de restaurar tempo
      const handleLoadedMetadata = () => {
        const savedTime = localStorage.getItem('videoTime')
        if (savedTime) {
          video.currentTime = parseFloat(savedTime)
        }
        // Garantir que o vídeo não está mudo
        video.muted = false
        video.volume = volume
      }
      
      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)
      video.addEventListener('error', handleError)
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      
      return () => {
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('error', handleError)
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
    
    const cleanup1 = setupVideo(videoRefDesktop.current)
    const cleanup2 = setupVideo(videoRefMobile.current)
    
    // Salvar tempo do vídeo periodicamente
    const saveTimeInterval = setInterval(() => {
      const video = getActiveVideo()
      if (video && !video.paused) {
        localStorage.setItem('videoTime', video.currentTime.toString())
      }
    }, 1000)
    
    return () => {
      if (cleanup1) cleanup1()
      if (cleanup2) cleanup2()
      clearInterval(saveTimeInterval)
      const video = getActiveVideo()
      if (video) {
        localStorage.setItem('videoTime', video.currentTime.toString())
      }
    }
  }, [volume])

  useEffect(() => {
    if (videoRefDesktop.current) {
      videoRefDesktop.current.volume = isMuted ? 0 : volume
    }
    if (videoRefMobile.current) {
      videoRefMobile.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlayPause = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    const activeVideo = getActiveVideo()
    if (!activeVideo) return
    
    // Sincronizar ambos os vídeos
    const videos = [videoRefDesktop.current, videoRefMobile.current].filter(Boolean)
    
    if (isPlaying) {
      // Pausar todos os vídeos
      videos.forEach(video => {
        if (video && !video.paused) {
          video.pause()
        }
      })
    } else {
      // Tocar o vídeo ativo e sincronizar o outro
      videos.forEach(video => {
        if (video) {
          video.muted = false
          video.volume = volume
          
          // Sincronizar tempo
          if (activeVideo.readyState >= 2) {
            video.currentTime = activeVideo.currentTime
          }
        }
      })
      
      // Tocar o vídeo ativo
      const playPromise = activeVideo.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Vídeo está tocando
          })
          .catch((error) => {
            console.error('Erro ao tocar vídeo:', error)
          })
      }
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <FaVolumeMute />
    if (volume < 0.5) return <FaVolumeDown />
    return <FaVolumeUp />
  }
  return (
    <div className="home">
      {/* Hero Section - Desktop */}
      <section className="hero hero-desktop">
        <div className="hero-background">
          <img
            className="hero-video"
            src="/imagem/casa amarela.jpg"
            alt="Pousada Mi Casa Sua Casa"
          />
        </div>
        <Header />
        <div className="hero-content">
          <h1 className="hero-title">Mi casa Su casa</h1>
          <p className="hero-subtitle">Pousada & Restaurante</p>
        </div>
      </section>

      {/* Hero Section - Mobile */}
      <section className="hero hero-mobile">
        <div className="hero-background">
          <img
            className="hero-video"
            src="/imagem/casa amarela.jpg"
            alt="Pousada Mi Casa Sua Casa"
          />
        </div>
        <Header />
        <div className="hero-content">
          <h1 className="hero-title">Mi casa Su casa</h1>
          <p className="hero-subtitle">Pousada & Restaurante</p>
        </div>
      </section>

      {/* sobre nós - Desktop */}
      <ScrollReveal>
        <section className="sobre-section sobre-section-desktop">
          <div className="sobre-container">
          <div className="sobre-text">
            <h2 className="sobre-title">sobre nós</h2>
            <p className="sobre-paragraph">
              Aqui na Pousada & restaurante Mi casa Su casa, o tempo desacelera e a natureza convida você a respirar fundo, se reconectar consigo mesmo e viver momentos simples que ficam na memória. Cada espaço foi pensado para proporcionar acolhimento, tranquilidade e uma verdadeira desconexão da rotina agitada do mundo lá fora.
            </p>
            <p className="sobre-paragraph">
              Nossa proposta é oferecer mais do que uma estadia: queremos que você se sinta em casa. Cercada pela natureza, a pousada conta com uma piscina natural que convida ao relaxamento, ambientes integrados ao verde e uma cozinha compartilhada que desperta a vontade de cozinhar, conversar e criar boas histórias. Para completar, nosso restaurante oferece sabores preparados com carinho, em harmonia com o clima natural do lugar.
            </p>
            <p className="sobre-paragraph">
              Na Mi Casa Su Casa, cada detalhe existe para transformar sua passagem por aqui em uma experiência leve, autêntica e inesquecível. Um refúgio onde o conforto se encontra com a simplicidade, e onde você é sempre recebido como parte da casa.
            </p>
            <Link to="/sobre" className="sobre-button">saiba mais</Link>
          </div>
          <div className="sobre-image">
            <div className="sobre-video-wrapper">
              <div className="sobre-video-background">
                <img 
                  src="/imagem/textura verde.png" 
                  alt="Textura" 
                  className="sobre-textura-verde"
                />
              </div>
              <video
                ref={videoRefDesktop}
                className="sobre-video"
                loop
                playsInline
                preload="metadata"
                onClick={togglePlayPause}
              >
                <source src="/video/mi casa.mp4" type="video/mp4" />
              </video>
              {!isPlaying && (
                <>
                  <button 
                    className="sobre-video-control"
                    onClick={togglePlayPause}
                    aria-label="Tocar vídeo"
                  >
                    <FaPlay />
                  </button>
                  <div className="sobre-video-volume-control">
                    <button 
                      className="sobre-video-volume-button"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                    >
                      {getVolumeIcon()}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="sobre-video-volume-slider"
                      aria-label="Volume"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* sobre nós - Mobile */}
      <ScrollReveal>
        <section className="sobre-section sobre-section-mobile">
          <div className="sobre-container">
          <div className="sobre-text">
            <h2 className="sobre-title">sobre nós</h2>
            <p className="sobre-paragraph">
              Aqui na Pousada & restaurante Mi casa Su casa, o tempo desacelera e a natureza convida você a respirar fundo, se reconectar consigo mesmo e viver momentos simples que ficam na memória. Cada espaço foi pensado para proporcionar acolhimento, tranquilidade e uma verdadeira desconexão da rotina agitada do mundo lá fora.
            </p>
            <p className="sobre-paragraph">
              Nossa proposta é oferecer mais do que uma estadia: queremos que você se sinta em casa. Cercada pela natureza, a pousada conta com uma piscina natural que convida ao relaxamento, ambientes integrados ao verde e uma cozinha compartilhada que desperta a vontade de cozinhar, conversar e criar boas histórias. Para completar, nosso restaurante oferece sabores preparados com carinho, em harmonia com o clima natural do lugar.
            </p>
            <p className="sobre-paragraph">
              Na Mi Casa Su Casa, cada detalhe existe para transformar sua passagem por aqui em uma experiência leve, autêntica e inesquecível. Um refúgio onde o conforto se encontra com a simplicidade, e onde você é sempre recebido como parte da casa.
            </p>
            <Link to="/sobre" className="sobre-button">saiba mais</Link>
          </div>
          <div className="sobre-image">
            <div className="sobre-video-wrapper">
              <div className="sobre-video-background">
                <img 
                  src="/imagem/textura verde.png" 
                  alt="Textura" 
                  className="sobre-textura-verde"
                />
              </div>
              <video
                ref={videoRefMobile}
                className="sobre-video"
                loop
                playsInline
                preload="metadata"
                onClick={togglePlayPause}
              >
                <source src="/video/mi casa.mp4" type="video/mp4" />
              </video>
              {!isPlaying && (
                <>
                  <button 
                    className="sobre-video-control"
                    onClick={togglePlayPause}
                    aria-label="Tocar vídeo"
                  >
                    <FaPlay />
                  </button>
                  <div className="sobre-video-volume-control">
                    <button 
                      className="sobre-video-volume-button"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                    >
                      {getVolumeIcon()}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="sobre-video-volume-slider"
                      aria-label="Volume"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* suite */}
      <ScrollReveal delay={0.1}>
        <section className="quartos-section quartos-section-desktop">
        <div className="quartos-container">
          <ScrollReveal delay={0.1}>
            <div className="quartos-card">
            <RoomCarousel 
              images={quarto4Images} 
              currentIndex={currentImage4} 
              setCurrentIndex={setCurrentImage4}
              roomId="quarto4"
            />
            <div className="quartos-card-icons">
              <span className="quartos-card-icon"><FaBox /></span>
              <span className="quartos-card-icon"><FaWind /></span>
              <span className="quartos-card-icon"><FaWifi /></span>
            </div>
            <h3 className="quartos-card-title">Ararajuba</h3>
            <p className="quartos-card-description">
              Quarto duplo confortável, indicado para casais ou viajantes que buscam um ambiente tranquilo.
            </p>
            <Link to="/quarto4" className="quartos-card-button">saiba mais</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="quartos-card">
            <RoomCarousel 
              images={quarto1Images} 
              currentIndex={currentImage1} 
              setCurrentIndex={setCurrentImage1}
              roomId="quarto1"
            />
            <div className="quartos-card-icons">
              <span className="quartos-card-icon"><FaWifi /></span>
              <span className="quartos-card-icon"><FaEye /></span>
              <span className="quartos-card-icon"><FaHome /></span>
            </div>
            <h3 className="quartos-card-title">Tem-tem</h3>
            <p className="quartos-card-description">
              Quarto duplo aconchegante, ideal para casais que buscam conforto e tranquilidade.
            </p>
            <Link to="/quarto1" className="quartos-card-button">saiba mais</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="quartos-card">
            <RoomCarousel 
              images={quarto2Images} 
              currentIndex={currentImage2} 
              setCurrentIndex={setCurrentImage2}
              roomId="quarto2"
            />
            <div className="quartos-card-icons">
              <span className="quartos-card-icon"><FaSnowflake /></span>
              <span className="quartos-card-icon"><FaWifi /></span>
              <span className="quartos-card-icon"><FaUtensils /></span>
            </div>
            <h3 className="quartos-card-title">Soco</h3>
            <p className="quartos-card-description">
              Espaçoso quarto família, perfeito para grupos ou famílias que desejam mais conforto.
            </p>
            <Link to="/quarto2" className="quartos-card-button">saiba mais</Link>
            </div>
          </ScrollReveal>
        </div>
        </section>
      </ScrollReveal>

      {/* suite - Duplicada */}
      <ScrollReveal delay={0.1}>
        <section className="quartos-section quartos-section-mobile">
        <div className="quartos-container">
          <ScrollReveal delay={0.1}>
            <div className="quartos-card">
            <RoomCarousel 
              images={quarto4Images} 
              currentIndex={currentImage4} 
              setCurrentIndex={setCurrentImage4}
              roomId="quarto4"
            />
            <div className="quartos-card-icons">
              <span className="quartos-card-icon"><FaBox /></span>
              <span className="quartos-card-icon"><FaWind /></span>
              <span className="quartos-card-icon"><FaWifi /></span>
            </div>
            <h3 className="quartos-card-title">Ararajuba</h3>
            <p className="quartos-card-description">
              Quarto duplo confortável, indicado para casais ou viajantes que buscam um ambiente tranquilo.
            </p>
            <Link to="/quarto4" className="quartos-card-button">saiba mais</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="quartos-card">
            <RoomCarousel 
              images={quarto1Images} 
              currentIndex={currentImage1} 
              setCurrentIndex={setCurrentImage1}
              roomId="quarto1"
            />
            <div className="quartos-card-icons">
              <span className="quartos-card-icon"><FaWifi /></span>
              <span className="quartos-card-icon"><FaEye /></span>
              <span className="quartos-card-icon"><FaHome /></span>
            </div>
            <h3 className="quartos-card-title">Tem-tem</h3>
            <p className="quartos-card-description">
              Quarto duplo aconchegante, ideal para casais que buscam conforto e tranquilidade.
            </p>
            <Link to="/quarto1" className="quartos-card-button">saiba mais</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="quartos-card">
            <RoomCarousel 
              images={quarto2Images} 
              currentIndex={currentImage2} 
              setCurrentIndex={setCurrentImage2}
              roomId="quarto2"
            />
            <div className="quartos-card-icons">
              <span className="quartos-card-icon"><FaSnowflake /></span>
              <span className="quartos-card-icon"><FaWifi /></span>
              <span className="quartos-card-icon"><FaUtensils /></span>
            </div>
            <h3 className="quartos-card-title">Soco</h3>
            <p className="quartos-card-description">
              Espaçoso quarto família, perfeito para grupos ou famílias que desejam mais conforto.
            </p>
            <Link to="/quarto2" className="quartos-card-button">saiba mais</Link>
            </div>
          </ScrollReveal>
        </div>
        </section>
      </ScrollReveal>

      {/* Galeria Section */}
      <ScrollReveal delay={0.2}>
        <section className="nova-secao-section">
        <div className="nova-secao-container">
          <h2 className="galeria-section-title">Galeria</h2>
          <CircularImages
            testimonials={[
              {
                src: "/imagem/entrada.jpg"
              },
              {
                src: "/imagem/flores.jpg"
              },
              {
                src: "/imagem/rio.jpg"
              }
            ]}
            autoplay={true}
          />
          <p className="galeria-section-text">Conheça nossa galeria de imagens</p>
          <Link 
            to="/galeria" 
            className="galeria-section-button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Ir para galeria
          </Link>
        </div>
        </section>
      </ScrollReveal>

      {/* azul */}
      <ScrollReveal delay={0.3}>
        <section className="porque-section">
        <h2 className="porque-title">Por que escolher o Pousada Mi Casa Sua Casa?</h2>
        <div className="porque-grid">
          <ScrollReveal delay={0.1}>
            <div className="porque-card">
              <h3 className="porque-card-title">CONEXÃO COM A NATUREZA</h3>
              <p className="porque-card-text">
                Estamos cercados por verde, silêncio e elementos naturais que convidam você a desacelerar, respirar fundo e se reconectar com o que realmente importa.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="porque-card">
              <h3 className="porque-card-title">AMBIENTE ACOLHEDOR E AUTÊNTICO</h3>
              <p className="porque-card-text">
                Cada espaço foi pensado para transmitir aconchego e simplicidade, criando uma atmosfera leve, humana e verdadeira, onde você se sente em casa.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="porque-card">
              <h3 className="porque-card-title">EXPERIÊNCIA DE DESCANSO REAL</h3>
              <p className="porque-card-text">
                Aqui o tempo passa diferente. A tranquilidade do ambiente, a piscina natural e o contato com a natureza proporcionam descanso profundo e renovação.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="porque-card">
              <h3 className="porque-card-title">ESTADIA PARA SER LEMBRADA</h3>
              <p className="porque-card-text">
                Mais do que hospedar, queremos marcar momentos. Cada detalhe é cuidado para que sua experiência seja única, especial e inesquecível.
              </p>
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

export default Home

