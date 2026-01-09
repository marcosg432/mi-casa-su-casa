import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { getReservas, getReservasPorMes, getDespesas, getMetaOcupacao, formatarMoeda } from '../../utils/storage'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getMonth, getYear, subMonths, startOfDay, isSameDay } from 'date-fns'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import AdminHeader from '../../components/AdminHeader'
import './Financeiro.css'

ChartJS.register(ArcElement, ChartTooltip, ChartLegend)

const Financeiro = () => {
  const navigate = useNavigate()
  const [reservas, setReservas] = useState([])
  const [mesAtual, setMesAtual] = useState(new Date())
  const [metaOcupacao] = useState(getMetaOcupacao())

  useEffect(() => {
    const todasReservas = getReservas()
    setReservas(todasReservas)
  }, [])

  const mesAnterior = subMonths(mesAtual, 1)
  const reservasMesAtual = getReservasPorMes(getMonth(mesAtual), getYear(mesAtual))
  const reservasMesAnterior = getReservasPorMes(getMonth(mesAnterior), getYear(mesAnterior))

  const reservasConcluidas = reservasMesAtual.filter(r => r.status === 'concluida')
  const reservasCanceladas = reservasMesAtual.filter(r => r.status === 'cancelada')
  const reservasPendentes = reservasMesAtual.filter(r => r.status === 'pendente')
  // Reservas ativas (sem canceladas) - para o card "Total de reservas"
  const reservasAtivas = reservasMesAtual.filter(r => r.status !== 'cancelada')

  // Função auxiliar para calcular o valor de uma reserva (200 reais por noite)
  const calcularValorReserva = (r) => {
    if (r.total && r.total > 0) {
      return r.total
    }
    // Se não tiver total, calcular: 200 reais por noite
    if (r.checkIn && r.checkOut) {
      const checkIn = new Date(r.checkIn)
      const checkOut = new Date(r.checkOut)
      const diffTime = Math.abs(checkOut - checkIn)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays * 200
    }
    // Se não tiver datas, usar 200 reais como padrão (1 noite)
    return 200
  }

  // Calcular faturamento: incluir todas as reservas ativas (pendentes e concluídas)
  // Para o card, mostrar o valor total de todas as reservas do mês
  const faturamentoTotal = reservasAtivas.reduce((sum, r) => sum + calcularValorReserva(r), 0)
  
  // Faturamento de reservas ativas (não canceladas) para cálculos de lucro
  const faturamentoConcluidas = reservasAtivas.reduce((sum, r) => sum + calcularValorReserva(r), 0)
  const despesas = getDespesas()
  
  // Despesas já vêm com valores fixos, não precisa recalcular
  const totalDespesas = despesas.reduce((sum, d) => sum + d.total, 0)
  const lucro = faturamentoConcluidas - totalDespesas

  // Criar dados para mini gráfico baseado nas reservas do mês atual
  // Dividir o mês em 5 pontos e acumular reservas até cada ponto
  const criarDadosMiniGrafico = (reservasMes) => {
    const diasDoMes = eachDayOfInterval({
      start: startOfMonth(mesAtual),
      end: endOfMonth(mesAtual)
    })
    const totalDias = diasDoMes.length
    const pontos = 5
    const intervalo = Math.floor(totalDias / pontos)
    
    return Array.from({ length: pontos }, (_, i) => {
      const diaIndex = i * intervalo
      const diaLimite = diasDoMes[Math.min(diaIndex, totalDias - 1)]
      const diaLimiteNormalizado = startOfDay(diaLimite)
      
      const reservasAteDia = reservasMes.filter(r => {
        if (!r.dataReserva) return false
        const dataReserva = startOfDay(new Date(r.dataReserva))
        return dataReserva <= diaLimiteNormalizado
      })
      
      return reservasAteDia.length
    })
  }

  // Dados para mini gráfico de reservas
  const dadosMiniGraficoReservas = criarDadosMiniGrafico(reservasAtivas)
  const maxReservas = Math.max(...dadosMiniGraficoReservas, 1)
  const dadosNormalizadosReservas = dadosMiniGraficoReservas.map(val => {
    // Normalizar para valores entre 10 e 20 para o gráfico
    return maxReservas > 0 ? 10 + (val / maxReservas) * 10 : 10
  })

  // Dados para mini gráfico de faturamento
  const criarDadosMiniGraficoFaturamento = () => {
    const diasDoMes = eachDayOfInterval({
      start: startOfMonth(mesAtual),
      end: endOfMonth(mesAtual)
    })
    const totalDias = diasDoMes.length
    const pontos = 5
    const intervalo = Math.floor(totalDias / pontos)
    
    return Array.from({ length: pontos }, (_, i) => {
      const diaIndex = i * intervalo
      const diaLimite = diasDoMes[Math.min(diaIndex, totalDias - 1)]
      const diaLimiteNormalizado = startOfDay(diaLimite)
      
      const reservasAteDia = reservasMesAtual.filter(r => {
        if (r.status === 'cancelada') return false
        if (!r.dataReserva) return false
        const dataReserva = startOfDay(new Date(r.dataReserva))
        return dataReserva <= diaLimiteNormalizado
      })
      const faturamentoAteDia = reservasAteDia.reduce((sum, r) => sum + calcularValorReserva(r), 0)
      
      return faturamentoAteDia
    })
  }

  const dadosMiniGraficoFaturamento = criarDadosMiniGraficoFaturamento()
  const maxFaturamento = Math.max(...dadosMiniGraficoFaturamento, 1)
  const dadosNormalizadosFaturamento = dadosMiniGraficoFaturamento.map(val => {
    // Normalizar para valores entre 10 e 20 para o gráfico
    return maxFaturamento > 0 ? 10 + (val / maxFaturamento) * 10 : 10
  })

  const reservasAtivasAnterior = reservasMesAnterior.filter(r => r.status !== 'cancelada')
  const comparacaoReservas = reservasAtivasAnterior.length > 0
    ? ((reservasAtivas.length - reservasAtivasAnterior.length) / reservasAtivasAnterior.length) * 100
    : (reservasAtivas.length > 0 ? 100 : 0) // Se não tem mês anterior mas tem reservas, mostra 100%

  const reservasAtivasMesAnterior = reservasMesAnterior.filter(r => r.status !== 'cancelada')
  const faturamentoMesAnterior = reservasAtivasMesAnterior.reduce((sum, r) => sum + calcularValorReserva(r), 0)
  
  const comparacaoFaturamento = faturamentoMesAnterior > 0
    ? ((faturamentoTotal - faturamentoMesAnterior) / faturamentoMesAnterior) * 100
    : (faturamentoTotal > 0 ? 100 : 0) // Se não tem mês anterior mas tem faturamento, mostra 100%

  // Gráfico diário
  const diasDoMes = eachDayOfInterval({
    start: startOfMonth(mesAtual),
    end: endOfMonth(mesAtual)
  })

  const dadosDiarios = diasDoMes.map(dia => {
    const diaNormalizado = startOfDay(dia)
    const reservasDoDia = reservas.filter(r => {
      if (r.status === 'cancelada') return false
      if (!r.dataReserva) return false
      const dataReserva = startOfDay(new Date(r.dataReserva))
      return isSameDay(dataReserva, diaNormalizado)
    })
    const faturamentoDia = reservasDoDia.reduce((sum, r) => sum + calcularValorReserva(r), 0)
    return {
      dia: format(dia, 'd'),
      reservas: reservasDoDia.length,
      faturamento: faturamentoDia
    }
  })

  // Verificar se há reservas com valores maiores que zero
  const temReservasNoGrafico = dadosDiarios.some(d => d.reservas > 0)

  // Dados para gráficos circulares (excluindo reservas canceladas)
  const origemReservas = reservasAtivas.reduce((acc, r) => {
    const origem = r.origem || 'Site / whatsapp'
    acc[origem] = (acc[origem] || 0) + 1
    return acc
  }, {})

  // Usar valores reais das reservas
  const totalOrigem = (origemReservas['Booking'] || 0) + (origemReservas['Airbnb'] || 0) + (origemReservas['Site / whatsapp'] || 0)
  const temOrigem = totalOrigem > 0
  
  // Se não houver reservas de origem, usar valor mínimo para mostrar gráfico cinza
  const dadosOrigemArray = temOrigem
    ? [origemReservas['Booking'] || 0, origemReservas['Airbnb'] || 0, origemReservas['Site / whatsapp'] || 0]
    : [1, 0, 0] // Valor mínimo para renderizar gráfico
  
  // Porcentagens para origem de reservas (baseadas nos dados reais)
  const porcentagemBooking = temOrigem ? ((origemReservas['Booking'] || 0) / totalOrigem * 100).toFixed(1).replace('.', ',') : '0,0'
  const porcentagemAirbnb = temOrigem ? ((origemReservas['Airbnb'] || 0) / totalOrigem * 100).toFixed(1).replace('.', ',') : '0,0'
  const porcentagemSite = temOrigem ? ((origemReservas['Site / whatsapp'] || 0) / totalOrigem * 100).toFixed(1).replace('.', ',') : '0,0'
  
  // Cores para gráfico de origem (cinza se não houver dados)
  const coresOrigem = temOrigem ? ['#2196f3', '#ff2aa1', '#00ff00'] : ['#9e9e9e', '#9e9e9e', '#9e9e9e']

  const dadosOrigem = [
    { name: 'Site / whatsapp', value: origemReservas['Site / whatsapp'] || 0 },
    { name: 'Booking', value: origemReservas['Booking'] || 0 },
    { name: 'Airbnb', value: origemReservas['Airbnb'] || 0 }
  ]

  const totalReservas = reservasCanceladas.length + reservasConcluidas.length
  // Se não houver reservas, usar valor mínimo para mostrar gráfico cinza
  const temReservas = totalReservas > 0
  const dadosReservasArray = temReservas 
    ? [reservasCanceladas.length, reservasConcluidas.length]
    : [1, 0] // Valor mínimo para renderizar gráfico
  
  // Porcentagens para reservas (baseadas nos dados reais)
  const porcentagemCanceladas = temReservas ? ((reservasCanceladas.length / totalReservas) * 100).toFixed(1).replace('.', ',') : '0,0'
  const porcentagemConcluidas = temReservas ? ((reservasConcluidas.length / totalReservas) * 100).toFixed(1).replace('.', ',') : '0,0'
  
  // Cores para gráfico de reservas (cinza se não houver dados)
  const coresReservas = temReservas ? ['#ff2a2a', '#00ff00'] : ['#9e9e9e', '#9e9e9e']

  const dadosStatus = [
    { name: 'Comcluidas', value: reservasConcluidas.length },
    { name: 'Cancelada', value: reservasCanceladas.length }
  ]

  const dadosFaturamento = [
    { name: 'Faturamento', value: faturamentoTotal },
    { name: 'Lucro', value: lucro }
  ]

  const ocupacaoRealizada = reservasConcluidas.length
  const ocupacaoRestante = Math.max(0, metaOcupacao - ocupacaoRealizada)
  const totalOcupacao = ocupacaoRealizada + ocupacaoRestante
  const temOcupacao = totalOcupacao > 0
  
  // Se não houver ocupação, usar valor mínimo para mostrar gráfico cinza
  const dadosOcupacaoArray = temOcupacao 
    ? [ocupacaoRealizada, ocupacaoRestante]
    : [1, 0] // Valor mínimo para renderizar gráfico
  
  // Porcentagens para faturamento (baseadas nos dados reais)
  // O gráfico mostra faturamento total (igual ao card) e lucro
  // Usar faturamentoTotal para manter consistência com o card
  const temFaturamento = faturamentoTotal > 0
  
  // Para o gráfico de donut, mostrar faturamento total e lucro
  // Lucro = Faturamento - Despesas
  // Se não houver despesas (totalDespesas = 0), lucro = 0
  const valorFaturamentoGrafico = Math.max(0, faturamentoTotal)
  // Lucro baseado no faturamento total menos despesas
  // Se não há despesas, lucro = 0
  const lucroGrafico = totalDespesas > 0 ? Math.max(0, faturamentoTotal - totalDespesas) : 0
  // Parte do faturamento que não é lucro (faturamento total quando lucro = 0)
  const parteNaoLucro = valorFaturamentoGrafico - lucroGrafico
  
  // Se não houver faturamento, mostrar gráfico completamente cinza (100% cinza)
  // Quando há faturamento, mostrar parte não lucro (verde) e lucro (verde)
  // Se lucro = 0, mostrar apenas faturamento (100% verde)
  const dadosFaturamentoGrafico = temFaturamento 
    ? lucroGrafico > 0 
      ? [parteNaoLucro, lucroGrafico] // Mostrar parte não lucro (verde) e lucro (verde)
      : [valorFaturamentoGrafico, 0] // Sem lucro, mostrar apenas faturamento (100% verde)
    : [1, 0] // Sem faturamento, mostrar 100% cinza (mas porcentagem será 0%)
  
  const totalGrafico = dadosFaturamentoGrafico[0] + dadosFaturamentoGrafico[1]
  
  // Calcular porcentagens: lucro como parte do faturamento total
  const porcentagemLucro = temFaturamento && lucroGrafico > 0
    ? ((lucroGrafico / valorFaturamentoGrafico) * 100).toFixed(1).replace('.', ',')
    : '0,0'
  
  // Porcentagem do faturamento (sempre 100% quando há faturamento, 0% quando não há)
  const porcentagemFaturamento = temFaturamento ? '100,0' : '0,0'
  
  // Cores para gráfico de faturamento: faturamento (verde) e lucro (verde)
  // Se não houver dados, usar cinza
  // Se lucro = 0, mostrar apenas verde
  const coresFaturamento = temFaturamento 
    ? lucroGrafico > 0 
      ? ['#4caf50', '#00ff00'] // Faturamento (verde) e Lucro (verde)
      : ['#4caf50', '#4caf50'] // Apenas faturamento (verde) quando lucro = 0
    : ['#9e9e9e', '#9e9e9e']
  
  // Porcentagens para ocupação (baseadas nos dados reais)
  const porcentagemOcupacao = temOcupacao ? ((ocupacaoRealizada / totalOcupacao) * 100).toFixed(1).replace('.', ',') : '0,0'
  const porcentagemFalta = temOcupacao ? ((ocupacaoRestante / totalOcupacao) * 100).toFixed(1).replace('.', ',') : '0,0'
  
  // Cores para gráfico de ocupação (cinza se não houver dados)
  const coresOcupacao = temOcupacao ? ['#00ff00', '#4caf50'] : ['#9e9e9e', '#9e9e9e']

  const dadosOcupacao = [
    { name: 'Ocupação', value: ocupacaoRealizada },
    { name: 'Falta', value: ocupacaoRestante }
  ]

  const COLORS = {
    green: '#4caf50',
    blue: '#4caf50',
    red: '#f44336',
    pink: '#e91e63',
    gray: '#9e9e9e'
  }

  return (
    <div className="financeiro-page">
      <AdminHeader currentPage="financeiro" />
      <div className="financeiro-container">
        <h1 className="financeiro-title">Financeiro</h1>

        <div className="financeiro-cards">
          <div className="financeiro-card">
            <h3>Total de reservas</h3>
            <p className="card-value">{reservasAtivas.length} reservas</p>
            <div className="card-trend-container">
              <div className="card-mini-chart">
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={dadosNormalizadosReservas.map(val => ({ value: val }))} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={reservasAtivas.length > 0 ? "#4caf50" : "#9e9e9e"} 
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="card-trend">
                <span className={reservasAtivas.length === 0 ? 'trend-empty' : (comparacaoReservas >= 0 ? 'trend-up' : 'trend-down')}>
                  {comparacaoReservas === 0 && reservasAtivas.length === 0 ? '0,0' : Math.abs(comparacaoReservas).toFixed(1).replace('.', ',')}% {reservasAtivas.length > 0 && (comparacaoReservas >= 0 ? <FaArrowUp /> : <FaArrowDown />)}
                </span>
              </div>
            </div>
          </div>

          <div className="financeiro-card">
            <h3>Canceladas</h3>
            <p className="card-value">{reservasCanceladas.length} cancelamento</p>
          </div>

          <div className="financeiro-card">
            <h3>Total de reservas concluídas</h3>
            <p className="card-value">{reservasConcluidas.length} reservas concluídas</p>
          </div>

          <div className="financeiro-card">
            <h3>Faturamento total</h3>
            <p className="card-value">{formatarMoeda(faturamentoTotal)} Faturamento</p>
            <div className="card-trend-container">
              <div className="card-mini-chart">
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={dadosNormalizadosFaturamento.map(val => ({ value: val }))} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={faturamentoTotal > 0 ? "#4caf50" : "#9e9e9e"} 
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="card-trend">
                <span className={faturamentoTotal === 0 ? 'trend-empty' : (comparacaoFaturamento >= 0 ? 'trend-up' : 'trend-down')}>
                  {comparacaoFaturamento === 0 && faturamentoTotal === 0 ? '0,0' : Math.abs(comparacaoFaturamento).toFixed(1).replace('.', ',')}% {faturamentoTotal > 0 && (comparacaoFaturamento >= 0 ? <FaArrowUp /> : <FaArrowDown />)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico diário - Desktop */}
        <div className="financeiro-grafico-diario financeiro-grafico-diario-desktop">
          <h2>Gráfico de servas diárias</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosDiarios}>
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="linear" 
                dataKey="reservas" 
                stroke={temReservasNoGrafico ? COLORS.blue : COLORS.gray} 
                name="Reservas" 
                dot={false} 
              />
              <Line 
                type="linear" 
                dataKey="faturamento" 
                stroke={faturamentoTotal > 0 ? COLORS.blue : COLORS.gray} 
                name="Faturamento" 
                dot={false} 
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico diário - Mobile (duplicado, com layout otimizado) */}
        <div className="financeiro-grafico-diario financeiro-grafico-diario-mobile">
          <h2>Gráfico de servas diárias</h2>
          <div className="financeiro-grafico-diario-mobile-wrapper">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={dadosDiarios}>
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="linear" 
                  dataKey="reservas" 
                  stroke={temReservasNoGrafico ? COLORS.blue : COLORS.gray} 
                  name="Reservas" 
                  dot={false} 
                />
                <Line 
                  type="linear" 
                  dataKey="faturamento" 
                  stroke={faturamentoTotal > 0 ? COLORS.blue : COLORS.gray} 
                  name="Faturamento" 
                  dot={false} 
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="financeiro-graficos-circulares">
          {/* RESERVAS */}
          <div className="grafico-circular">
            <div className="grafico-wrapper">
              <Doughnut
                data={{
                  datasets: [{
                    data: dadosReservasArray,
                    backgroundColor: coresReservas,
                    borderWidth: 0
                  }]
                }}
                options={{
                  cutout: '70%',
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      enabled: temReservas
                    }
                  },
                  maintainAspectRatio: false
                }}
              />
            </div>
            <h3>Reservas</h3>
            <div className="grafico-legenda">
              <div className="legenda-item">
                <span className="color-box" style={{ background: '#ff2a2a' }}></span>
                <span className="legenda-texto">Canceladas {porcentagemCanceladas}%</span>
              </div>
              <div className="legenda-item">
                <span className="color-box" style={{ background: '#00ff00' }}></span>
                <span className="legenda-texto">Concluídas {porcentagemConcluidas}%</span>
              </div>
            </div>
          </div>

          {/* 3️⃣ FATURAMENTO */}
          <div className="grafico-circular">
            <div className="grafico-wrapper">
              <Doughnut
                data={{
                  datasets: [{
                    data: dadosFaturamentoGrafico,
                    backgroundColor: coresFaturamento,
                    borderWidth: 0
                  }]
                }}
                options={{
                  cutout: '70%',
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      enabled: temFaturamento
                    }
                  },
                  maintainAspectRatio: false
                }}
              />
            </div>
            <h3>Faturamento</h3>
            <div className="grafico-legenda">
              <div className="legenda-item">
                <span className="color-box" style={{ background: temFaturamento ? '#4caf50' : '#9e9e9e' }}></span>
                <span className="legenda-texto">Faturamento {porcentagemFaturamento}%</span>
              </div>
              <div className="legenda-item">
                <span className="color-box" style={{ background: '#00ff00' }}></span>
                <span className="legenda-texto">Lucro {porcentagemLucro}%</span>
              </div>
            </div>
          </div>

          {/* 4️⃣ TAXA DE OCUPAÇÃO */}
          <div className="grafico-circular">
            <div className="grafico-wrapper">
              <Doughnut
                data={{
                  datasets: [{
                    data: dadosOcupacaoArray,
                    backgroundColor: coresOcupacao,
                    borderWidth: 0
                  }]
                }}
                options={{
                  cutout: '70%',
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      enabled: temOcupacao
                    }
                  },
                  maintainAspectRatio: false
                }}
              />
            </div>
            <h3>Taxa de ocupação</h3>
            <div className="grafico-legenda">
              <div className="legenda-item">
                <span className="color-box" style={{ background: '#00ff00' }}></span>
                <span className="legenda-texto">Ocupação {porcentagemOcupacao}%</span>
              </div>
              <div className="legenda-item">
                <span className="color-box" style={{ background: '#4caf50' }}></span>
                <span className="legenda-texto">Falta {porcentagemFalta}%</span>
              </div>
            </div>
          </div>
        </div>

        <button className="ver-planilha-button" onClick={() => navigate('/admin/planilha')}>
          Ver em planilha
        </button>
      </div>
    </div>
  )
}

export default Financeiro

