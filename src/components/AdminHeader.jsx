import { Link } from 'react-router-dom'
import './AdminHeader.css'

const AdminHeader = ({ currentPage }) => {
  return (
    <header className="admin-header">
      <div className="admin-header-top">
        <Link to="/admin" className="admin-logo">
          <span className="admin-logo-text">pousada mi casa sua casa</span>
        </Link>
      </div>
      <nav className="admin-nav">
        <Link to="/admin/financeiro" className={currentPage === 'financeiro' ? 'active' : ''}>
          Financeiro
        </Link>
        <Link to="/admin/reservas" className={currentPage === 'reservas' ? 'active' : ''}>
          Reservas
        </Link>
        <Link to="/admin/quartos" className={currentPage === 'quartos' ? 'active' : ''}>
          Quartos
        </Link>
        <Link to="/admin/historico" className={currentPage === 'historico' ? 'active' : ''}>
          Histórico
        </Link>
        <Link to="/admin/gerenciamento" className={currentPage === 'gerenciamento' ? 'active' : ''}>
          Gerenciamento
        </Link>
        <Link to="/admin/despesas" className={currentPage === 'despesas' ? 'active' : ''}>
          Gerenciar despesas
        </Link>
        <Link to="/admin/painel-cardapio" className={currentPage === 'painel-cardapio' ? 'active' : ''}>
          Painel Cardápio
        </Link>
      </nav>
    </header>
  )
}

export default AdminHeader


