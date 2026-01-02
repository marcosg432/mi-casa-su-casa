import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUsuarioLogado } from '../../utils/storage'
import PixelCursorTrail from '../../components/PixelCursorTrail'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    // Credenciais fixas
    const CORRECT_EMAIL = 'micasasucasaben@gmail.com'
    const CORRECT_PASSWORD = 'mi casa su casa'

    // Validar credenciais
    if (formData.email !== CORRECT_EMAIL || formData.senha !== CORRECT_PASSWORD) {
      setError('Email ou senha incorretos')
      return
    }

    // Se credenciais corretas, fazer login
    setUsuarioLogado({ email: formData.email })
    navigate('/admin')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="login-page">
      <PixelCursorTrail />
      <div className="login-logo-corner">
        <img src="/icones/logo boa.png" className="login-logo-corner-icon" alt="Pousada Mi Casa Sua Casa Logo" />
      </div>
      <div className="login-container">
        <div className="login-logo">
          <div className="login-logo-icon"></div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-form-group">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>
          {error && (
            <div className="login-error" style={{ color: '#f44336', marginBottom: '15px', textAlign: 'center', fontSize: '14px' }}>
              {error}
            </div>
          )}
          <div className="login-info">
            <p>Este sistema funcional possui login e senha reais, disponíveis apenas para pessoas autorizadas.</p>
          </div>
          <button type="submit" className="login-button">
            Fazer login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login


