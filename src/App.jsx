import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import RoomsListPage from './pages/RoomsListPage'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/auth' element={<AuthPage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/rooms' element={<RoomsListPage />} />
			</Routes>
		</>
	)
}

export default App
