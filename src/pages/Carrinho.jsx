import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSnowflake, FaLock, FaWifi, FaBriefcase, FaTv } from 'react-icons/fa'
import Header from '../components/Header'
import { getCarrinho, formatarMoeda } from '../utils/storage'
import { getQuartoImages } from '../utils/quartosImages'
import './Carrinho.css'

const Carrinho = () => {
  const navigate = useNavigate()
  const [carrinho, setCarrinho] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const carrinhoData = getCarrinho()
    if (!carrinhoData) {
      navigate('/')
      return
    }
    setCarrinho(carrinhoData)
  }, [navigate])

  if (!carrinho) return null

  // Obter todas as imagens do quarto selecionado
  const quartoImages = carrinho.quartoId ? getQuartoImages(carrinho.quartoId) : []
  const fallbackImage = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
  const images = quartoImages.length > 0 ? quartoImages : [fallbackImage]

  // Autoplay do carrossel
  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="carrinho-page">
      <Header />
      <div className="carrinho-container">
        <div className="carrinho-left">
          <div className="carrinho-image">
            <div className="carrinho-image-carousel">
              <div className="carrinho-image-carousel-images">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`carrinho-image-carousel-image ${index === currentImageIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                ))}
              </div>
              {images.length > 1 && (
                <div className="carrinho-image-carousel-dots">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`carrinho-image-carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Ir para imagem ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="carrinho-amenities">
            <div className="carrinho-amenity-item">
              <span className="carrinho-amenity-icon"><FaSnowflake /></span>
              <span>Ar condicionado</span>
            </div>
            <div className="carrinho-amenity-item">
              <span className="carrinho-amenity-icon"><FaLock /></span>
              <span>Cofre</span>
            </div>
            <div className="carrinho-amenity-item">
              <span className="carrinho-amenity-icon"><FaWifi /></span>
              <span>Wi-fi</span>
            </div>
            <div className="carrinho-amenity-item">
              <span className="carrinho-amenity-icon"><FaBriefcase /></span>
              <span>Mesa de trabalho</span>
            </div>
            <div className="carrinho-amenity-item">
              <span className="carrinho-amenity-icon"><FaTv /></span>
              <span>Tv Smart</span>
            </div>
          </div>

          <div className="carrinho-rules-policies">
            <h4 className="carrinho-rules-title">Regras e Políticas</h4>
            <p className="carrinho-rules-details">Check-in: 14h | Check-out: 12h | Aceita pets | Estacionamento gratuito</p>
          </div>
        </div>

        {/* Carrinho - Desktop */}
        <div className="carrinho-right carrinho-right-desktop">
          <div className="carrinho-summary">
            <div className="carrinho-header">
              <span className="carrinho-icon">🛒</span>
              <span className="carrinho-header-text">Meu carrinho</span>
              <img src="/icones/logo boa.png" className="carrinho-logo" alt="Pousada Mi Casa Sua Casa Logo" />
            </div>
            <div className="carrinho-divider"></div>
            
            <div className="carrinho-info">
              <p className="carrinho-hotel">Pousada Mi Casa Sua Casa</p>
              <p className="carrinho-dates">
                {new Date(carrinho.checkIn).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} ➞ {new Date(carrinho.checkOut).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} ({carrinho.noites}) Noites
              </p>
            </div>
            <div className="carrinho-divider"></div>
            
            <div className="carrinho-room">
              <p className="carrinho-room-label">Quarto Selecionado</p>
              <p className="carrinho-room-name">{carrinho.quartoNome}</p>
            </div>
            <div className="carrinho-divider"></div>
            
            <div className="carrinho-price">
              <p className="carrinho-price-label">R$ {formatarMoeda(carrinho.preco)} / Noite</p>
            </div>
            <div className="carrinho-divider"></div>
            
            <div className="carrinho-total">
              <p className="carrinho-total-label">Total</p>
              <p className="carrinho-total-value">{formatarMoeda(carrinho.total)}</p>
            </div>
            
            <button 
              className="carrinho-button"
              onClick={() => navigate('/checkout')}
            >
              Finalizar Reserva
            </button>
          </div>
        </div>

        {/* Carrinho - Mobile */}
        <div className="carrinho-right carrinho-right-mobile">
          <div className="carrinho-summary carrinho-summary-mobile">
            <div className="carrinho-header carrinho-header-mobile">
              <span className="carrinho-icon">🛒</span>
              <span className="carrinho-header-text">Meu carrinho</span>
              <img src="/icones/logo boa.png" className="carrinho-logo" alt="Pousada Mi Casa Sua Casa Logo" />
            </div>
            <div className="carrinho-divider"></div>
            
            <div className="carrinho-info carrinho-info-mobile">
              <p className="carrinho-hotel">Pousada Mi Casa Sua Casa</p>
              <p className="carrinho-dates">
                {new Date(carrinho.checkIn).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} ➞ {new Date(carrinho.checkOut).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} ({carrinho.noites}) Noites
              </p>
            </div>
            <div className="carrinho-divider"></div>
            
            <div className="carrinho-room carrinho-room-mobile">
              <p className="carrinho-room-label">Quarto Selecionado</p>
              <p className="carrinho-room-name">{carrinho.quartoNome}</p>
            </div>
            <div className="carrinho-divider"></div>
            
            <div className="carrinho-price carrinho-price-mobile">
              <p className="carrinho-price-label">R$ {formatarMoeda(carrinho.preco)} / Noite</p>
            </div>
            <div className="carrinho-divider"></div>
            
            <div className="carrinho-total carrinho-total-mobile">
              <p className="carrinho-total-label">Total</p>
              <p className="carrinho-total-value">{formatarMoeda(carrinho.total)}</p>
            </div>
            
            <button 
              className="carrinho-button carrinho-button-mobile"
              onClick={() => navigate('/checkout')}
            >
              Finalizar Reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carrinho

