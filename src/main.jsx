import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import WrapperList from './contexts/WrappersList.jsx'
import { AuthWrapper } from './contexts/AuthWrapper'
import { MessageWrapper } from './contexts/MessageWrapper.jsx'
import { ThemeWrapper } from './contexts/ThemeWrapper.jsx'
import { SearchMovieWrapper } from './contexts/SearchMovieWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <WrapperList
        providers={[
          <AuthWrapper />,
          <MessageWrapper />,
          <ThemeWrapper />,
          <SearchMovieWrapper />,
        ]}
      >
        <App />
      </WrapperList>
    </Router>
  </StrictMode>
)
