import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchApi } from '../../utils/api'
import styles from '../../styles/CardapioAdmin.module.css'

const CardapioAdmin = () => {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return 'orders'
    }
    return 'dishes'
  })

  useEffect(() => {
    // Inicializar API imediatamente
    const initAPI = async () => {
      try {
        await fetchApi('/init', { method: 'POST' })
      } catch (error) {
        console.error('Erro ao inicializar API:', error)
      }
    }
    initAPI()
    
    const handleResize = () => {
      if (window.innerWidth <= 768 && activeTab !== 'orders') {
        setActiveTab('orders')
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeTab])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Painel Administrativo - Cardápio</h1>
      </header>

      <nav className={styles.tabs}>
        <button
          className={activeTab === 'dishes' ? styles.activeTab : ''}
          onClick={() => setActiveTab('dishes')}
        >
          Pratos & Bebidas
        </button>
        <button
          className={activeTab === 'orders' ? styles.activeTab : ''}
          onClick={() => setActiveTab('orders')}
        >
          Ficha de Pedido
        </button>
        <button
          className={activeTab === 'spreadsheet' ? styles.activeTab : ''}
          onClick={() => setActiveTab('spreadsheet')}
        >
          Planilha
        </button>
        <button
          className={activeTab === 'receipts' ? styles.activeTab : ''}
          onClick={() => setActiveTab('receipts')}
        >
          Vias
        </button>
      </nav>

      <main className={styles.main}>
        {activeTab === 'dishes' && <div className="desktop-only"><DishesTab /></div>}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'spreadsheet' && <div className="desktop-only"><SpreadsheetTab /></div>}
        {activeTab === 'receipts' && <div className="desktop-only"><ReceiptsTab /></div>}
      </main>
    </div>
  )
}

