import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Header.css'

const Header = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('')
  const [isWhiteBg, setIsWhiteBg] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'inicio', path: '/' },
    { name: 'Quartos', path: '/quartos' },
    { name: 'Galeria', path: '/galeria' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Contato', path: '/contato' }
  ]

  useEffect(() => {
    const currentPath = location.pathname
    // Nas páginas privadas (suites), sempre marcar "Quartos" como ativo
    const suitePages = ['/suite-imperial', '/suite-luxo', '/suite-premium', '/suite-exclusiva']
    const isSuitePage = suitePages.some(page => currentPath.startsWith(page))
    
    if (isSuitePage) {
      setActiveTab('Quartos')
      setIsWhiteBg(true)
      return
    }
    
    const activeItem = navItems.find(item => {
      if (item.path === '/') {
        return currentPath === '/'
      }
      return currentPath.startsWith(item.path)
    })
    setActiveTab(activeItem ? activeItem.name : 'inicio')
    
    // Páginas que precisam de fundo branco no header (apenas páginas privadas de quartos)
    // Páginas Início, Galeria, Sobre e Contato usam header transparente (igual ao Início)
    setIsWhiteBg(false)
  }, [location.pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`header ${isWhiteBg ? 'header-white-bg' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/icones/logo boa.png" className="logo-icon" alt="Pousada Mi Casa Sua Casa Logo" />
        </Link>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          {navItems.map((item) => {
            const isActive = activeTab === item.name
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="nav-link-text">{item.name}</span>
                {isActive && (
                  <>
                    <motion.div
                      layoutId="lamp"
                      className="lamp-indicator"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="lamp-glow">
                        <div className="lamp-glow-inner"></div>
                      </div>
                    </motion.div>
                    <motion.div
                      layoutId="active-bg"
                      className="active-background"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  </>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header
