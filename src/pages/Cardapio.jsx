import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Cardapio.module.css'

const Cardapio = () => {
  const [dishes, setDishes] = useState([])
  const [beverages, setBeverages] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    if (isMobile) {
      loadData()
    }

    return () => window.removeEventListener('resize', checkMobile)
  }, [isMobile])

  const loadData = async () => {
    try {
      // Criar um timeout manual
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      )

      // Tentar múltiplas URLs possíveis para o cardápio Next.js
      const possibleUrls = [
        `http://${window.location.hostname}:3001`, // Mesma máquina, porta 3001
        window.location.origin, // Mesma origem
        '/api', // URL relativa (proxy)
      ]

      let dishesData = []
      let beveragesData = []
      let success = false

      // Tentar cada URL até encontrar uma que funcione
      for (const baseUrl of possibleUrls) {
        try {
          const url = baseUrl === '/api' ? baseUrl : `${baseUrl}/api`
          
          const fetchPromise = Promise.all([
            fetch(`${url}/dishes/public`, { 
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
            }),
            fetch(`${url}/beverages/public`, { 
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
            }),
          ])

          const [dishesRes, beveragesRes] = await Promise.race([
            fetchPromise,
            timeoutPromise
          ])

          if (dishesRes && beveragesRes && dishesRes.ok && beveragesRes.ok) {
            dishesData = await dishesRes.json()
            beveragesData = await beveragesRes.json()
            success = true
            break
          }
        } catch (err) {
          // Continuar tentando próxima URL
          console.log(`Tentativa falhou para ${baseUrl}:`, err.message)
        }
      }

      setDishes(Array.isArray(dishesData) ? dishesData : [])
      setBeverages(Array.isArray(beveragesData) ? beveragesData : [])
    } catch (error) {
      console.error('Erro ao carregar dados do cardápio:', error)
      setDishes([])
      setBeverages([])
    } finally {
      setLoading(false)
    }
  }

  if (!isMobile) {
    return (
      <div className={styles.desktopMessage}>
        <div className={styles.desktopMessageContent}>
          <div className={styles.desktopIcon}>📱</div>
          <h1 className={styles.desktopTitle}>Cardápio Disponível Apenas em Celular</h1>
          <p className={styles.desktopText}>
            Este cardápio pode ser visualizado somente em celular. Entre em um celular para que consiga ver nossas variedades.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <section className={styles.bannerSection}></section>

      {beverages.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Bebidas</h2>
          <div className={styles.horizontalScroll}>
            {beverages.map((beverage) => (
              <div key={beverage.id} className={styles.beverageCard}>
                {beverage.image_url && (
                  <img src={beverage.image_url} alt={beverage.name} />
                )}
                <h3>{beverage.name}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Pratos</h2>
        {loading ? (
          <div className={styles.loading}>Carregando...</div>
        ) : dishes.length === 0 ? (
          <div className={styles.loading}>
            Nenhum prato disponível no momento. O cardápio pode estar sendo configurado.
          </div>
        ) : (
          <div className={styles.dishesGrid}>
            {Array.isArray(dishes) && dishes.map((dish) => (
              <div key={dish.id} className={styles.dishCard}>
                {dish.image_url && (
                  <img src={dish.image_url} alt={dish.name} />
                )}
                <div className={styles.dishCardContent}>
                  <h3>{dish.name}</h3>
                  <p>{dish.mini_presentation}</p>
                  <div className={styles.dishCardFooter}>
                    <Link to={`/prato/${dish.id}`}>
                      <button className={styles.viewButton}>
                        <svg className={styles.clocheIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 48" fill="none">
                          <path d="M26 8c1.5 2 1.5 4 0 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M32 6c1.5 2.5 1.5 5 0 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M38 8c1.5 2 1.5 4 0 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M16 28a16 16 0 0 1 32 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                          <circle cx="32" cy="12" r="2" fill="currentColor"/>
                          <line x1="14" y1="32" x2="50" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                          <line x1="18" y1="36" x2="46" y2="36" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                        Ver Prato
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Cardapio

