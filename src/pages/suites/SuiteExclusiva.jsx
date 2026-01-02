import SuiteBase from './SuiteBase'

const SuiteExclusiva = () => {
  const suiteData = {
    id: 'exclusiva',
    nome: 'Suíte Brisa Exclusiva',
    preco: 550,
    descricao: 'A Suíte Brisa Exclusiva combina elegância, conforto e privacidade em um só espaço. Ideal para quem busca uma estadia diferenciada, com mais tranquilidade e uma experiência única no Brisa Império.'
  }

  return <SuiteBase suiteData={suiteData} />
}

export default SuiteExclusiva




