import { Link, useNavigate } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const navigate = useNavigate()

  const handleReservaClick = () => {
    navigate('/quartos')
  }

  return (
    <>
      {/* Footer - Desktop */}
      <footer className="home-footer home-footer-desktop">
        <div className="home-footer-background"></div>
        <div className="home-footer-content">
          <div className="home-footer-left">
            <div className="home-footer-logo">
              <img src="/icones/logo boa.png" alt="Pousada Mi Casa Sua Casa Logo" />
            </div>
            <h2 className="home-footer-title">
              Bem-vindo<br />
              a Pousada<br />
              Mi Casa Sua Casa
            </h2>
          </div>

          <div className="home-footer-center">
            <nav className="home-footer-nav">
              <Link to="/" className="home-footer-nav-link">Inicio</Link>
              <Link to="/quartos" className="home-footer-nav-link">Quartos</Link>
              <Link to="/galeria" className="home-footer-nav-link">Galeria</Link>
              <Link to="/sobre" className="home-footer-nav-link">sobre</Link>
              <Link to="/servicos" className="home-footer-nav-link">Serviços</Link>
              <Link to="/contato" className="home-footer-nav-link">contato</Link>
            </nav>
          </div>

          <div className="home-footer-right">
            <div className="home-footer-contact">
              <p className="home-footer-phone">91 8078-1514</p>
              <p className="home-footer-email">micasasucasaben@gmail.com</p>
            </div>
            <div className="home-footer-social">
              <a 
                href="https://www.instagram.com/pousada_micasasucasa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="home-footer-social-icon"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.facebook.com/pousadamicasasucasa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="home-footer-social-icon"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://wa.me/559180781514" 
                target="_blank" 
                rel="noopener noreferrer"
                className="home-footer-social-icon"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
            <button className="home-footer-button" onClick={handleReservaClick}>Fazer reserva</button>
          </div>
        </div>
      </footer>

      {/* Footer - Mobile */}
      <footer className="home-footer home-footer-mobile">
        <div className="home-footer-background-mobile"></div>
        <div className="home-footer-content home-footer-content-mobile">
          {/* Estrutura igual ao topo: Logo e Título centralizados */}
          <div className="home-footer-top-mobile">
            <div className="home-footer-logo-mobile">
              <img src="/icones/logo boa.png" alt="Pousada Mi Casa Sua Casa Logo" />
            </div>
            <h2 className="home-footer-title-mobile">
              Bem-vindo a Pousada Mi Casa Sua Casa
            </h2>
          </div>

          {/* Navegação */}
          <nav className="home-footer-nav-mobile">
            <Link to="/" className="home-footer-nav-link-mobile">Inicio</Link>
            <Link to="/quartos" className="home-footer-nav-link-mobile">Quartos</Link>
            <Link to="/galeria" className="home-footer-nav-link-mobile">Galeria</Link>
            <Link to="/sobre" className="home-footer-nav-link-mobile">sobre</Link>
            <Link to="/servicos" className="home-footer-nav-link-mobile">Serviços</Link>
            <Link to="/contato" className="home-footer-nav-link-mobile">contato</Link>
            </nav>

          {/* Contato, Redes Sociais e Botão */}
          <div className="home-footer-bottom-mobile">
            <div className="home-footer-contact-mobile">
              <p className="home-footer-phone-mobile">91 8078-1514</p>
              <p className="home-footer-email-mobile">micasasucasaben@gmail.com</p>
            </div>
            <div className="home-footer-social-mobile">
              <a 
                href="https://www.instagram.com/pousada_micasasucasa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="home-footer-social-icon-mobile"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.facebook.com/pousadamicasasucasa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="home-footer-social-icon-mobile"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://wa.me/559180781514" 
                target="_blank" 
                rel="noopener noreferrer"
                className="home-footer-social-icon-mobile"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
            <button className="home-footer-button-mobile" onClick={handleReservaClick}>Fazer reserva</button>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer


