import SuiteBase from './SuiteBase'

const Quarto3 = () => {
  const suiteData = {
    id: 'quarto3',
    nome: 'Quarto Família (1 Cama de Casal + 3 de Solteiro)',
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
  }

  return <SuiteBase suiteData={suiteData} />
}

export default Quarto3


