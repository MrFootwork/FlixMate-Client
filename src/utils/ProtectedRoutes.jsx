import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthWrapper'

const ProtectedRoutes = () => {
  const { user } = useContext(AuthContext)
  return user ? <Outlet /> : <Navigate to='/auth' />
}

export default ProtectedRoutes
