import SuiteBase from './SuiteBase'

const Quarto1 = () => {
  const suiteData = {
    id: 'quarto1',
    nome: 'Quarto Duplo com Banheiro Compartilhado',
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
    descricao: 'Quarto duplo aconchegante, ideal para casais que buscam conforto e tranquilidade. O ambiente conta com cama de casal, vista para o jardim, terraço e acesso a banheiro compartilhado com chuveiro. Uma opção prática e acolhedora para uma estadia relaxante.'
  }

  return <SuiteBase suiteData={suiteData} />
}

export default Quarto1


