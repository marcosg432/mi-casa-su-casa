import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import './Contato.css'

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Mensagem enviada com sucesso!')
    setFormData({ nome: '', email: '', telefone: '', mensagem: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="contato-page">
      <section className="contato-hero">
        <div className="contato-hero-background"></div>
        <Header />
        <div className="contato-hero-content">
          <h1 className="contato-hero-title">Contato</h1>
        </div>
      </section>

      <ScrollReveal>
        <section className="contato-content">
          <div className="contato-container">
          <form className="contato-form" onSubmit={handleSubmit}>
            <div className="contato-form-left">
              <div className="contato-form-group">
                <label>Nome completo*</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contato-form-group">
                <label>E-mail*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contato-form-group">
                <label>Telefone*</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contato-form-group">
                <label>Mensagem*</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>
            </div>
            <div className="contato-form-right">
              <div className="contato-logo">
                <img src="/icones/logo boa.png" className="contato-logo-icon" alt="Pousada Mi Casa Sua Casa Logo" />
              </div>
              <button type="submit" className="contato-submit-button">
                Enviar
              </button>
            </div>
          </form>

          <div className="contato-map">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Rua+Nações+Unidas,+111,+Benevides,+Pará"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', position: 'relative' }}
            >
              <iframe
                src="https://www.google.com/maps?q=Rua+Nações+Unidas,+111,+Benevides,+Pará&output=embed"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '15px', pointerEvents: 'none' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                zIndex: 1
              }}></div>
            </a>
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Contato