function DishesTab() {
  const [dishes, setDishes] = useState([])
  const [beverages, setBeverages] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const loadData = async (retryCount = 0) => {
    setLoading(true)
    const maxRetries = 2
    const timeout = 5000

    try {
      const fetchWithTimeout = (fetchPromise) => {
        return Promise.race([
          fetchPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeout)
          )
        ])
      }

      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (filter !== 'all') params.append('status', filter)

      const [dishesRes, beveragesRes] = await Promise.all([
        fetchWithTimeout(fetchApi(`/dishes?${params.toString()}`, { method: 'GET' })),
        fetchWithTimeout(fetchApi(`/beverages?${params.toString()}`, { method: 'GET' })),
      ])

      if (!dishesRes.ok || !beveragesRes.ok) {
        throw new Error('Erro ao carregar dados da API')
      }

      const dishesData = await dishesRes.json()
      const beveragesData = await beveragesRes.json()

      setDishes(Array.isArray(dishesData) ? dishesData : [])
      setBeverages(Array.isArray(beveragesData) ? beveragesData : [])
    } catch (error) {
      console.error('Erro ao carregar:', error)
      
      if (retryCount < maxRetries) {
        setTimeout(() => {
          loadData(retryCount + 1)
        }, 1000 * (retryCount + 1))
        return
      }
      
      setDishes([])
      setBeverages([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    loadData()
  }

  return (
    <div className={styles.tabContent}>
      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className={styles.searchInput}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterSelect}>
          <option value="all">Todos</option>
          <option value="active">Ativos</option>
          <option value="paused">Pausados</option>
        </select>
        <button onClick={handleSearch} className={styles.searchButton}>Buscar</button>
        <Link to="/admin/cardapio/dishes/new">
          <button className={styles.addButton}>+ Novo Prato</button>
        </Link>
        <Link to="/admin/cardapio/beverages/new">
          <button className={styles.addButton} style={{ background: '#3b82f6' }}>+ Nova Bebida</button>
        </Link>
      </div>

      <h2>Pratos</h2>
      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : (
        <div className={styles.itemsGrid}>
          {dishes.length === 0 ? (
            <p>Nenhum prato cadastrado</p>
          ) : (
            dishes.map((dish) => (
              <Link key={dish.id} to={`/admin/cardapio/dishes/${dish.id}`}>
                <div className={styles.itemCard}>
                  {dish.image_url && <img src={dish.image_url} alt={dish.name} onError={(e) => {
                    e.target.style.display = 'none'
                  }} />}
                  <h3>{dish.name}</h3>
                  <span className={styles.status}>{dish.status}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      <h2>Bebidas</h2>
      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : (
        <div className={styles.itemsGrid}>
          {beverages.length === 0 ? (
            <p>Nenhuma bebida cadastrada</p>
          ) : (
            beverages.map((beverage) => (
              <Link key={beverage.id} to={`/admin/cardapio/beverages/${beverage.id}`}>
                <div className={styles.itemCard}>
                  {beverage.image_url && <img src={beverage.image_url} alt={beverage.name} onError={(e) => {
                    e.target.style.display = 'none'
                  }} />}
                  <h3>{beverage.name}</h3>
                  <span className={styles.status}>{beverage.status}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}

function OrdersTab() {
  const [sheets, setSheets] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadSheets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadSheets = async (retryCount = 0) => {
    setLoading(true)
    const maxRetries = 2
    const timeout = 5000

    try {
      const fetchWithTimeout = (fetchPromise) => {
        return Promise.race([
          fetchPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeout)
          )
        ])
      }

      const res = await fetchWithTimeout(fetchApi('/orders?status=active', { method: 'GET' }))

      if (!res.ok) {
        throw new Error('Erro ao carregar fichas')
      }

      const data = await res.json()
      setSheets(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Erro ao carregar fichas:', error)
      
      if (retryCount < maxRetries) {
        setTimeout(() => {
          loadSheets(retryCount + 1)
        }, 1000 * (retryCount + 1))
        return
      }
      
      setSheets([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSheet = async (sheetId, e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!confirm('Tem certeza que deseja excluir esta ficha de pedido?')) {
      return
    }

    try {
      const res = await fetch(`/api/orders/${sheetId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        loadSheets()
      } else {
        alert('Erro ao excluir ficha')
      }
    } catch (error) {
      console.error('Erro ao excluir ficha:', error)
      alert('Erro ao excluir ficha')
    }
  }

  return (
    <div className={styles.tabContent}>
      <Link to="/admin/cardapio/orders/new">
        <button className={styles.addButton}>+ Nova Ficha de Pedido</button>
      </Link>
      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : (
        <div className={styles.sheetsList}>
          {sheets.length === 0 ? (
            <p>Nenhuma ficha de pedido ativa</p>
          ) : (
            sheets.map((sheet) => (
              <div key={sheet.id} style={{ position: 'relative' }}>
                <Link to={`/admin/cardapio/orders/${sheet.id}`}>
                  <div className={styles.sheetCard}>
                    <h3>Mesa {sheet.table_number}</h3>
                    {sheet.customer_name && <p>Cliente: {sheet.customer_name}</p>}
                    <p>Total: R$ {sheet.total?.toFixed(2) || '0.00'}</p>
                  </div>
                </Link>
                <button
                  onClick={(e) => handleDeleteSheet(sheet.id, e)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  × Excluir
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

function SpreadsheetTab() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadSpreadsheet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadSpreadsheet = async (retryCount = 0) => {
    setLoading(true)
    const maxRetries = 2
    const timeout = 5000

    try {
      const fetchWithTimeout = (fetchPromise) => {
        return Promise.race([
          fetchPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeout)
          )
        ])
      }

      const res = await fetchWithTimeout(fetchApi('/spreadsheet', { method: 'GET' }))

      if (!res.ok) {
        throw new Error('Erro ao carregar planilha')
      }

      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Erro ao carregar planilha:', error)
      
      if (retryCount < maxRetries) {
        setTimeout(() => {
          loadSpreadsheet(retryCount + 1)
        }, 1000 * (retryCount + 1))
        return
      }
      
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.tabContent}>
      <h2>Planilha de Valores</h2>
      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : (
        <table className={styles.spreadsheetTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                  Nenhum item cadastrado
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={`${item.type}-${item.id}`}>
                  <td>{item.name}</td>
                  <td>{item.type === 'dish' ? 'Prato' : 'Bebida'}</td>
                  <td>R$ {item.price.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

function ReceiptsTab() {
  const [receipts, setReceipts] = useState([])
  const [searchCode, setSearchCode] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadReceipts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadReceipts = async (retryCount = 0) => {
    setLoading(true)
    const maxRetries = 2
    const timeout = 5000

    try {
      const fetchWithTimeout = (fetchPromise) => {
        return Promise.race([
          fetchPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeout)
          )
        ])
      }

      const params = searchCode ? `?code=${searchCode}` : ''
      const res = await fetchWithTimeout(fetchApi(`/receipts${params}`, { method: 'GET' }))

      if (!res.ok) {
        throw new Error('Erro ao carregar vias')
      }

      const data = await res.json()
      setReceipts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Erro ao carregar vias:', error)
      
      if (retryCount < maxRetries) {
        setTimeout(() => {
          loadReceipts(retryCount + 1)
        }, 1000 * (retryCount + 1))
        return
      }
      
      setReceipts([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    loadReceipts()
  }

  const handleDeleteReceipt = async (code, e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!confirm('Tem certeza que deseja excluir esta via?')) {
      return
    }

    try {
      const res = await fetch(`/api/receipts/${code}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        loadReceipts()
      } else {
        alert('Erro ao excluir via')
      }
    } catch (error) {
      console.error('Erro ao excluir via:', error)
      alert('Erro ao excluir via')
    }
  }

  return (
    <div className={styles.tabContent}>
      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="Buscar por código..."
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>Buscar</button>
      </div>
      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : (
        <div className={styles.receiptsList}>
          {receipts.length === 0 ? (
            <p>Nenhuma via encontrada</p>
          ) : (
            receipts.map((receipt) => (
              <div key={receipt.id} style={{ position: 'relative' }}>
                <Link to={`/admin/cardapio/receipts/${receipt.code}`}>
                  <div className={styles.receiptCard}>
                    <h3>Código: {receipt.code}</h3>
                    <p>Mesa: {receipt.table_number}</p>
                    {receipt.customer_name && <p>Cliente: {receipt.customer_name}</p>}
                    <p>Total: R$ {receipt.total.toFixed(2)}</p>
                  </div>
                </Link>
                <button
                  onClick={(e) => handleDeleteReceipt(receipt.code, e)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  × Excluir
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default CardapioAdmin

