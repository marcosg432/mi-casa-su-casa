import SuiteBase from './SuiteBase'

const SuiteImperial = () => {
  const suiteData = {
    id: 'imperial',
    nome: 'Suíte Pousada Mi Casa Sua Casa',
    preco: 249,
    descricao: 'Uma suíte elegante e aconchegante, pensada para quem busca conforto e tranquilidade. Ideal para casais que desejam relaxar em um ambiente sofisticado, com clima intimista e acolhedor.'
  }

  return <SuiteBase suiteData={suiteData} />
}

export default SuiteImperial




