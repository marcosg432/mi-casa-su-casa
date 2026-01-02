import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsuarioLogado } from '../../utils/storage'
import Financeiro from './Financeiro'

const Dashboard = () => {
  const navigate = useNavigate()
  const usuario = getUsuarioLogado()

  useEffect(() => {
    if (!usuario) {
      navigate('/admin/login')
    }
  }, [usuario, navigate])

  if (!usuario) return null

  return <Financeiro />
}

export default Dashboard



