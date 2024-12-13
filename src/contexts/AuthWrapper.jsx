import React, { useState } from 'react'
import config from '../../config'

const AuthContext = React.createContext()

function AuthWrapper({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthWrapper, AuthContext }
