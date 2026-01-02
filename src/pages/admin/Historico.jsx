import { useState, useEffect } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { getReservas, deleteReserva, formatarMoeda } from '../../utils/storage'
import AdminHeader from '../../components/AdminHeader'
import './Historico.css'

const Historico = () => {
  const [reservas, setReservas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedReserva, setSelectedReserva] = useState(null)

  useEffect(() => {
    const todasReservas = getReservas()
    setReservas(todasReservas.filter(r => r.status === 'cancelada' || r.status === 'concluida'))
  }, [])

  const filteredReservas = reservas.filter(r => {
    const search = searchTerm.toLowerCase()
    return (
      r.nome?.toLowerCase().includes(search) ||
      r.email?.toLowerCase().includes(search) ||
      r.telefone?.includes(search) ||
      r.codigo?.toLowerCase().includes(search)
    )
  })

  const handleVerFicha = (reserva) => {
    setSelectedReserva(reserva)
  }

  const handleExcluir = (id) => {
    if (window.confirm('Deseja realmente excluir permanentemente esta reserva?')) {
      deleteReserva(id)
      setReservas(reservas.filter(r => r.id !== id))
      setSelectedReserva(null)
    }
  }

  return (
    <div className="historico-page">
      <AdminHeader currentPage="historico" />
      <div className="historico-container">
        <h1 className="historico-title">Histórico</h1>

        <div className="historico-search">
          <input
            type="text"
            placeholder="Nome, Numero, E-mail e Código"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="historico-search-input"
          />
          <FaSearch className="historico-search-icon" />
        </div>

        {selectedReserva ? (
          <div className="historico-ficha">
            <div className="ficha-header">
              <h3>{selectedReserva.codigo}</h3>
              <div className="ficha-status">
                <span className={selectedReserva.status === 'concluida' ? 'status-concluida' : 'status-cancelada'}>
                  {selectedReserva.status === 'concluida' ? 'Concluída' : 'Cancelada'}
                </span>
              </div>
              <button onClick={() => setSelectedReserva(null)} className="ficha-close">
                <FaTimes />
              </button>
            </div>
            <div className="ficha-content">
              <div className="ficha-row">
                <div className="ficha-group">
                  <label>Nome</label>
                  <input type="text" value={selectedReserva.nome || ''} readOnly />
                </div>
                <div className="ficha-group">
                  <label>Telefone</label>
                  <input type="text" value={selectedReserva.telefone || ''} readOnly />
                </div>
              </div>
              <div className="ficha-row">
                <div className="ficha-group">
                  <label>E-mail</label>
                  <input type="text" value={selectedReserva.email || ''} readOnly />
                </div>
                <div className="ficha-group">
                  <label>Pessoas</label>
                  <input type="text" value={selectedReserva.pessoas || 0} readOnly />
                </div>
              </div>
              <div className="ficha-group">
                <label>nome da suite</label>
                <input type="text" value={selectedReserva.quartoNome || ''} readOnly />
              </div>
              <div className="ficha-row">
                <div className="ficha-group">
                  <label>crianças</label>
                  <input type="text" value={selectedReserva.quantidadeCriancas || 0} readOnly />
                </div>
                <div className="ficha-group">
                  <label>Idades</label>
                  <input type="text" value={selectedReserva.idades?.join(', ') || ''} readOnly />
                </div>
              </div>
              <div className="ficha-row">
                <div className="ficha-group">
                  <label>R$ {formatarMoeda(selectedReserva.preco || 0)} / Noite</label>
                </div>
                <div className="ficha-group">
                  <label>Total de Noite</label>
                  <input type="text" value={selectedReserva.noites || 0} readOnly />
                </div>
              </div>
              <div className="ficha-group">
                <label>Total / R$ {selectedReserva.total ? formatarMoeda(selectedReserva.total) : '0,00'}</label>
              </div>
              <div className="ficha-actions">
                <button onClick={() => handleExcluir(selectedReserva.id)} className="ficha-excluir">
                  Excluir
                </button>
                <button onClick={() => setSelectedReserva(null)} className="ficha-sair">
                  Sair
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="historico-list">
            {filteredReservas.length === 0 ? (
              <div className="historico-empty">
                <p>Ainda não á ficha no histórico</p>
              </div>
            ) : (
              filteredReservas.map(reserva => (
                <div key={reserva.id} className="historico-item">
                  <div className="historico-nome">Nome do cliente</div>
                  <div className="historico-actions">
                    <button onClick={() => handleExcluir(reserva.id)} className="historico-button excluir">
                      Excluir
                    </button>
                    <button onClick={() => handleVerFicha(reserva)} className="historico-button">
                      Ver ficha
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Historico

