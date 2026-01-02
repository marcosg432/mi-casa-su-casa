import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { getReservas, updateReserva, formatarMoeda } from '../../utils/storage'
import AdminHeader from '../../components/AdminHeader'
import './Reservas.css'

const Reservas = () => {
  const navigate = useNavigate()
  const [reservas, setReservas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedReserva, setSelectedReserva] = useState(null)

  useEffect(() => {
    const todasReservas = getReservas()
    setReservas(todasReservas.filter(r => r.status !== 'cancelada' && r.status !== 'concluida'))
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

  const handleCancelar = (id) => {
    if (window.confirm('Deseja realmente cancelar esta reserva?')) {
      updateReserva(id, { status: 'cancelada' })
      setReservas(reservas.filter(r => r.id !== id))
      setSelectedReserva(null)
    }
  }

  return (
    <div className="reservas-page">
      <AdminHeader currentPage="reservas" />
      <div className="reservas-container">
        <h1 className="reservas-title">Reservas</h1>

        <div className="reservas-search">
          <input
            type="text"
            placeholder="Nome,Numero,E-mail e Código"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="reservas-search-input"
          />
          <FaSearch className="reservas-search-icon" />
        </div>

        {selectedReserva ? (
          <div className="reserva-ficha">
            <div className="ficha-header">
              <h3>{selectedReserva.codigo}</h3>
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
                <button onClick={() => handleCancelar(selectedReserva.id)} className="ficha-cancelar">
                  Cancelar reserva
                </button>
                <button onClick={() => setSelectedReserva(null)} className="ficha-sair">
                  Sair
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="reservas-list">
            {filteredReservas.length === 0 ? (
              <div className="reservas-empty">
                <p>Ainda não á reservas feitas</p>
              </div>
            ) : (
              filteredReservas.map(reserva => (
                <div key={reserva.id} className="reserva-item">
                  <div className="reserva-codigo">{reserva.codigo}</div>
                  <div className="reserva-actions">
                    <button onClick={() => handleVerFicha(reserva)} className="reserva-button">
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

export default Reservas

