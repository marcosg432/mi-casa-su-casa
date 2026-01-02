import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
          <h1>Erro ao carregar a página</h1>
          <p>Por favor, recarregue a página</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}
          >
            Recarregar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

