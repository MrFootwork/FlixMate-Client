import './Message.css'
import { useContext } from 'react'
import { MessageContext } from '../contexts/MessageWrapper'
import { useEffect } from 'react'

const Message = () => {
  const { message, setMessage } = useContext(MessageContext)

  // Reset message after a while
  // FIXME disappears tooo early on logout
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(prev => ({ ...prev, message: '' }))
      clearTimeout(timer)
    }, 5000)
  }, [message.message])

  return (
    <>
      {message.message && (
        <div className={`message ${message.type}`}>{message.message}</div>
      )}
    </>
  )
}

export default Message
