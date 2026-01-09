// Sistema de armazenamento local para simular banco de dados

const STORAGE_KEYS = {
  RESERVAS: 'mi_casa_su_casa_reservas',
  QUARTOS: 'mi_casa_su_casa_quartos',
  DESPESAS: 'mi_casa_su_casa_despesas',
  FUNCIONARIOS: 'mi_casa_su_casa_funcionarios',
  USUARIO_LOGADO: 'mi_casa_su_casa_usuario_logado',
  CARRINHO: 'mi_casa_su_casa_carrinho',
  META_OCUPACAO: 'mi_casa_su_casa_meta_ocupacao',
  GALERIA: 'mi_casa_su_casa_galeria'
}

// Função para verificar e atualizar reservas concluídas automaticamente
const atualizarReservasConcluidas = () => {
  const reservas = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESERVAS) || '[]')
  const agora = new Date()
  const horaCheckout = 10 // 10:00
  
  const reservasAtualizadas = reservas.map(reserva => {
    if (reserva.status === 'pendente' && reserva.checkOut) {
      const checkOut = new Date(reserva.checkOut)
      checkOut.setHours(horaCheckout, 0, 0, 0)
      
      if (agora >= checkOut) {
        return { ...reserva, status: 'concluida' }
      }
    }
    return reserva
  })
  
  localStorage.setItem(STORAGE_KEYS.RESERVAS, JSON.stringify(reservasAtualizadas))
}

export const getReservas = () => {
  atualizarReservasConcluidas()
  const data = localStorage.getItem(STORAGE_KEYS.RESERVAS)
  return data ? JSON.parse(data) : []
}

export const saveReserva = (reserva) => {
  const reservas = getReservas()
  const novaReserva = {
    ...reserva,
    id: Date.now().toString(),
    codigo: `BR${Date.now()}`,
    status: 'pendente',
    dataReserva: new Date().toISOString()
  }
  reservas.push(novaReserva)
  localStorage.setItem(STORAGE_KEYS.RESERVAS, JSON.stringify(reservas))
  return novaReserva
}

