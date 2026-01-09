import SuiteBase from './SuiteBase'

const SuiteLuxo = () => {
  const suiteData = {
    id: 'luxo',
    nome: 'Suíte Mi Casa Luxo',
    preco: 350,
    descricao: 'Espaçosa e confortável, a Suíte Mi Casa Luxo oferece uma experiência premium com design moderno e detalhes que garantem bem-estar, descanso e uma estadia inesquecível.'
  }

  return <SuiteBase suiteData={suiteData} />
}

export default SuiteLuxo




