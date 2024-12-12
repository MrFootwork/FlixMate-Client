import React, { useState } from 'react'
import config from '../../config'

const MessageContext = React.createContext()

function MessageWrapper({ children }) {
  const [message, setMessage] = useState({
    type: 'good',
    message: '',
  })

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  )
}

export { MessageWrapper, MessageContext }
