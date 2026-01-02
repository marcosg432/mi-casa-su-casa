import SuiteBase from './SuiteBase'

const Quarto4 = () => {
  const suiteData = {
    id: 'quarto4',
    nome: 'Ararajuba',
    nomeCompleto: 'Quarto Duplo',
    preco: 150,
    capacidade: 2,
    tamanho: '20 m²',
    camas: '1 cama de casal',
    banheiro: 'Compartilhado (chuveiro)',
    comodidades: [
      'Wi-Fi gratuito',
      'Vista para o jardim',
      'Terraço',
      'Máquina de lavar roupas',
      'Guarda-roupa',
      'Ventilador'
    ],
    descricao: 'Quarto duplo confortável, indicado para casais ou viajantes que buscam um ambiente tranquilo. Conta com cama de casal, vista para o jardim, terraço e acesso a banheiro compartilhado com chuveiro. Uma opção simples e agradável para sua hospedagem.'
  }

  return <SuiteBase suiteData={suiteData} />
}

export default Quarto4


