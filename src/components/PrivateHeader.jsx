import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './PrivateHeader.css'

const PrivateHeader = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('')

  const navItems = [
    { name: 'inicio', path: '/' },
    { name: 'Quartos', path: '/quartos' },
    { name: 'Galeria', path: '/galeria' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Contato', path: '/contato' }
  ]

  useEffect(() => {
    const currentPath = location.pathname
    // Nas páginas privadas (suites), sempre marcar "Quartos" como ativo
    const suitePages = ['/suite-imperial', '/suite-luxo', '/suite-premium', '/suite-exclusiva']
    const isSuitePage = suitePages.some(page => currentPath.startsWith(page))
    
    if (isSuitePage) {
      setActiveTab('Quartos')
      return
    }
    
    const activeItem = navItems.find(item => {
      if (item.path === '/') {
        return currentPath === '/'
      }
      return currentPath.startsWith(item.path)
    })
    setActiveTab(activeItem ? activeItem.name : 'inicio')
  }, [location.pathname])

  return (
    <header className="private-header">
      <div className="private-header-container">
        <Link to="/" className="private-logo">
          <img src="/icones/logo boa.png" className="private-logo-icon" alt="Pousada Mi Casa Sua Casa Logo" />
          <span className="private-logo-text">pousada mi casa sua casa</span>
        </Link>
        <nav className="private-nav">
          {navItems.map((item) => {
            const isActive = activeTab === item.name
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`private-nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="private-nav-link-text">{item.name}</span>
                {isActive && (
                  <>
                    <motion.div
                      layoutId="lamp-private"
                      className="private-lamp-indicator"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="private-lamp-glow">
                        <div className="private-lamp-glow-inner"></div>
                      </div>
                    </motion.div>
                    <motion.div
                      layoutId="active-bg-private"
                      className="private-active-background"
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

export default PrivateHeader

