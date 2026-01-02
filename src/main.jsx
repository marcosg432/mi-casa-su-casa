import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

// Verificar se o root existe antes de renderizar
const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('Root element not found!')
  document.body.innerHTML = '<div style="padding: 50px; text-align: center;"><h1>Erro: Elemento root não encontrado</h1><p>Por favor, verifique o arquivo index.html</p></div>'
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    )
  } catch (error) {
    console.error('Erro ao renderizar aplicação:', error)
    rootElement.innerHTML = `
      <div style="padding: 50px; text-align: center; font-family: Arial;">
        <h1>Erro ao carregar a aplicação</h1>
        <p>${error.message}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 20px; cursor: pointer;">
          Recarregar
        </button>
      </div>
    `
  }
}

