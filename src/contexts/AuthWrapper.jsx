import axios from 'axios'
import React, { useState, useEffect } from 'react'
import config from '../../config'

const AuthContext = React.createContext()
const API_URL = config.API_URL

function AuthWrapper({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setToken(window.localStorage.getItem('flixmateToken'))

    axios
      .get(API_URL + '/users/me', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            'flixmateToken'
          )}`,
        },
      })
      .then(({ data }) => setUser(data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AuthContext.Provider value={{ loading, user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthWrapper, AuthContext }
