import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { getDespesas, updateDespesas, getMetaOcupacao, setMetaOcupacao, formatarMoeda } from '../../utils/storage'
import { getMonth, getYear } from 'date-fns'
import AdminHeader from '../../components/AdminHeader'
import './Despesas.css'

const Despesas = () => {
  const [despesas, setDespesas] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [metaOcupacao, setMetaOcupacaoState] = useState(100)
  const [inputValues, setInputValues] = useState({})

  // Função para formatar número sem forçar decimais
  const formatarPorcentagem = (valor) => {
    if (!valor || valor === null || valor === '') return ''
    const num = parseFloat(valor)
    if (isNaN(num)) return ''
    // Remove zeros à direita após o ponto decimal
    const str = num.toString()
    if (str.includes('.')) {
      const partes = str.split('.')
      const decimal = partes[1].replace(/0+$/, '')
      return decimal === '' ? partes[0] : `${partes[0]},${decimal}`
    }
    return str
  }

  useEffect(() => {
    const todasDespesas = getDespesas()
    // Migrar valor de total para quantidade se for "Taxas de plataformas"
    const despesasAtualizadas = todasDespesas.map(d => {
      if (d.categoria && d.categoria.toLowerCase().includes('taxa')) {
        // Se tem total mas não tem quantidade, mover total para quantidade
        if (d.total && d.total !== 0 && (!d.quantidade || d.quantidade === null)) {
          return { ...d, quantidade: d.total.toString(), total: 0 }
        }
        // Se tem quantidade, manter e zerar total
        if (d.quantidade) {
          return { ...d, total: 0 }
        }
      }
      return d
    })
    setDespesas(despesasAtualizadas)
    setMetaOcupacaoState(getMetaOcupacao())
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    updateDespesas(despesas)
    setIsEditing(false)
    setInputValues({}) // Limpar valores de input ao salvar
  }

  const handleChange = (id, field, value) => {
    setDespesas(despesas.map(d => {
      if (d.id === id) {
        if (field === 'categoria') {
          return { ...d, categoria: value }
        } else if (field === 'quantidade') {
          // Para "Taxas de plataformas", permitir editar quantidade (porcentagem)
          const isTaxasPlataformas = d.categoria && d.categoria.toLowerCase().includes('taxa')
          if (isTaxasPlataformas) {
            // Trata valores com vírgula como separador decimal
            let valorLimpo = value.toString().trim()
            if (valorLimpo === '' || valorLimpo === ',') {
              return { ...d, quantidade: null, total: 0 }
            }
            // Se tem vírgula, converte para ponto (mantém apenas o que foi digitado)
            if (valorLimpo.includes(',')) {
              const partes = valorLimpo.split(',')
              const parteInteira = partes[0].replace(/\./g, '')
              if (parteInteira === '') {
                return { ...d, quantidade: null, total: 0 }
              }
              // Remove zeros à direita da parte decimal
              let parteDecimal = (partes[1] || '').replace(/0+$/, '')
              if (parteDecimal === '') {
                // Se só tem zeros ou está vazio, armazena só o inteiro
                valorLimpo = parteInteira
              } else {
                valorLimpo = `${parteInteira}.${parteDecimal}`
              }
            } else {
              valorLimpo = valorLimpo.replace(/\./g, '')
              if (valorLimpo === '') {
                return { ...d, quantidade: null, total: 0 }
              }
            }
            const valorNumerico = parseFloat(valorLimpo)
            if (isNaN(valorNumerico)) {
              return { ...d, quantidade: null, total: 0 }
            }
            // Armazena o valor numérico (sem zeros à direita desnecessários)
            return { ...d, quantidade: valorNumerico.toString(), total: 0 }
          }
          return { ...d, quantidade: value === '' ? null : value }
        } else {
          // Trata valores com ponto como separador de milhares e vírgula como decimal
          let valorLimpo = value.toString().trim()
          
          if (valorLimpo === '' || valorLimpo === ',') {
            return { ...d, total: 0 }
          }
          
          // Se tem vírgula, ela é o separador decimal
          // Remove todos os pontos (separadores de milhares) e converte vírgula para ponto
          if (valorLimpo.includes(',')) {
            // Remove pontos antes da vírgula (separadores de milhares)
            const partes = valorLimpo.split(',')
            const parteInteira = partes[0].replace(/\./g, '')
            const parteDecimal = partes[1] || '00'
            valorLimpo = `${parteInteira}.${parteDecimal}`
          } else {
            // Se não tem vírgula, remove todos os pontos (são separadores de milhares)
            valorLimpo = valorLimpo.replace(/\./g, '')
          }
          
          const valorNumerico = parseFloat(valorLimpo) || 0
          return { ...d, total: valorNumerico }
        }
      }
      return d
    }))
  }

  const handleAddRow = () => {
    const novaDespesa = {
      id: Date.now().toString(),
      categoria: 'Nova despesa',
      quantidade: null,
      total: 0
    }
    setDespesas([...despesas, novaDespesa])
  }

  const handleDeleteRow = (id) => {
    // Não permitir excluir "Taxas de plataformas"
    const despesa = despesas.find(d => d.id === id)
    if (despesa && despesa.categoria && despesa.categoria.toLowerCase().includes('taxa')) {
      alert('Esta linha não pode ser excluída.')
      return
    }
    setDespesas(despesas.filter(d => d.id !== id))
  }

  return (
    <div className="despesas-page">
      <AdminHeader currentPage="despesas" />
      <div className="despesas-container">
        <div className="despesas-header">
          <h1 className="despesas-title">Despesas</h1>
          <div className="despesas-header-buttons">
            {isEditing && (
              <button onClick={handleAddRow} className="despesas-add-button">
                Adicionar linha
              </button>
            )}
            {!isEditing ? (
              <button onClick={handleEdit} className="despesas-edit-button">
                Editar
              </button>
            ) : (
              <button onClick={handleSave} className="despesas-save-button">
                Salvar
              </button>
            )}
          </div>
        </div>

        <table className="despesas-table">
          <thead>
            <tr>
              <th>Todos as Despesas</th>
              <th>Quantidade</th>
              <th>Total</th>
              {isEditing && <th>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {despesas.map(despesa => (
              <tr key={despesa.id}>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={despesa.categoria}
                      onChange={(e) => handleChange(despesa.id, 'categoria', e.target.value)}
                      style={{ width: '100%', padding: '5px', background: '#2d2d2d', color: '#ffffff', border: '1px solid #404040', borderRadius: '4px' }}
                    />
                  ) : (
                    despesa.categoria
                  )}
                </td>
                <td>
                  {isEditing ? (
                    despesa.categoria && despesa.categoria.toLowerCase().includes('taxa') ? (
                      ''
                    ) : (
                      <input
                        type="text"
                        value={despesa.quantidade || ''}
                        onChange={(e) => {
                          const valor = e.target.value.replace(/[^\d.,]/g, '')
                          handleChange(despesa.id, 'quantidade', valor)
                        }}
                        placeholder=""
                        style={{ width: '60px', padding: '5px', background: '#2d2d2d', color: '#ffffff', border: '1px solid #404040', borderRadius: '4px' }}
                      />
                    )
                  ) : (
                    despesa.categoria && despesa.categoria.toLowerCase().includes('taxa')
                      ? ''
                      : (despesa.quantidade || '')
                  )}
                </td>
                <td>
                  {isEditing ? (
                    despesa.categoria && despesa.categoria.toLowerCase().includes('taxa') ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                          type="text"
                          value={inputValues[despesa.id] !== undefined 
                            ? inputValues[despesa.id]
                            : formatarPorcentagem(despesa.quantidade)}
                          onChange={(e) => {
                            const valor = e.target.value.replace(/[^\d.,]/g, '')
                            setInputValues({ ...inputValues, [despesa.id]: valor })
                            handleChange(despesa.id, 'quantidade', valor)
                          }}
                          onBlur={() => {
                            // Quando sai do campo, formata e remove do estado local
                            const formatted = formatarPorcentagem(despesa.quantidade)
                            setInputValues({ ...inputValues, [despesa.id]: formatted })
                          }}
                          placeholder=""
                          style={{ width: '80px', padding: '5px', background: '#2d2d2d', color: '#ffffff', border: '1px solid #404040', borderRadius: '4px' }}
                        />
                        <span style={{ color: '#ffffff', userSelect: 'none', pointerEvents: 'none' }}>%</span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={despesa.total === 0 ? '' : despesa.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        onChange={(e) => {
                          const valor = e.target.value.replace(/[^\d.,]/g, '')
                          handleChange(despesa.id, 'total', valor)
                        }}
                        placeholder="0,00"
                        style={{ 
                          width: '120px', 
                          padding: '5px', 
                          background: '#2d2d2d', 
                          color: '#ffffff', 
                          border: '1px solid #404040', 
                          borderRadius: '4px',
                          cursor: 'text'
                        }}
                      />
                    )
                  ) : (
                    despesa.categoria && despesa.categoria.toLowerCase().includes('taxa') 
                      ? (despesa.quantidade ? `${formatarPorcentagem(despesa.quantidade)}%` : '')
                      : formatarMoeda(despesa.total)
                  )}
                </td>
                {isEditing && (
                  <td>
                    {!(despesa.categoria && despesa.categoria.toLowerCase().includes('taxa')) && (
                    <button 
                      onClick={() => handleDeleteRow(despesa.id)}
                      className="despesas-delete-button"
                      title="Excluir linha"
                    >
                        <FaTimes />
                    </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="meta-ocupacao-section">
          <div className="meta-header">
            <h2 className="meta-title">
              Meta a se bater
            </h2>
            <button className="meta-button" onClick={() => {
              const novaMeta = parseInt(prompt('Digite a meta:')) || 0
              setMetaOcupacaoState(novaMeta)
              setMetaOcupacao(novaMeta)
            }}>
              coloca meta
            </button>
          </div>
          <div className="meta-container">
            <input
              type="number"
              value={metaOcupacao || ''}
              readOnly
              placeholder="Meta"
              className="meta-input-despesas"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Despesas

