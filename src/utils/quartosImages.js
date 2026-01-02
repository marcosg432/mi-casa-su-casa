// Função compartilhada para obter as imagens de cada quarto
export const getQuartoImages = (quartoId) => {
  if (quartoId === 'quarto1') {
    return [
      '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/01326756-1b5e-42e3-9bb6-49125bdecaf0.jpg',
      '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/0928ff2f-28ad-455f-99d9-99dbc34fb6c2.jpg',
      '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/17b7bc69-311f-487a-826b-1930a3343b3d.jpg',
      '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/50cac846-d63d-4cb9-885f-d3f8071e7518.jpg',
      '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/70e05b71-e628-4e87-a108-31ab8d696e2c.jpg',
      '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/72b019e4-58f3-422f-979a-a5fc6b0e0472.jpg',
      '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/7453ce3a-62db-4466-aff7-5c2532a38dbf.jpg',
      '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/a5c7cd38-4cb0-435f-944c-bf5700615e27.jpg',
      '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/b00af959-61c0-4233-95fc-1176ee4147f0.jpg',
      '/fotos_dos_quartos/quarto_duplo-com-banheiro-compartilhado/cc50e465-6f65-48e1-9139-50c7255cdc08.jpg'
    ]
  } else if (quartoId === 'quarto2') {
    return [
      '/fotos_dos_quartos/quarto-familia/0c12b8c5-3f4e-40f2-a33c-652dbd44554a.jpg',
      '/fotos_dos_quartos/quarto-familia/13c7eb7a-219b-4bd2-b5b9-b842eb1cd363.jpg',
      '/fotos_dos_quartos/quarto-familia/56b5474f-3533-4f9a-ba14-8661b0567691.jpg',
      '/fotos_dos_quartos/quarto-familia/640391605.jpg',
      '/fotos_dos_quartos/quarto-familia/7fcddf93-f843-4bbb-b36f-92dc5b18bd4c.jpg',
      '/fotos_dos_quartos/quarto-familia/a786fd56-b3bb-4795-beda-28aef1b89fda.jpg',
      '/fotos_dos_quartos/quarto-familia/adf395a6-c1c1-4b9c-9af2-e6a60b0b4358.jpg'
    ]
  } else if (quartoId === 'quarto3') {
    return [
      '/fotos_dos_quartos/quarto-familia-5x/49644389-4641-4e6b-a525-48151c8f1a1a.jpg',
      '/fotos_dos_quartos/quarto-familia-5x/5ae27bd4-6c26-4cab-aa0c-71dca7b965ab.jpg',
      '/fotos_dos_quartos/quarto-familia-5x/7fcddf93-f843-4bbb-b36f-92dc5b18bd4c.jpg',
      '/fotos_dos_quartos/quarto-familia-5x/89878656-9fee-48bb-bceb-0e127917cdea.jpg',
      '/fotos_dos_quartos/quarto-familia-5x/b640c721-ae41-417e-8bdb-d704e70fc577.jpg',
      '/fotos_dos_quartos/quarto-familia-5x/db03dc39-c11b-4ce8-9de1-1bf515f82b72.jpg',
      '/fotos_dos_quartos/quarto-familia-5x/eb943dde-c60c-4c45-84de-79971adf3909.jpg'
    ]
  } else if (quartoId === 'quarto4') {
    return [
      '/fotos_dos_quartos/quarto_duplo/17594547-0116-4697-9187-e1abf4561671.jpg',
      '/fotos_dos_quartos/quarto_duplo/649ff996-e316-4fa2-94f0-6b7169eef796.jpg',
      '/fotos_dos_quartos/quarto_duplo/69dcd418-4fd5-4e0f-904e-2f15b4ad29a9.jpg',
      '/fotos_dos_quartos/quarto_duplo/70e05b71-e628-4e87-a108-31ab8d696e2c.jpg',
      '/fotos_dos_quartos/quarto_duplo/7453ce3a-62db-4466-aff7-5c2532a38dbf.jpg',
      '/fotos_dos_quartos/quarto_duplo/a5c7cd38-4cb0-435f-944c-bf5700615e27.jpg',
      '/fotos_dos_quartos/quarto_duplo/a921caca-e9f0-4597-888e-eec9d5241592.jpg',
      '/fotos_dos_quartos/quarto_duplo/b00af959-61c0-4233-95fc-1176ee4147f0.jpg',
      '/fotos_dos_quartos/quarto_duplo/b93d9768-2536-42a2-87ed-4f1424eeb00d.jpg',
      '/fotos_dos_quartos/quarto_duplo/cc50e465-6f65-48e1-9139-50c7255cdc08.jpg'
    ]
  }
  
  // Fallback para outros quartos
  return [
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200'
  ]
}

