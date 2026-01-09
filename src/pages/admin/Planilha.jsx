import { useState, useEffect } from 'react'
import { getReservas, getReservasPorMes, getDespesas, getQuartos, formatarMoeda } from '../../utils/storage'
import { format, startOfMonth, subMonths } from 'date-fns'
import AdminHeader from '../../components/AdminHeader'
import './Planilha.css'

const Planilha = () => {
  const [mesSelecionado, setMesSelecionado] = useState(new Date())
  const [reservas, setReservas] = useState([])
  const [despesas, setDespesas] = useState([])
  const [quartos, setQuartos] = useState([])

  useEffect(() => {
    // Buscar todas as reservas e filtrar por mês selecionado
    const todasReservas = getReservas()
    const mes = mesSelecionado.getMonth()
    const ano = mesSelecionado.getFullYear()
    
    // Filtrar reservas que estão ativas no mês selecionado
    // (check-in ou check-out no mês, ou que atravessam o mês)
    const reservasMes = todasReservas.filter(r => {
      if (!r.checkIn || !r.checkOut) return false
      const checkIn = new Date(r.checkIn)
      const checkOut = new Date(r.checkOut)
      const checkInMes = checkIn.getMonth()
      const checkInAno = checkIn.getFullYear()
      const checkOutMes = checkOut.getMonth()
      const checkOutAno = checkOut.getFullYear()
      
      // Reserva está no mês se check-in ou check-out está no mês, ou se atravessa o mês
      return (checkInMes === mes && checkInAno === ano) || 
             (checkOutMes === mes && checkOutAno === ano) ||
             (checkIn <= new Date(ano, mes + 1, 0) && checkOut >= new Date(ano, mes, 1))
    })
    
    setReservas(reservasMes)
    setDespesas(getDespesas())
    setQuartos(getQuartos())
  }, [mesSelecionado])

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

  // Filtrar apenas reservas ativas (sem canceladas) para origem
  const reservasAtivas = reservas.filter(r => r.status !== 'cancelada')
  
  const origemReservas = reservasAtivas.reduce((acc, r) => {
    const origem = r.origem || 'Site / whatsapp'
    acc[origem] = acc[origem] || { quantidade: 0, total: 0 }
    acc[origem].quantidade += 1
    acc[origem].total += calcularValorReserva(r)
    return acc
  }, {})

  const ocupacaoPorQuarto = quartos.map(quarto => {
    // Filtrar reservas do quarto que estão ativas (não canceladas)
    const reservasQuarto = reservas.filter(r => 
      r.quartoId === quarto.id && r.status !== 'cancelada'
    )
    return {
      quarto: quarto.nome,
      ocupacao: reservasQuarto.length,
      total: reservasQuarto.reduce((sum, r) => sum + calcularValorReserva(r), 0)
    }
  })

  // Calcular faturamento de reservas ativas (não canceladas) para o cálculo do lucro
  const faturamentoTotal = reservasAtivas.reduce((sum, r) => sum + calcularValorReserva(r), 0)
  
  // Despesas já vêm com valores fixos, não precisa recalcular
  const totalDespesas = despesas.reduce((sum, d) => sum + d.total, 0)
  const lucro = faturamentoTotal - totalDespesas
  const porcentagemLucro = faturamentoTotal > 0 ? (lucro / faturamentoTotal) * 100 : 0

  return (
    <div className="planilha-page">
      <AdminHeader currentPage="planilha" />
      <div className="planilha-container">
        <h1 className="planilha-title">Resumo do mês</h1>

        <div className="planilha-mes-selector">
          <label>Histórico de mês</label>
          <input
            type="month"
            value={format(mesSelecionado, 'yyyy-MM')}
            min="2020-01"
            max={format(new Date(), 'yyyy-MM')}
            onChange={(e) => {
              const [ano, mes] = e.target.value.split('-')
              setMesSelecionado(new Date(parseInt(ano), parseInt(mes) - 1))
            }}
            className="planilha-mes-input"
          />
        </div>

        <div className="planilha-tables">
          <div className="planilha-table-container">
            <h2>Origem de ocupação</h2>
            <table className="planilha-table">
              <thead>
                <tr>
                  <th>Todos os Quartos</th>
                  <th>Ocupação</th>
                  <th>Total Por Quarto</th>
                </tr>
              </thead>
              <tbody>
                {ocupacaoPorQuarto.map((item, index) => (
                  <tr key={index}>
                    <td>{item.quarto}</td>
                    <td>{item.ocupacao}</td>
                    <td>{formatarMoeda(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="planilha-table-container">
            <h2>Despesas</h2>
            <table className="planilha-table">
              <thead>
                <tr>
                  <th>Todos as Despesas</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {despesas.map(despesa => (
                  <tr key={despesa.id}>
                    <td>{despesa.categoria}</td>
                    <td>{despesa.quantidade || ''}</td>
                    <td>{formatarMoeda(despesa.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="planilha-table-container">
            <h2>Faturamento e lucro</h2>
            <table className="planilha-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>faturamento</td>
                  <td>{formatarMoeda(faturamentoTotal)}</td>
                </tr>
                <tr>
                  <td>Lucro</td>
                  <td>{formatarMoeda(lucro)}</td>
                </tr>
                <tr>
                  <td>Porcentagem</td>
                  <td>{porcentagemLucro.toFixed(1).replace('.', ',')}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Planilha