export const updateReserva = (id, updates) => {
  const reservas = getReservas()
  const index = reservas.findIndex(r => r.id === id)
  if (index !== -1) {
    reservas[index] = { ...reservas[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.RESERVAS, JSON.stringify(reservas))
    return reservas[index]
  }
  return null
}

export const deleteReserva = (id) => {
  const reservas = getReservas()
  const filtered = reservas.filter(r => r.id !== id)
  localStorage.setItem(STORAGE_KEYS.RESERVAS, JSON.stringify(filtered))
}

export const getQuartos = () => {
  const data = localStorage.getItem(STORAGE_KEYS.QUARTOS)
  if (data) {
    const quartos = JSON.parse(data)
    // Se os quartos antigos ainda estão lá (com IDs antigos), retornar os novos
    const idsAntigos = ['imperial', 'luxo', 'premium', 'exclusiva']
    if (quartos.length > 0 && idsAntigos.includes(quartos[0].id)) {
      // Limpar dados antigos e usar os novos
      localStorage.removeItem(STORAGE_KEYS.QUARTOS)
    } else {
      // Verificar se os nomes precisam ser atualizados
      const nomesCorretos = {
        'quarto1': { nome: 'Tem-tem', nomeCompleto: 'Quarto Duplo com Banheiro Compartilhado' },
        'quarto2': { nome: 'Soco', nomeCompleto: 'Quarto Família (4 Camas de Solteiro)' },
        'quarto3': { nome: 'Sabia', nomeCompleto: 'Quarto Família (1 Cama de Casal + 3 de Solteiro)' },
        'quarto4': { nome: 'Ararajuba', nomeCompleto: 'Quarto Duplo' }
      }
      
      let precisaAtualizar = false
      const quartosAtualizados = quartos.map(quarto => {
        if (nomesCorretos[quarto.id] && quarto.nome !== nomesCorretos[quarto.id].nome) {
          precisaAtualizar = true
          return {
            ...quarto,
            nome: nomesCorretos[quarto.id].nome,
            nomeCompleto: quarto.nomeCompleto || nomesCorretos[quarto.id].nomeCompleto
          }
        }
        return quarto
      })
      
      if (precisaAtualizar) {
        localStorage.setItem(STORAGE_KEYS.QUARTOS, JSON.stringify(quartosAtualizados))
        return quartosAtualizados
      }
      
      return quartos
    }
  }
  
  // Inicializar quartos padrão
  const quartos = [
    {
      id: 'quarto1',
      nome: 'Tem-tem',
      nomeCompleto: 'Quarto Duplo com Banheiro Compartilhado',
      preco: 150,
      capacidade: 2,
      tamanho: '20 m²',
      camas: '1 cama de casal',
      banheiro: 'Compartilhado (chuveiro)',
      comodidades: [
        'Wi-Fi gratuito',
        'Vista para o jardim',
        'Terraço',
        'Máquina de lavar roupas',
        'Guarda-roupa',
        'Ventilador'
      ],
      descricao: 'Quarto duplo aconchegante, ideal para casais que buscam conforto e tranquilidade. O ambiente conta com cama de casal, vista para o jardim, terraço e acesso a banheiro compartilhado com chuveiro. Uma opção prática e acolhedora para uma estadia relaxante.'
    },
    {
      id: 'quarto2',
      nome: 'Soco',
      nomeCompleto: 'Quarto Família (4 Camas de Solteiro)',
      preco: 150,
      capacidade: 4,
      tamanho: '40 m²',
      camas: '4 camas de solteiro',
      banheiro: 'Compartilhado (chuveiro)',
      comodidades: [
        'Ar-condicionado',
        'Wi-Fi gratuito',
        'Cozinha compacta privativa',
        'Máquina de lavar roupas',
        'Vista para o jardim',
        'Terraço'
      ],
      descricao: 'Espaçoso quarto família, perfeito para grupos ou famílias que desejam mais conforto. O quarto dispõe de quatro camas de solteiro, ar-condicionado, cozinha compacta privativa e vista para o jardim. Conta ainda com terraço e banheiro compartilhado, garantindo praticidade durante toda a estadia.'
    },
    {
      id: 'quarto3',
      nome: 'Sabia',
      nomeCompleto: 'Quarto Família (1 Cama de Casal + 3 de Solteiro)',
      preco: 150,
      capacidade: 5,
      tamanho: '40 m²',
      camas: '1 cama de casal e 3 camas de solteiro',
      banheiro: 'Compartilhado (chuveiro)',
      comodidades: [
        'Ar-condicionado',
        'Wi-Fi gratuito',
        'Cozinha compacta privativa',
        'Máquina de lavar roupas',
        'Vista para o jardim',
        'Terraço'
      ],
      descricao: 'Ideal para famílias maiores ou grupos de amigos, este quarto oferece amplo espaço e conforto. Possui uma cama de casal e três camas de solteiro, ar-condicionado, cozinha compacta privativa e terraço com vista para o jardim. Banheiro compartilhado disponível para maior praticidade.'
    },
    {
      id: 'quarto4',
      nome: 'Ararajuba',
      nomeCompleto: 'Quarto Duplo',
      preco: 150,
      capacidade: 2,
      tamanho: '20 m²',
      camas: '1 cama de casal',
      banheiro: 'Compartilhado (chuveiro)',
      comodidades: [
        'Wi-Fi gratuito',
        'Vista para o jardim',
        'Terraço',
        'Máquina de lavar roupas',
        'Guarda-roupa',
        'Ventilador'
      ],
      descricao: 'Quarto duplo confortável, indicado para casais ou viajantes que buscam um ambiente tranquilo. Conta com cama de casal, vista para o jardim, terraço e acesso a banheiro compartilhado com chuveiro. Uma opção simples e agradável para sua hospedagem.'
    }
  ]
  localStorage.setItem(STORAGE_KEYS.QUARTOS, JSON.stringify(quartos))
  return quartos
}

export const getDespesas = () => {
  const data = localStorage.getItem(STORAGE_KEYS.DESPESAS)
  if (data) return JSON.parse(data)
  
  const despesas = [
    { id: '1', categoria: 'Funcionarios', quantidade: 7, total: 1300.00 },
    { id: '2', categoria: 'Limpeza', quantidade: null, total: 3800.00 },
    { id: '3', categoria: 'Manutenção', quantidade: null, total: 1400.80 },
    { id: '4', categoria: 'Taxas de plataformas', quantidade: null, total: 3800.00 },
    { id: '5', categoria: 'Gasto a parte', quantidade: null, total: 1300.00 },
    { id: '6', categoria: 'Despesas fixa', quantidade: null, total: 3800.00 }
  ]
  localStorage.setItem(STORAGE_KEYS.DESPESAS, JSON.stringify(despesas))
  return despesas
}

export const updateDespesas = (despesas) => {
  localStorage.setItem(STORAGE_KEYS.DESPESAS, JSON.stringify(despesas))
}

export const getFuncionarios = () => {
  const data = localStorage.getItem(STORAGE_KEYS.FUNCIONARIOS)
  return data ? JSON.parse(data) : []
}

export const saveFuncionario = (funcionario) => {
  const funcionarios = getFuncionarios()
  const novo = {
    ...funcionario,
    id: Date.now().toString()
  }
  funcionarios.push(novo)
  localStorage.setItem(STORAGE_KEYS.FUNCIONARIOS, JSON.stringify(funcionarios))
  return novo
}

export const deleteFuncionario = (id) => {
  const funcionarios = getFuncionarios()
  const filtered = funcionarios.filter(f => f.id !== id)
  localStorage.setItem(STORAGE_KEYS.FUNCIONARIOS, JSON.stringify(filtered))
}

export const setUsuarioLogado = (usuario) => {
  localStorage.setItem(STORAGE_KEYS.USUARIO_LOGADO, JSON.stringify(usuario))
}

export const getUsuarioLogado = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USUARIO_LOGADO)
  return data ? JSON.parse(data) : null
}

