import { useEffect } from 'react'
import Header from '../components/Header'
import { ImageGallery } from '../components/ImageGallery'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import './Galeria.css'

const Galeria = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="galeria-page">
      <section className="galeria-hero">
        <div className="galeria-hero-background"></div>
        <Header />
        <div className="galeria-hero-content">
          <h1 className="galeria-hero-title">Galeria</h1>
        </div>
      </section>

      <ScrollReveal>
        <section className="galeria-content">
          <ImageGallery />
        </section>
      </ScrollReveal>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Galeria

