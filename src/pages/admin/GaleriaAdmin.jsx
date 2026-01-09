import { useState, useEffect, useRef } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { getGaleriaImagens, addGaleriaImagem, deleteGaleriaImagem } from '../../utils/storage'
import AdminHeader from '../../components/AdminHeader'
import './GaleriaAdmin.css'

const GaleriaAdmin = () => {
  const [imagens, setImagens] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [novaImagemSrc, setNovaImagemSrc] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    loadImagens()
  }, [])

  const loadImagens = () => {
    const todasImagens = getGaleriaImagens()
    setImagens(todasImagens)
  }

  const handleAddImage = (e) => {
    e.preventDefault()
    if (novaImagemSrc.trim()) {
      addGaleriaImagem(novaImagemSrc.trim())
      setNovaImagemSrc('')
      setShowAddForm(false)
      loadImagens()
    }
  }

  const handleDeleteImage = (id) => {
    if (window.confirm('Deseja realmente excluir esta imagem da galeria?')) {
      deleteGaleriaImagem(id)
      loadImagens()
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Para arquivos locais, criar URL temporária
      // Em produção, você precisaria fazer upload para um servidor
      const reader = new FileReader()
      reader.onload = (event) => {
        // Usar a URL base64 ou fazer upload para servidor
        // Por enquanto, vamos usar o caminho relativo se for uma imagem da pasta public
        const fileName = file.name
        // Assumindo que as imagens serão colocadas na pasta /imagem/
        const imagePath = `/imagem/${fileName}`
        setNovaImagemSrc(imagePath)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="galeria-admin-page">
      <AdminHeader currentPage="galeria" />
      <div className="galeria-admin-container">
        <div className="galeria-admin-header">
          <h1 className="galeria-admin-title">Gerenciar Galeria</h1>
          <button 
            className="galeria-admin-add-button"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <FaPlus /> Adicionar Foto
          </button>
        </div>

        {showAddForm && (
          <form className="galeria-admin-form" onSubmit={handleAddImage}>
            <div className="galeria-admin-form-group">
              <label>Caminho da Imagem (URL ou caminho relativo)</label>
              <input
                type="text"
                value={novaImagemSrc}
                onChange={(e) => setNovaImagemSrc(e.target.value)}
                placeholder="/imagem/nova-foto.jpg"
                required
              />
              <small>Exemplo: /imagem/minha-foto.jpg</small>
            </div>
            <div className="galeria-admin-form-actions">
              <button type="submit" className="galeria-admin-submit">Adicionar</button>
              <button 
                type="button" 
                onClick={() => {
                  setShowAddForm(false)
                  setNovaImagemSrc('')
                }}
                className="galeria-admin-cancel"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="galeria-admin-grid">
          {imagens.length === 0 ? (
            <p className="galeria-admin-empty">Nenhuma imagem na galeria</p>
          ) : (
            imagens.map((imagem) => (
              <div key={imagem.id} className="galeria-admin-item">
                <div className="galeria-admin-item-image">
                  <img src={imagem.src} alt={`Imagem ${imagem.number || imagem.id}`} />
                </div>
                <div className="galeria-admin-item-info">
                  <p className="galeria-admin-item-path">{imagem.src}</p>
                </div>
                <button
                  className="galeria-admin-delete-button"
                  onClick={() => handleDeleteImage(imagem.id)}
                  title="Excluir imagem"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default GaleriaAdmin


