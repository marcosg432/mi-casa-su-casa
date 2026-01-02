// Utilitário para gerenciar URLs da API em desenvolvimento e produção

const getApiUrl = () => {
  // Em desenvolvimento, usar o proxy do Vite
  if (import.meta.env.DEV) {
    return '/api'
  }
  
  // Em produção, verificar se há uma variável de ambiente definida
  const envApiUrl = import.meta.env.VITE_API_URL
  
  if (envApiUrl) {
    return envApiUrl
  }
  
  // Se não houver variável de ambiente, tentar detectar automaticamente
  // Se o Next.js estiver rodando na mesma origem mas porta diferente
  const hostname = window.location.hostname
  const protocol = window.location.protocol
  
  // Tentar porta 3000 (padrão do Next.js)
  // Se estiver na Hostinger, pode estar na mesma origem
  if (hostname === 'localhost' || hostname.includes('localhost')) {
    return 'http://localhost:3000/api'
  }
  
  // Em produção, assumir que está na mesma origem
  // Se o Next.js estiver em um subdomínio ou porta diferente, configurar VITE_API_URL
  return '/api'
}

export const API_BASE_URL = getApiUrl()

export const fetchApi = async (endpoint, options = {}) => {
  // Garantir que o endpoint comece com /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${API_BASE_URL}${cleanEndpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }
  
  try {
    const response = await fetch(url, { ...defaultOptions, ...options })
    
    // Se a resposta não for ok, tentar fallback em produção
    if (!response.ok && !import.meta.env.DEV) {
      // Se a URL atual não for relativa, tentar com /api
      if (url.startsWith('http') || !url.startsWith('/api')) {
        const fallbackUrl = `/api${cleanEndpoint}`
        try {
          const fallbackResponse = await fetch(fallbackUrl, { ...defaultOptions, ...options })
          if (fallbackResponse.ok) {
            return fallbackResponse
          }
        } catch (fallbackError) {
          console.warn('Fallback também falhou:', fallbackError)
        }
      }
    }
    
    return response
  } catch (error) {
    // Se falhar e estiver em produção, tentar com a mesma origem
    if (!import.meta.env.DEV) {
      const fallbackUrl = `/api${cleanEndpoint}`
      try {
        return await fetch(fallbackUrl, { ...defaultOptions, ...options })
      } catch (fallbackError) {
        console.error('Erro ao fazer fallback:', fallbackError)
        throw error
      }
    }
    throw error
  }
}

