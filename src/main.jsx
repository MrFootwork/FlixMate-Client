import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthWrapper } from './contexts/AuthWrapper'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Router>
			<AuthWrapper>
				<App />
			</AuthWrapper>
		</Router>
	</StrictMode>
)
