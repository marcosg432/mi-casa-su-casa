import SuiteBase from './SuiteBase'

const Quarto2 = () => {
  const suiteData = {
    id: 'quarto2',
    nome: 'Quarto Família (4 Camas de Solteiro)',
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
  }

  return <SuiteBase suiteData={suiteData} />
}

export default Quarto2


