# Mi Casa Su Casa - Pousada & Restaurante

Site completo para a Pousada & Restaurante Mi Casa Su Casa, incluindo sistema de reservas funcional e painel administrativo.

## 🚀 Tecnologias

- React 18
- Vite
- React Router DOM
- Recharts (gráficos)
- date-fns (manipulação de datas)
- LocalStorage (armazenamento de dados)

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar o projeto

```bash
npm run dev
```

O site estará disponível em `http://localhost:5173`

## 📄 Páginas do Site

### Páginas Públicas

- **/** - Página inicial com hero, sobre nós, quartos e "por que escolher"
- **/quartos** - Listagem de quartos disponíveis
- **/galeria** - Galeria de fotos (estrutura criada, conteúdo em branco)
- **/sobre** - Informações sobre o hotel
- **/contato** - Formulário de contato com mapa

### Páginas de Suítes

- **/suite-imperial** - Suíte Mi Casa Imperial (R$ 249/noite)
- **/suite-luxo** - Suíte Mi Casa Luxo (R$ 350/noite)
- **/suite-premium** - Suíte Mi Casa Premium (R$ 450/noite)
- **/suite-exclusiva** - Suíte Mi Casa Exclusiva (R$ 550/noite)

### Sistema de Reservas

- **/carrinho** - Carrinho de compras com resumo da reserva
- **/checkout** - Checkout fake (Pix, Cartão, Boleto)

### Painel Administrativo

- **/admin/login** - Login do painel (fake, sem senha real)
- **/admin** ou **/admin/financeiro** - Dashboard financeiro
- **/admin/reservas** - Gerenciamento de reservas
- **/admin/quartos** - Gerenciamento de quartos
- **/admin/historico** - Histórico de reservas (canceladas/concluídas)
- **/admin/gerenciamento** - Gestão de funcionários
- **/admin/despesas** - Gerenciamento de despesas
- **/admin/planilha** - Planilha completa com dados mensais

## 🎯 Funcionalidades

### Sistema de Reservas

- Calendário interativo para seleção de datas
- Validação de datas ocupadas (não permite reservar datas já reservadas)
- Campos para crianças (opcional, máximo 4)
- Cálculo automático de total e número de noites
- Integração com carrinho e checkout

### Painel Administrativo

- **Financeiro:**
  - Cards com métricas principais
  - Gráfico diário de reservas e faturamento
  - Gráficos circulares (origem, status, faturamento, ocupação)
  - Comparação mensal (crescimento/queda)
  - Meta de ocupação configurável

- **Reservas:**
  - Listagem de todas as reservas
  - Busca por nome, e-mail, telefone ou código
  - Visualização completa da ficha
  - Cancelamento de reservas

- **Quartos:**
  - Listagem de todos os quartos
  - Visualização de reservas por quarto
  - Informações detalhadas de cada suíte

- **Histórico:**
  - Reservas canceladas e concluídas
  - Exclusão permanente
  - Visualização de fichas completas

- **Gerenciamento:**
  - CRUD de funcionários
  - Não permite excluir próprio usuário

- **Despesas:**
  - Edição de despesas
  - Categorias: Funcionários, Limpeza, Manutenção, Taxas, etc.

- **Planilha:**
  - Tabelas completas de origem de reservas
  - Ocupação por quarto
  - Despesas
  - Faturamento e lucro
  - Histórico mensal selecionável

## 🔄 Lógica do Sistema

### Status de Reservas

- **pendente**: Reserva feita, aguardando check-in
- **concluida**: Reserva automaticamente concluída após horário de checkout (10:00)
- **cancelada**: Reserva cancelada manualmente

### Cálculos

- Valores contam no mês em que a reserva foi **feita**, não no mês do check-in
- Reservas canceladas não entram no faturamento
- Lucro = Faturamento - Despesas
- Taxa de ocupação baseada em meta configurável

### Calendário

- Datas já reservadas aparecem como ocupadas
- Não permite selecionar datas passadas
- Cada quarto funciona de forma independente

## 📝 Notas Importantes

- O checkout é **fake/ilustrativo** - não processa pagamentos reais
- O login do painel é **fake** - não possui senha real
- Todos os dados são armazenados no **LocalStorage** do navegador
- As imagens são genéricas (serão trocadas depois)
- O painel fica oculto, acessível apenas por link direto

## 🎨 Design

O design segue exatamente os modelos das imagens fornecidas, com:
- Cores idênticas
- Espaçamentos milimétricos
- Estrutura idêntica
- Única alteração permitida: formulário de contato (adicionado mapa)

## 🔧 Build para Produção

```bash
npm run build
```

Os arquivos estarão em `dist/`

## 📱 Responsividade

O site foi desenvolvido com foco em desktop, mas possui estrutura responsiva básica.

---

Desenvolvido seguindo exatamente os modelos fornecidos.




