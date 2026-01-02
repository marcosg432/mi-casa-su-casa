import AdminHeader from '../../components/AdminHeader'
import './PainelCardapio.css'

const PainelCardapio = () => {
  const handleVerPainel = () => {
    window.open('http://localhost:3000/admin/login', '_blank')
  }

  return (
    <div className="painel-cardapio-page">
      <AdminHeader currentPage="painel-cardapio" />
      <div className="painel-cardapio-container">
        <h1 className="painel-cardapio-title">Painel Cardápio</h1>
        
        <div className="painel-cardapio-content">
          <div className="painel-cardapio-card">
            <h2 className="painel-cardapio-card-title">Acessar Painel do Cardápio</h2>
            <p className="painel-cardapio-card-text">
              Gerencie o cardápio digital, pratos, bebidas e pedidos através do painel administrativo do cardápio.
            </p>
            <button 
              className="painel-cardapio-button"
              onClick={handleVerPainel}
            >
              Ver Painel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PainelCardapio

