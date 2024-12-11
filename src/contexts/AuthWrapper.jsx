import React, { useState } from 'react'
import config from '../../config'

const AuthContext = React.createContext()

function AuthWrapper({ children }) {
	const [user, setUser] = useState(null)

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export { AuthWrapper, AuthContext }
