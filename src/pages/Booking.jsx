import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveReserva, formatarMoeda } from '../utils/storage'
import { format } from 'date-fns'
import Calendar from '../components/Calendar'
import './Booking.css'

const Booking = () => {
  const navigate = useNavigate()
  const [showCalendar, setShowCalendar] = useState({ checkIn: false, checkOut: false })
  const [etapa, setEtapa] = useState('busca') // 'busca', 'ficha', 'carrinho', 'checkout'
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    pessoas: 2,
    checkIn: null,
    checkOut: null,
    quartoId: 'imperial'
  })

  const suites = [
    { id: 'imperial', nome: 'Suíte Pousada Mi Casa Sua Casa', preco: 249 },
    { id: 'luxo', nome: 'Suíte Brisa Luxo', preco: 350 },
    { id: 'premium', nome: 'Suíte Brisa Premium', preco: 450 },
    { id: 'exclusiva', nome: 'Suíte Brisa Exclusiva', preco: 550 }
  ]

  const suiteSelecionada = suites.find(s => s.id === formData.quartoId)

  const handleDateSelect = (checkIn, checkOut) => {
    setFormData({
      ...formData,
      checkIn,
      checkOut
    })
    setShowCalendar({ checkIn: false, checkOut: false })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const calcularTotal = () => {
    if (!formData.checkIn || !formData.checkOut) return 0
    const diffTime = Math.abs(new Date(formData.checkOut) - new Date(formData.checkIn))
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays * suiteSelecionada.preco
  }

  const handlePagar = () => {
    if (!formData.checkIn || !formData.checkOut) {
      alert('Por favor, selecione as datas de check-in e check-out')
      return
    }
    setEtapa('ficha')
  }

  const handleFichaSubmit = (e) => {
    e.preventDefault()
    if (!formData.nome || !formData.email || !formData.telefone) {
      alert('Por favor, preencha todos os campos')
      return
    }
    setEtapa('carrinho')
  }

  const handleCarrinhoContinuar = () => {
    setEtapa('checkout')
  }

  const handleCheckoutFinalizar = () => {
    const reserva = {
      ...formData,
      total: calcularTotal(),
      origem: 'Booking',
      metodoPagamento: 'Cartão'
    }
    saveReserva(reserva)
    alert('Reserva realizada com sucesso!')
    navigate('/')
  }


  return (
    <div className="booking-page">
      <div className="booking-header">
        <div className="booking-logo">
          <span className="booking-logo-text">booking.com</span>
        </div>
        <button className="booking-signin">Entrar</button>
      </div>

      <div className="booking-container">
        <div className="booking-main">
          <h1 className="booking-title">Encontre e reserve sua estadia perfeita</h1>
          
          <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
            <div className="booking-form-row">
              <div className="booking-form-group">
                <label>Destino</label>
                <input type="text" value="Pousada Mi Casa Sua Casa" readOnly />
              </div>
              <div className="booking-form-group">
                <label>Check-in</label>
                <input
                  type="text"
                  value={formData.checkIn ? format(formData.checkIn, 'dd/MM/yyyy') : ''}
                  onClick={() => setShowCalendar({ checkIn: true, checkOut: false })}
                  readOnly
                  placeholder="Data de entrada"
                />
                {showCalendar.checkIn && (
                  <div className="calendar-popup">
                    <Calendar
                      quartoId={formData.quartoId}
                      checkIn={formData.checkIn}
                      checkOut={formData.checkOut}
                      onDateSelect={handleDateSelect}
                      selectingCheckIn={true}
                    />
                  </div>
                )}
              </div>
              <div className="booking-form-group">
                <label>Check-out</label>
                <input
                  type="text"
                  value={formData.checkOut ? format(formData.checkOut, 'dd/MM/yyyy') : ''}
                  onClick={() => setShowCalendar({ checkIn: false, checkOut: true })}
                  readOnly
                  placeholder="Data de saída"
                />
                {showCalendar.checkOut && (
                  <div className="calendar-popup">
                    <Calendar
                      quartoId={formData.quartoId}
                      checkIn={formData.checkIn}
                      checkOut={formData.checkOut}
                      onDateSelect={handleDateSelect}
                      selectingCheckIn={false}
                    />
                  </div>
                )}
              </div>
              <div className="booking-form-group">
                <label>Hóspedes</label>
                <input
                  type="number"
                  name="pessoas"
                  value={formData.pessoas}
                  onChange={handleChange}
                  min="1"
                  max="6"
                />
              </div>
              <button type="submit" className="booking-search-btn">Buscar</button>
            </div>
          </form>

          <div className="booking-suites">
            <h2>Suítes Disponíveis</h2>
            <div className="booking-suites-grid">
              {suites.map(suite => (
                <div 
                  key={suite.id} 
                  className={`booking-suite-card ${formData.quartoId === suite.id ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, quartoId: suite.id })}
                >
                  <h3>{suite.nome}</h3>
                  <p className="booking-suite-price">R$ {formatarMoeda(suite.preco)} / noite</p>
                  {formData.checkIn && formData.checkOut && (
                    <button 
                      className="booking-pagar-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        setFormData({ ...formData, quartoId: suite.id })
                        handlePagar()
                      }}
                    >
                      Pagar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Etapa: Ficha */}
          {etapa === 'ficha' && (
            <div className="booking-reservation">
              <h2>Preencha seus dados</h2>
              <form onSubmit={handleFichaSubmit} className="booking-guest-info">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="telefone"
                  placeholder="Telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="booking-confirm-btn">
                  Continuar
                </button>
                <button 
                  type="button" 
                  className="booking-cancel-btn"
                  onClick={() => setEtapa('busca')}
                >
                  Voltar
                </button>
              </form>
            </div>
          )}

          {/* Etapa: Carrinho */}
          {etapa === 'carrinho' && (
            <div className="booking-reservation">
              <h2>Carrinho</h2>
              <div className="booking-reservation-info">
                <p><strong>Suíte:</strong> {suiteSelecionada.nome}</p>
                <p><strong>Check-in:</strong> {format(formData.checkIn, 'dd/MM/yyyy')}</p>
                <p><strong>Check-out:</strong> {format(formData.checkOut, 'dd/MM/yyyy')}</p>
                <p><strong>Hóspedes:</strong> {formData.pessoas}</p>
                <p><strong>Total:</strong> R$ {formatarMoeda(calcularTotal())}</p>
              </div>
              <div className="booking-carrinho-actions">
                <button className="booking-confirm-btn" onClick={handleCarrinhoContinuar}>
                  Continuar para Checkout
                </button>
                <button 
                  className="booking-cancel-btn"
                  onClick={() => setEtapa('ficha')}
                >
                  Voltar
                </button>
              </div>
            </div>
          )}

          {/* Etapa: Checkout */}
          {etapa === 'checkout' && (
            <div className="booking-reservation">
              <h2>Checkout</h2>
              <div className="booking-reservation-info">
                <p><strong>Suíte:</strong> {suiteSelecionada.nome}</p>
                <p><strong>Check-in:</strong> {format(formData.checkIn, 'dd/MM/yyyy')}</p>
                <p><strong>Check-out:</strong> {format(formData.checkOut, 'dd/MM/yyyy')}</p>
                <p><strong>Hóspedes:</strong> {formData.pessoas}</p>
                <p><strong>Nome:</strong> {formData.nome}</p>
                <p><strong>E-mail:</strong> {formData.email}</p>
                <p><strong>Telefone:</strong> {formData.telefone}</p>
                <p className="booking-total-final"><strong>Total:</strong> R$ {calcularTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="booking-checkout-pagamento">
                <h3>Método de Pagamento</h3>
                <div className="booking-pagamento-options">
                  <label>
                    <input type="radio" name="pagamento" value="cartao" defaultChecked />
                    Cartão de Crédito
                  </label>
                  <label>
                    <input type="radio" name="pagamento" value="pix" />
                    PIX
                  </label>
                </div>
              </div>
              <div className="booking-carrinho-actions">
                <button className="booking-confirm-btn" onClick={handleCheckoutFinalizar}>
                  Finalizar Reserva
                </button>
                <button 
                  className="booking-cancel-btn"
                  onClick={() => setEtapa('carrinho')}
                >
                  Voltar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Booking