export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.USUARIO_LOGADO)
}

export const getCarrinho = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CARRINHO)
  return data ? JSON.parse(data) : null
}

export const saveCarrinho = (carrinho) => {
  localStorage.setItem(STORAGE_KEYS.CARRINHO, JSON.stringify(carrinho))
}

export const clearCarrinho = () => {
  localStorage.removeItem(STORAGE_KEYS.CARRINHO)
}

export const getMetaOcupacao = () => {
  const data = localStorage.getItem(STORAGE_KEYS.META_OCUPACAO)
  return data ? parseInt(data) : 100
}

export const setMetaOcupacao = (meta) => {
  localStorage.setItem(STORAGE_KEYS.META_OCUPACAO, meta.toString())
}

// Funções auxiliares para cálculos
export const getReservasPorMes = (mes, ano) => {
  const reservas = getReservas()
  return reservas.filter(r => {
    const dataReserva = new Date(r.dataReserva)
    return dataReserva.getMonth() === mes && dataReserva.getFullYear() === ano
  })
}

export const getReservasPorQuarto = (quartoId) => {
  const reservas = getReservas()
  return reservas.filter(r => r.quartoId === quartoId)
}

export const getReservasPorData = (data) => {
  const reservas = getReservas()
  const dataStr = data.toISOString().split('T')[0]
  return reservas.filter(r => {
    const checkIn = new Date(r.checkIn).toISOString().split('T')[0]
    const checkOut = new Date(r.checkOut).toISOString().split('T')[0]
    return dataStr >= checkIn && dataStr < checkOut
  })
}

export const isDataOcupada = (data, quartoId) => {
  const reservas = getReservas()
  const dataStr = data.toISOString().split('T')[0]
  return reservas.some(r => {
    if (r.quartoId !== quartoId || r.status === 'cancelada') return false
    const checkIn = new Date(r.checkIn).toISOString().split('T')[0]
    const checkOut = new Date(r.checkOut).toISOString().split('T')[0]
    return dataStr >= checkIn && dataStr < checkOut
  })
}

