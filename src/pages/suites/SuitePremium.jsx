import SuiteBase from './SuiteBase'

const SuitePremium = () => {
  const suiteData = {
    id: 'premium',
    nome: 'Suíte Mi Casa Premium',
    preco: 450,
    descricao: 'A opção mais exclusiva do hotel, perfeita para quem deseja viver momentos especiais. Conta com ambiente amplo, acabamento refinado e máximo conforto para uma experiência completa.'
  }

  return <SuiteBase suiteData={suiteData} />
}

export default SuitePremium




