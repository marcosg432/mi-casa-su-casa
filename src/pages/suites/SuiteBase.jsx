import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSnowflake, FaLock, FaWifi, FaBriefcase, FaTv, FaChevronLeft, FaChevronRight, FaUsers, FaRulerCombined, FaDollarSign, FaEye, FaHome, FaTshirt, FaBox, FaWind, FaUtensils, FaArrowLeft } from 'react-icons/fa'
import PrivateHeader from '../../components/PrivateHeader'
import Footer from '../../components/Footer'
import Calendar from '../../components/Calendar'
import { format } from 'date-fns'
import { saveCarrinho, formatarMoeda } from '../../utils/storage'
import './SuiteBase.css'

const SuiteBase = ({ suiteData }) => {
  const navigate = useNavigate()
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showCalendar, setShowCalendar] = useState({ checkIn: false, checkOut: false })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Imagens do carrossel baseadas no quarto selecionado
  const getSuiteImages = () => {
    const quartoId = suiteData.id
    
    if (quartoId === 'quarto1') {
      return [
        '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/01326756-1b5e-42e3-9bb6-49125bdecaf0.jpg',
        '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/0928ff2f-28ad-455f-99d9-99dbc34fb6c2.jpg',
        '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/17b7bc69-311f-487a-826b-1930a3343b3d.jpg',
        '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/50cac846-d63d-4cb9-885f-d3f8071e7518.jpg',
        '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/70e05b71-e628-4e87-a108-31ab8d696e2c.jpg',
        '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/72b019e4-58f3-422f-979a-a5fc6b0e0472.jpg',
        '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/7453ce3a-62db-4466-aff7-5c2532a38dbf.jpg',
        '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/a5c7cd38-4cb0-435f-944c-bf5700615e27.jpg',
        '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/b00af959-61c0-4233-95fc-1176ee4147f0.jpg',
        '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/cc50e465-6f65-48e1-9139-50c7255cdc08.jpg'
      ]
    } else if (quartoId === 'quarto2') {
      return [
        '/fotos_dos_quartos/quarto-familia/0c12b8c5-3f4e-40f2-a33c-652dbd44554a.jpg',
        '/fotos_dos_quartos/quarto-familia/13c7eb7a-219b-4bd2-b5b9-b842eb1cd363.jpg',
        '/fotos_dos_quartos/quarto-familia/56b5474f-3533-4f9a-ba14-8661b0567691.jpg',
        '/fotos_dos_quartos/quarto-familia/640391605.jpg',
        '/fotos_dos_quartos/quarto-familia/7fcddf93-f843-4bbb-b36f-92dc5b18bd4c.jpg',
        '/fotos_dos_quartos/quarto-familia/a786fd56-b3bb-4795-beda-28aef1b89fda.jpg',
        '/fotos_dos_quartos/quarto-familia/adf395a6-c1c1-4b9c-9af2-e6a60b0b4358.jpg'
      ]
    } else if (quartoId === 'quarto3') {
      return [
        '/fotos_dos_quartos/quarto-familia-5x/49644389-4641-4e6b-a525-48151c8f1a1a.jpg',
        '/fotos_dos_quartos/quarto-familia-5x/5ae27bd4-6c26-4cab-aa0c-71dca7b965ab.jpg',
        '/fotos_dos_quartos/quarto-familia-5x/7fcddf93-f843-4bbb-b36f-92dc5b18bd4c.jpg',
        '/fotos_dos_quartos/quarto-familia-5x/89878656-9fee-48bb-bceb-0e127917cdea.jpg',
        '/fotos_dos_quartos/quarto-familia-5x/b640c721-ae41-417e-8bdb-d704e70fc577.jpg',
        '/fotos_dos_quartos/quarto-familia-5x/db03dc39-c11b-4ce8-9de1-1bf515f82b72.jpg',
        '/fotos_dos_quartos/quarto-familia-5x/eb943dde-c60c-4c45-84de-79971adf3909.jpg'
      ]
    } else if (quartoId === 'quarto4') {
      return [
        '/fotos_dos_quartos/quarto_duplo/17594547-0116-4697-9187-e1abf4561671.jpg',
        '/fotos_dos_quartos/quarto_duplo/649ff996-e316-4fa2-94f0-6b7169eef796.jpg',
        '/fotos_dos_quartos/quarto_duplo/69dcd418-4fd5-4e0f-904e-2f15b4ad29a9.jpg',
        '/fotos_dos_quartos/quarto_duplo/70e05b71-e628-4e87-a108-31ab8d696e2c.jpg',
        '/fotos_dos_quartos/quarto_duplo/7453ce3a-62db-4466-aff7-5c2532a38dbf.jpg',
        '/fotos_dos_quartos/quarto_duplo/a5c7cd38-4cb0-435f-944c-bf5700615e27.jpg',
        '/fotos_dos_quartos/quarto_duplo/a921caca-e9f0-4597-888e-eec9d5241592.jpg',
        '/fotos_dos_quartos/quarto_duplo/b00af959-61c0-4233-95fc-1176ee4147f0.jpg',
        '/fotos_dos_quartos/quarto_duplo/b93d9768-2536-42a2-87ed-4f1424eeb00d.jpg',
        '/fotos_dos_quartos/quarto_duplo/cc50e465-6f65-48e1-9139-50c7255cdc08.jpg'
      ]
    }
    
    // Fallback para outros quartos
    return [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
    ]
  }

  const suiteImages = getSuiteImages()

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    pessoas: 0,
    temCriancas: false,
    quantidadeCriancas: 0,
    idades: [],
    checkIn: null,
    checkOut: null
  })

  const handleDateSelect = (checkIn, checkOut) => {
    setFormData({
      ...formData,
      checkIn,
      checkOut
    })
    setShowCalendar({ checkIn: false, checkOut: false })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleCriancasChange = (e) => {
    const temCriancas = e.target.checked
    setFormData({
      ...formData,
      temCriancas,
      quantidadeCriancas: temCriancas ? 1 : 0,
      idades: temCriancas ? [0] : []
    })
  }

  const handleQuantidadeCriancas = (e) => {
    const quantidade = parseInt(e.target.value) || 0
    const maxCriancas = Math.min(quantidade, 4)
    setFormData({
      ...formData,
      quantidadeCriancas: maxCriancas,
      idades: Array(maxCriancas).fill(0).map((_, i) => formData.idades[i] || 0)
    })
  }

  const handleIdadeChange = (index, value) => {
    const novasIdades = [...formData.idades]
    novasIdades[index] = parseInt(value) || 0
    setFormData({
      ...formData,
      idades: novasIdades
    })
  }

  const calcularTotal = () => {
    if (!formData.checkIn || !formData.checkOut || !suiteData.preco || suiteData.preco === 0) return 0
    const diffTime = Math.abs(formData.checkOut - formData.checkIn)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays * suiteData.preco
  }

  const calcularNoites = () => {
    if (!formData.checkIn || !formData.checkOut) return 0
    const diffTime = Math.abs(formData.checkOut - formData.checkIn)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Função para obter ícone baseado na comodidade
  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase()
    if (amenityLower.includes('wi-fi') || amenityLower.includes('wifi')) return <FaWifi />
    if (amenityLower.includes('vista')) return <FaEye />
    if (amenityLower.includes('terraço')) return <FaHome />
    if (amenityLower.includes('máquina') || amenityLower.includes('lavar')) return <FaTshirt />
    if (amenityLower.includes('guarda-roupa') || amenityLower.includes('guarda roupa')) return <FaBox />
    if (amenityLower.includes('ventilador')) return <FaWind />
    if (amenityLower.includes('ar-condicionado') || amenityLower.includes('ar condicionado')) return <FaSnowflake />
    if (amenityLower.includes('cozinha')) return <FaUtensils />
    return <FaBriefcase />
  }

  // Valores padrão para compatibilidade
  const capacidade = suiteData.capacidade || 8
  const tamanho = suiteData.tamanho || '100 m²'
  const comodidades = suiteData.comodidades || ['Ar condicionado', 'Cofre', 'Wi-fi', 'Mesa de trabalho', 'Tv Smart']

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Autoplay do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % suiteImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [suiteImages.length])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % suiteImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + suiteImages.length) % suiteImages.length)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.checkIn || !formData.checkOut) {
      alert('Por favor, selecione as datas de check-in e check-out')
      return
    }

    const carrinho = {
      ...formData,
      quartoId: suiteData.id,
      quartoNome: suiteData.nome,
      preco: suiteData.preco,
      total: calcularTotal(),
      noites: calcularNoites()
    }

    saveCarrinho(carrinho)
    navigate('/carrinho')
  }

  return (
    <div className="suite-page">
      <PrivateHeader />
      
      <div className="suite-container">
        <button 
          className="suite-back-button"
          onClick={() => navigate('/quartos')}
          aria-label="Voltar para página de quartos"
        >
          <FaArrowLeft />
          <span>Voltar</span>
        </button>
        
        <div className="suite-left">
          <div className="suite-image-carousel">
            <div 
              className="suite-carousel-image"
              style={{ backgroundImage: `url(${suiteImages[currentImageIndex]})` }}
            >
              <button 
                className="suite-carousel-button suite-carousel-button-prev"
                onClick={prevImage}
                aria-label="Imagem anterior"
              >
                <FaChevronLeft />
              </button>
              <button 
                className="suite-carousel-button suite-carousel-button-next"
                onClick={nextImage}
                aria-label="Próxima imagem"
              >
                <FaChevronRight />
              </button>
              <div className="suite-carousel-dots">
                {suiteImages.map((_, index) => (
                  <button
                    key={index}
                    className={`suite-carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Descrição - Desktop */}
          <div className="suite-description suite-description-desktop">
            <div className="suite-description-logo">
              <img src="/icones/logo boa.png" className="suite-description-logo-icon" alt="Pousada Mi Casa Sua Casa Logo" />
            </div>
            <h2 className="suite-title">{suiteData.nome}</h2>
            <p className="suite-text">{suiteData.descricao}</p>
          </div>

          {/* Descrição - Mobile */}
          <div className="suite-description suite-description-mobile">
            <div className="suite-description-logo">
              <img src="/icones/logo boa.png" className="suite-description-logo-icon" alt="Pousada Mi Casa Sua Casa Logo" />
            </div>
            <h2 className="suite-title">{suiteData.nome}</h2>
            <p className="suite-text">{suiteData.descricao}</p>
          </div>

          {/* Comodidades - Desktop */}
          <div className="suite-amenities suite-amenities-desktop">
            {comodidades.map((comodidade, index) => (
              <div key={index} className="amenity-item">
                <span className="amenity-icon">{getAmenityIcon(comodidade)}</span>
                <span>{comodidade}</span>
              </div>
            ))}
          </div>

          {/* Comodidades - Mobile */}
          <div className="suite-amenities suite-amenities-mobile">
            {comodidades.map((comodidade, index) => (
              <div key={index} className="amenity-item">
                <span className="amenity-icon">{getAmenityIcon(comodidade)}</span>
                <span>{comodidade}</span>
              </div>
            ))}
          </div>

          {/* Cards de Informações - Desktop */}
          <div className="suite-info-cards suite-info-cards-desktop">
            <div className="suite-info-card">
              <div className="suite-info-icon">
                <FaUsers />
              </div>
              <div className="suite-info-label">Capacidade</div>
              <div className="suite-info-value">Até {capacidade} {capacidade === 1 ? 'pessoa' : 'pessoas'}</div>
            </div>
            <div className="suite-info-card">
              <div className="suite-info-icon">
                <FaRulerCombined />
              </div>
              <div className="suite-info-label">Tamanho</div>
              <div className="suite-info-value">{tamanho}</div>
            </div>
            {suiteData.preco > 0 && (
              <div className="suite-info-card">
                <div className="suite-info-icon">
                  <FaDollarSign />
                </div>
                <div className="suite-info-label">Valor da Diária</div>
                <div className="suite-info-value">R$ {formatarMoeda(suiteData.preco)}/noite</div>
              </div>
            )}
          </div>

          {/* Cards de Informações - Mobile */}
          <div className="suite-info-cards suite-info-cards-mobile">
            <div className="suite-info-card">
              <div className="suite-info-icon">
                <FaUsers />
              </div>
              <div className="suite-info-label">Capacidade</div>
              <div className="suite-info-value">Até {capacidade} {capacidade === 1 ? 'pessoa' : 'pessoas'}</div>
            </div>
            <div className="suite-info-card">
              <div className="suite-info-icon">
                <FaRulerCombined />
              </div>
              <div className="suite-info-label">Tamanho</div>
              <div className="suite-info-value">{tamanho}</div>
            </div>
            {suiteData.preco > 0 && (
              <div className="suite-info-card">
                <div className="suite-info-icon">
                  <FaDollarSign />
                </div>
                <div className="suite-info-label">Valor da Diária</div>
                <div className="suite-info-value">R$ {formatarMoeda(suiteData.preco)}/noite</div>
              </div>
            )}
          </div>

          <div className="suite-rules-policies">
            <h4 className="suite-rules-title">Regras e Políticas</h4>
            <p className="suite-rules-details">Check-in: 14h | Check-out: 12h | Aceita pets | Estacionamento gratuito</p>
          </div>

          {!showBookingForm && (
            <button 
              className="suite-initial-reserve-button"
              onClick={() => setShowBookingForm(true)}
            >
              Fazer reserva
            </button>
          )}
        </div>

        {showBookingForm && (
          <>
          {/* Formulário de Reserva - Desktop */}
          <div className="suite-booking-below suite-booking-below-desktop">
          <div className="suite-booking suite-booking-desktop">
            <div className="suite-booking-logo">
              <img src="/icones/logo boa.png" className="suite-booking-logo-icon" alt="Pousada Mi Casa Sua Casa Logo" />
            </div>
            <h3 className="suite-booking-title">{suiteData.nome}</h3>
            
            <div className="suite-booking-info">
              <div className="booking-info-item">
                <label>Horário de check-in</label>
                <p>check-in a partir das 13:00</p>
                <p>check-out ate as 10:00</p>
              </div>
              <div className="booking-info-item">
                <label>Capacidade de pessoas</label>
                <p>Máximo {capacidade} {capacidade === 1 ? 'pessoa' : 'pessoas'}</p>
              </div>
              {suiteData.preco > 0 && (
                <div className="booking-info-item">
                  <label>Valor da diaria</label>
                  <p className="booking-price">R$ {formatarMoeda(suiteData.preco)} / Noite</p>
                </div>
              )}
            </div>

            <form className="suite-form" onSubmit={handleSubmit}>
              <div className="form-dates">
                <div className="form-date-group">
                  <label>Check-in</label>
                  <input
                    type="text"
                    value={formData.checkIn ? format(formData.checkIn, 'dd/MM/yyyy') : ''}
                    onClick={() => setShowCalendar({ checkIn: true, checkOut: false })}
                    readOnly
                    placeholder="Selecione a data"
                  />
                  {showCalendar.checkIn && (
                    <div className="calendar-popup">
                      <Calendar
                        quartoId={suiteData.id}
                        checkIn={formData.checkIn}
                        checkOut={formData.checkOut}
                        onDateSelect={handleDateSelect}
                        selectingCheckIn={true}
                      />
                    </div>
                  )}
                </div>
                <div className="form-date-group">
                  <label>Check-out</label>
                  <input
                    type="text"
                    value={formData.checkOut ? format(formData.checkOut, 'dd/MM/yyyy') : ''}
                    onClick={() => setShowCalendar({ checkIn: false, checkOut: true })}
                    readOnly
                    placeholder="Selecione a data"
                  />
                  {showCalendar.checkOut && (
                    <div className="calendar-popup">
                      <Calendar
                        quartoId={suiteData.id}
                        checkIn={formData.checkIn}
                        checkOut={formData.checkOut}
                        onDateSelect={handleDateSelect}
                        selectingCheckIn={false}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nome completo*</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Telefone*</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>E-mail*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Pessoas*</label>
                  <input
                    type="number"
                    name="pessoas"
                    value={formData.pessoas}
                    onChange={handleChange}
                    min="1"
                    max={capacidade}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>nome da suite</label>
                <input
                  type="text"
                  value={suiteData.nome}
                  readOnly
                />
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  name="temCriancas"
                  checked={formData.temCriancas}
                  onChange={handleCriancasChange}
                />
                <label>Há crianças?</label>
              </div>

              {formData.temCriancas && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Quantas*</label>
                      <input
                        type="number"
                        value={formData.quantidadeCriancas}
                        onChange={handleQuantidadeCriancas}
                        min="1"
                        max="4"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Idades*</label>
                      <select
                        value={formData.idades[0] || 0}
                        onChange={(e) => handleIdadeChange(0, e.target.value)}
                        required
                      >
                        {Array.from({ length: 17 }, (_, i) => i + 1).map(idade => (
                          <option key={idade} value={idade}>{idade} anos</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {formData.quantidadeCriancas > 1 && (
                    <div className="form-group">
                      <label>Idades das outras crianças*</label>
                      {Array.from({ length: formData.quantidadeCriancas - 1 }, (_, i) => (
                        <select
                          key={i}
                          value={formData.idades[i + 1] || 0}
                          onChange={(e) => handleIdadeChange(i + 1, e.target.value)}
                          required
                          style={{ marginBottom: '10px' }}
                        >
                          {Array.from({ length: 17 }, (_, j) => j + 1).map(idade => (
                            <option key={idade} value={idade}>{idade} anos</option>
                          ))}
                        </select>
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className="form-row">
                {suiteData.preco > 0 && (
                  <div className="form-group">
                    <label>R$ {formatarMoeda(suiteData.preco)} / Noite</label>
                  </div>
                )}
                <div className="form-group">
                  <label>Total de Noite</label>
                  <input
                    type="text"
                    value={calcularNoites()}
                    readOnly
                  />
                </div>
              </div>

              {suiteData.preco > 0 && (
                <div className="form-total">
                  <label>Total / R$ {formatarMoeda(calcularTotal())}</label>
                </div>
              )}

              <button type="submit" className="form-submit-button">
                Fazer reserva
              </button>
            </form>
          </div>
        </div>

        {/* Formulário de Reserva - Mobile */}
        <div className="suite-booking-below suite-booking-below-mobile">
          <div className="suite-booking suite-booking-mobile">
            <div className="suite-booking-logo">
              <img src="/icones/logo boa.png" className="suite-booking-logo-icon" alt="Pousada Mi Casa Sua Casa Logo" />
            </div>
            <h3 className="suite-booking-title">{suiteData.nome}</h3>
            
            <div className="suite-booking-info suite-booking-info-mobile">
              <div className="booking-info-item">
                <label>Horário de check-in</label>
                <p>check-in a partir das 13:00</p>
                <p>check-out ate as 10:00</p>
              </div>
              <div className="booking-info-item">
                <label>Capacidade de pessoas</label>
                <p>Máximo {capacidade} {capacidade === 1 ? 'pessoa' : 'pessoas'}</p>
              </div>
              {suiteData.preco > 0 && (
                <div className="booking-info-item">
                  <label>Valor da diaria</label>
                  <p className="booking-price">R$ {formatarMoeda(suiteData.preco)} / Noite</p>
                </div>
              )}
            </div>

            <form className="suite-form suite-form-mobile" onSubmit={handleSubmit}>
              <div className="form-dates form-dates-mobile">
                <div className="form-date-group">
                  <label>Check-in</label>
                  <input
                    type="text"
                    value={formData.checkIn ? format(formData.checkIn, 'dd/MM/yyyy') : ''}
                    onClick={() => setShowCalendar({ checkIn: true, checkOut: false })}
                    readOnly
                    placeholder="Selecione a data"
                  />
                  {showCalendar.checkIn && (
                    <div className="calendar-popup">
                      <Calendar
                        quartoId={suiteData.id}
                        checkIn={formData.checkIn}
                        checkOut={formData.checkOut}
                        onDateSelect={handleDateSelect}
                        selectingCheckIn={true}
                      />
                    </div>
                  )}
                </div>
                <div className="form-date-group">
                  <label>Check-out</label>
                  <input
                    type="text"
                    value={formData.checkOut ? format(formData.checkOut, 'dd/MM/yyyy') : ''}
                    onClick={() => setShowCalendar({ checkIn: false, checkOut: true })}
                    readOnly
                    placeholder="Selecione a data"
                  />
                  {showCalendar.checkOut && (
                    <div className="calendar-popup">
                      <Calendar
                        quartoId={suiteData.id}
                        checkIn={formData.checkIn}
                        checkOut={formData.checkOut}
                        onDateSelect={handleDateSelect}
                        selectingCheckIn={false}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row form-row-mobile">
                <div className="form-group">
                  <label>Nome completo*</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Telefone*</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row form-row-mobile">
                <div className="form-group">
                  <label>E-mail*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Pessoas*</label>
                  <input
                    type="number"
                    name="pessoas"
                    value={formData.pessoas}
                    onChange={handleChange}
                    min="1"
                    max={capacidade}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>nome da suite</label>
                <input
                  type="text"
                  value={suiteData.nome}
                  readOnly
                />
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  name="temCriancas"
                  checked={formData.temCriancas}
                  onChange={handleCriancasChange}
                />
                <label>Há crianças?</label>
              </div>

              {formData.temCriancas && (
                <>
                  <div className="form-row form-row-mobile">
                    <div className="form-group">
                      <label>Quantas*</label>
                      <input
                        type="number"
                        value={formData.quantidadeCriancas}
                        onChange={handleQuantidadeCriancas}
                        min="1"
                        max="4"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Idades*</label>
                      <select
                        value={formData.idades[0] || 0}
                        onChange={(e) => handleIdadeChange(0, e.target.value)}
                        required
                      >
                        {Array.from({ length: 17 }, (_, i) => i + 1).map(idade => (
                          <option key={idade} value={idade}>{idade} anos</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {formData.quantidadeCriancas > 1 && (
                    <div className="form-group">
                      <label>Idades das outras crianças*</label>
                      {Array.from({ length: formData.quantidadeCriancas - 1 }, (_, i) => (
                        <select
                          key={i}
                          value={formData.idades[i + 1] || 0}
                          onChange={(e) => handleIdadeChange(i + 1, e.target.value)}
                          required
                          style={{ marginBottom: '10px' }}
                        >
                          {Array.from({ length: 17 }, (_, j) => j + 1).map(idade => (
                            <option key={idade} value={idade}>{idade} anos</option>
                          ))}
                        </select>
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className="form-row form-row-mobile">
                {suiteData.preco > 0 && (
                  <div className="form-group">
                    <label>R$ {formatarMoeda(suiteData.preco)} / Noite</label>
                  </div>
                )}
                <div className="form-group">
                  <label>Total de Noite</label>
                  <input
                    type="text"
                    value={calcularNoites()}
                    readOnly
                  />
                </div>
              </div>

              {suiteData.preco > 0 && (
                <div className="form-total">
                  <label>Total / R$ {formatarMoeda(calcularTotal())}</label>
                </div>
              )}

              <button type="submit" className="form-submit-button form-submit-button-mobile">
                Fazer reserva
              </button>
            </form>
          </div>
        </div>
        </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default SuiteBase