// Função para formatar valores monetários com separador de milhares
export const formatarMoeda = (valor) => {
  if (valor === null || valor === undefined || isNaN(valor)) return '0'
  const valorNumerico = parseFloat(valor)
  
  // Verificar se é um número inteiro (sem decimais significativos)
  const ehInteiro = valorNumerico === Math.floor(valorNumerico)
  
  if (ehInteiro) {
    // É um número inteiro - formatar sem decimais
    const inteiroFormatado = Math.abs(valorNumerico).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return valorNumerico < 0 ? `-${inteiroFormatado}` : inteiroFormatado
  } else {
    // Tem decimais - formatar com 2 casas decimais
    const valorFormatado = Math.abs(valorNumerico).toFixed(2)
    const partes = valorFormatado.split('.')
    const inteiro = partes[0]
    const decimal = partes[1]
    
    // Adicionar ponto como separador de milhares
    const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    const sinal = valorNumerico < 0 ? '-' : ''
    
    return `${sinal}${inteiroFormatado},${decimal}`
  }
}

// Funções para gerenciar imagens da galeria
export const getGaleriaImagens = () => {
  const data = localStorage.getItem(STORAGE_KEYS.GALERIA)
  if (data) {
    return JSON.parse(data)
  }
  
  // Imagens padrão iniciais
  const imagensPadrao = [
    { id: 1, src: '/imagem/essa1.jpg', number: 1 },
    { id: 2, src: '/imagem/essa2.jpg', number: 2 },
    { id: 3, src: '/imagem/essa3.jpg', number: 3 },
    { id: 4, src: '/imagem/essa4.jpg', number: 4 },
    { id: 5, src: '/imagem/essa5.jpg', number: 5 },
    { id: 6, src: '/imagem/essa6.jpg', number: 6 },
    { id: 7, src: '/imagem/essa7.jpg', number: 7 },
    { id: 8, src: '/imagem/essa8.jpg', number: 8 },
    { id: 9, src: '/imagem/essa9.jpg', number: 9 },
    { id: 10, src: '/imagem/essa10.jpg', number: 10 },
    { id: 11, src: '/imagem/essa11.jpg', number: 11 },
    { id: 12, src: '/imagem/essa12.jpg', number: 12 },
    { id: 13, src: '/imagem/essa13.jpg', number: 13 },
    { id: 14, src: '/imagem/essa14.jpg', number: 14 },
    { id: 15, src: '/imagem/vertical/1.jpg', number: 15 },
    { id: 16, src: '/imagem/vertical/3.jpg', number: 16 },
    { id: 18, src: '/imagem/vertical/8.jpg', number: 18 },
    { id: 19, src: '/imagem/vertical/9.jpg', number: 19 },
    { id: 20, src: '/imagem/vertical/10.jpg', number: 20 },
    { id: 21, src: '/imagem/vertical/11.jpg', number: 21 },
    { id: 22, src: '/imagem/vertical/14.jpg', number: 22 },
    { id: 23, src: '/imagem/orizontal/2.jpg', number: 23 },
    { id: 24, src: '/imagem/orizontal/5.jpg', number: 24 },
    { id: 25, src: '/imagem/orizontal/6.jpg', number: 25 },
    { id: 26, src: '/imagem/orizontal/7.jpg', number: 26 },
    { id: 27, src: '/imagem/orizontal/13.jpg', number: 27 },
    { id: 28, src: '/imagem/orizontal/14.jpg', number: 28 },
  ]
  
  localStorage.setItem(STORAGE_KEYS.GALERIA, JSON.stringify(imagensPadrao))
  return imagensPadrao
}

export const addGaleriaImagem = (src) => {
  const imagens = getGaleriaImagens()
  const novaImagem = {
    id: Date.now().toString(),
    src: src,
    number: imagens.length + 1
  }
  imagens.push(novaImagem)
  localStorage.setItem(STORAGE_KEYS.GALERIA, JSON.stringify(imagens))
  return novaImagem
}

export const deleteGaleriaImagem = (id) => {
  const imagens = getGaleriaImagens()
  const imagensFiltradas = imagens.filter(img => img.id !== id)
  localStorage.setItem(STORAGE_KEYS.GALERIA, JSON.stringify(imagensFiltradas))
}

