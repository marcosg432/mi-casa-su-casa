import SuiteBase from './SuiteBase'

const SuiteExclusiva = () => {
  const suiteData = {
    id: 'exclusiva',
    nome: 'Suíte Mi Casa Exclusiva',
    preco: 550,
    descricao: 'A Suíte Mi Casa Exclusiva combina elegância, conforto e privacidade em um só espaço. Ideal para quem busca uma estadia diferenciada, com mais tranquilidade e uma experiência única na Mi Casa Su Casa.'
  }

  return <SuiteBase suiteData={suiteData} />
}

export default SuiteExclusiva




