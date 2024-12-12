import './Message.css'
import { useContext } from 'react'
import { MessageContext } from '../contexts/MessageWrapper'

const Message = () => {
  const { message } = useContext(MessageContext)

  return (
    <>
      {message.message && (
        <div className={`message ${message.type}`}>{message.message}</div>
      )}
    </>
  )
}

export default Message
