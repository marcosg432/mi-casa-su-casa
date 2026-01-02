import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Quartos from './pages/Quartos'
import Galeria from './pages/Galeria'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import Servicos from './pages/Servicos'
import SuiteImperial from './pages/suites/SuiteImperial'
import SuiteLuxo from './pages/suites/SuiteLuxo'
import SuitePremium from './pages/suites/SuitePremium'
import SuiteExclusiva from './pages/suites/SuiteExclusiva'
import Quarto1 from './pages/suites/Quarto1'
import Quarto2 from './pages/suites/Quarto2'
import Quarto3 from './pages/suites/Quarto3'
import Quarto4 from './pages/suites/Quarto4'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
import Dashboard from './pages/admin/Dashboard'
import Financeiro from './pages/admin/Financeiro'
import Reservas from './pages/admin/Reservas'
import QuartosAdmin from './pages/admin/Quartos'
import Historico from './pages/admin/Historico'
import Gerenciamento from './pages/admin/Gerenciamento'
import Despesas from './pages/admin/Despesas'
import Planilha from './pages/admin/Planilha'
import PainelCardapio from './pages/admin/PainelCardapio'
import Cardapio from './pages/Cardapio'
import CardapioAdmin from './pages/admin/CardapioAdmin'
import Booking from './pages/Booking'
import Airbnb from './pages/Airbnb'

function App() {
  console.log('App component rendering')
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quartos" element={<Quartos />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/suite-imperial" element={<SuiteImperial />} />
        <Route path="/suite-luxo" element={<SuiteLuxo />} />
        <Route path="/suite-premium" element={<SuitePremium />} />
        <Route path="/suite-exclusiva" element={<SuiteExclusiva />} />
        <Route path="/quarto1" element={<Quarto1 />} />
        <Route path="/quarto2" element={<Quarto2 />} />
        <Route path="/quarto3" element={<Quarto3 />} />
        <Route path="/quarto4" element={<Quarto4 />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/financeiro" element={<Financeiro />} />
        <Route path="/admin/reservas" element={<Reservas />} />
        <Route path="/admin/quartos" element={<QuartosAdmin />} />
        <Route path="/admin/historico" element={<Historico />} />
        <Route path="/admin/gerenciamento" element={<Gerenciamento />} />
        <Route path="/admin/despesas" element={<Despesas />} />
        <Route path="/admin/planilha" element={<Planilha />} />
        <Route path="/admin/painel-cardapio" element={<PainelCardapio />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/admin/cardapio" element={<CardapioAdmin />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/airbnb" element={<Airbnb />} />
      </Routes>
    </Router>
  )
}

export default App

