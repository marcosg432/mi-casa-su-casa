import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { getQuartos, getReservasPorQuarto, formatarMoeda } from '../../utils/storage'
import { getQuartoImages } from '../../utils/quartosImages'
import AdminHeader from '../../components/AdminHeader'
import './Quartos.css'

const Quartos = () => {
  const [quartos, setQuartos] = useState([])
  const [selectedQuarto, setSelectedQuarto] = useState(null)

  useEffect(() => {
    const todosQuartos = getQuartos()
    setQuartos(todosQuartos)
  }, [])


  const handleVerFicha = (quarto) => {
    const reservas = getReservasPorQuarto(quarto.id)
    setSelectedQuarto({ ...quarto, reservas })
  }

  return (
    <div className="quartos-admin-page">
      <AdminHeader currentPage="quartos" />
      <div className="quartos-admin-container">
        <h1 className="quartos-admin-title">Quartos</h1>

        {selectedQuarto ? (
          <div className="quarto-ficha">
            <div className="ficha-header">
              <div>
                <h3>Nome da suíte</h3>
                <p>{selectedQuarto.nome}</p>
              </div>
              <div>
                <h3>Total de reservas</h3>
                <input type="text" value={selectedQuarto.reservas.length} readOnly />
              </div>
              <button onClick={() => setSelectedQuarto(null)} className="ficha-close">
                <FaTimes />
              </button>
            </div>
            <div className="quarto-reservas">
              {selectedQuarto.reservas.map(reserva => (
                <div key={reserva.id} className="quarto-reserva-item">
                  <div className="reserva-codigo">{reserva.codigo}</div>
                  <div className="reserva-cliente">
                    <label>Nome do cliente</label>
                    <input type="text" value={reserva.nome || ''} readOnly />
                  </div>
                  <div className="reserva-cliente">
                    <label>E-mail do cliente</label>
                    <input type="text" value={reserva.email || ''} readOnly />
                  </div>
                  <div className="reserva-dates">
                    <span>check-in {new Date(reserva.checkIn).toLocaleDateString('pt-BR')}</span>
                    <span>check-out {new Date(reserva.checkOut).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="quartos-admin-list">
            {quartos.map(quarto => {
              const quartoImages = getQuartoImages(quarto.id)
              const primeiraImagem = quartoImages && quartoImages.length > 0 ? quartoImages[0] : null
              
              return (
                <div key={quarto.id} className="quarto-admin-item">
                  <div className="quarto-admin-image">
                    {primeiraImagem ? (
                      <div 
                        className="quarto-admin-image-placeholder" 
                        style={{ backgroundImage: `url(${primeiraImagem})` }}
                      ></div>
                    ) : (
                      <div className={`quarto-admin-image-placeholder ${quarto.id}`}></div>
                    )}
                  </div>
                  <div className="quarto-admin-info">
                    <h3>{quarto.nome}</h3>
                    <p>{quarto.preco > 0 ? `R$ ${formatarMoeda(quarto.preco)} / Noite` : 'Consultar preço'}</p>
                  </div>
                  <button onClick={() => handleVerFicha(quarto)} className="quarto-admin-button">
                    Ver ficha
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Quartos


