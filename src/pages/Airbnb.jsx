import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaBars } from 'react-icons/fa'
import { saveReserva, formatarMoeda } from '../utils/storage'
import { format } from 'date-fns'
import Calendar from '../components/Calendar'
import './Airbnb.css'

const Airbnb = () => {
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
      origem: 'Airbnb',
      metodoPagamento: 'Cartão'
    }
    saveReserva(reserva)
    alert('Reserva realizada com sucesso!')
    navigate('/')
  }

  return (
    <div className="airbnb-page">
      <div className="airbnb-header">
        <div className="airbnb-logo">
          <svg viewBox="0 0 1000 1000" className="airbnb-logo-svg">
            <path fill="#FF5A5F" d="M499.3 736.7c-51-64-81-120.3-81-203 0-130.1 84.4-259.2 208.1-259.2 123.8 0 208.1 129.1 208.1 259.2 0 82.7-30 139-81 203-11.1 13.8-31.2 13.8-42.3 0-51-64-81-120.3-81-203 0-130.1-84.3-259.2-208.1-259.2S210.1 203.6 210.1 333.7c0 82.7 30 139 81 203 11.1 13.8 31.2 13.8 42.3 0 51-64 81-120.3 81-203 0-130.1 84.4-259.2 208.1-259.2 123.8 0 208.1 129.1 208.1 259.2 0 82.7-30 139-81 203-11.1 13.8-31.2 13.8-42.3 0z"/>
          </svg>
          <span className="airbnb-logo-text">airbnb</span>
        </div>
        <div className="airbnb-header-right">
          <button className="airbnb-host">Torne-se um anfitrião</button>
          <button className="airbnb-menu"><FaBars /></button>
        </div>
      </div>

      <div className="airbnb-search-bar">
        <div className="airbnb-search-item">
          <label>Localização</label>
          <input type="text" value="Pousada Mi Casa Sua Casa" readOnly />
        </div>
        <div className="airbnb-search-item">
          <label>Check-in</label>
          <input
            type="text"
            value={formData.checkIn ? format(formData.checkIn, 'dd/MM/yyyy') : ''}
            onClick={() => setShowCalendar({ checkIn: true, checkOut: false })}
            readOnly
            placeholder="Adicionar datas"
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
        <div className="airbnb-search-item">
          <label>Check-out</label>
          <input
            type="text"
            value={formData.checkOut ? format(formData.checkOut, 'dd/MM/yyyy') : ''}
            onClick={() => setShowCalendar({ checkIn: false, checkOut: true })}
            readOnly
            placeholder="Adicionar datas"
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
        <div className="airbnb-search-item">
          <label>Hóspedes</label>
          <input
            type="number"
            name="pessoas"
            value={formData.pessoas}
            onChange={handleChange}
            min="1"
            max="6"
            placeholder="Hóspedes"
          />
        </div>
        <button className="airbnb-search-btn" onClick={(e) => e.preventDefault()}>
          <FaSearch /> Buscar
        </button>
      </div>

      <div className="airbnb-container">
        <div className="airbnb-main">
          <h1 className="airbnb-title">Suítes em Pousada Mi Casa Sua Casa</h1>
          
          <div className="airbnb-suites-grid">
            {suites.map(suite => (
              <div 
                key={suite.id} 
                className={`airbnb-suite-card ${formData.quartoId === suite.id ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, quartoId: suite.id })}
              >
                <div className="airbnb-suite-image">
                  <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400" alt={suite.nome} />
                </div>
                <div className="airbnb-suite-info">
                  <h3>{suite.nome}</h3>
                  <p className="airbnb-suite-price">R$ {formatarMoeda(suite.preco)} / noite</p>
                  {formData.checkIn && formData.checkOut && (
                    <button 
                      className="airbnb-pagar-btn"
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
              </div>
            ))}
          </div>

          {/* Etapa: Ficha */}
          {etapa === 'ficha' && (
            <div className="airbnb-reservation">
              <h2>Preencha seus dados</h2>
              <form onSubmit={handleFichaSubmit} className="airbnb-guest-form">
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
                <button type="submit" className="airbnb-reserve-btn">
                  Continuar
                </button>
                <button 
                  type="button" 
                  className="airbnb-cancel-btn"
                  onClick={() => setEtapa('busca')}
                >
                  Voltar
                </button>
              </form>
            </div>
          )}

          {/* Etapa: Carrinho */}
          {etapa === 'carrinho' && (
            <div className="airbnb-reservation">
              <h2>Carrinho</h2>
              <div className="airbnb-reservation-details">
                <div className="airbnb-reservation-item">
                  <p><strong>Suíte:</strong> {suiteSelecionada.nome}</p>
                  <p><strong>Check-in:</strong> {format(formData.checkIn, 'dd/MM/yyyy')}</p>
                  <p><strong>Check-out:</strong> {format(formData.checkOut, 'dd/MM/yyyy')}</p>
                  <p><strong>Hóspedes:</strong> {formData.pessoas}</p>
                </div>
                <div className="airbnb-reservation-total">
                  <p className="airbnb-total-price">R$ {formatarMoeda(calcularTotal())}</p>
                </div>
              </div>
              <div className="airbnb-carrinho-actions">
                <button className="airbnb-reserve-btn" onClick={handleCarrinhoContinuar}>
                  Continuar para Checkout
                </button>
                <button 
                  className="airbnb-cancel-btn"
                  onClick={() => setEtapa('ficha')}
                >
                  Voltar
                </button>
              </div>
            </div>
          )}

          {/* Etapa: Checkout */}
          {etapa === 'checkout' && (
            <div className="airbnb-reservation">
              <h2>Checkout</h2>
              <div className="airbnb-reservation-details">
                <div className="airbnb-reservation-item">
                  <p><strong>Suíte:</strong> {suiteSelecionada.nome}</p>
                  <p><strong>Check-in:</strong> {format(formData.checkIn, 'dd/MM/yyyy')}</p>
                  <p><strong>Check-out:</strong> {format(formData.checkOut, 'dd/MM/yyyy')}</p>
                  <p><strong>Hóspedes:</strong> {formData.pessoas}</p>
                  <p><strong>Nome:</strong> {formData.nome}</p>
                  <p><strong>E-mail:</strong> {formData.email}</p>
                  <p><strong>Telefone:</strong> {formData.telefone}</p>
                </div>
                <div className="airbnb-reservation-total">
                  <p className="airbnb-total-price-final">R$ {formatarMoeda(calcularTotal())}</p>
                </div>
              </div>
              <div className="airbnb-checkout-pagamento">
                <h3>Método de Pagamento</h3>
                <div className="airbnb-pagamento-options">
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
              <div className="airbnb-carrinho-actions">
                <button className="airbnb-reserve-btn" onClick={handleCheckoutFinalizar}>
                  Finalizar Reserva
                </button>
                <button 
                  className="airbnb-cancel-btn"
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

export default Airbnb

