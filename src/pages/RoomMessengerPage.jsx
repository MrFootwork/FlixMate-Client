import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { AuthContext } from '../contexts/AuthWrapper'
import io from 'socket.io-client'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

function RoomMessengerPage() {
  const { roomId } = useParams()
  const [room, setRoom] = useState(null)
  const [messages, setMessages] = useState(null)
  const [socket, setSocket] = useState(null)
  const [joined, setJoined] = useState(null)
  const { token } = useContext(AuthContext)

  const inputRef = useRef(null)

  async function getRoomMessages() {
    if (!token) return
    const { data } = await axios.get(API_URL + '/rooms/' + roomId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(data)
    setRoom(data)
    setMessages(data.messages)
  }

  useEffect(() => {
    if (messages) return
    getRoomMessages()
  }, [token])

  useEffect(() => {
    if (token && !socket) {
      setSocket(
        io(API_URL, {
          auth: { token },
        })
      )
    }
  }, [token])

  useEffect(() => {
    if (socket) {
      if (!joined) {
        console.log('Trying to join room ', roomId)
        socket.emit('join-room', roomId)
        setJoined(true)
      }

      socket.on('error', error => {
        console.log(error)
        // FIXME Display the Error once the UI is done
      })

      socket.on('joined-room', () => {
        console.log(`Succesfully joined the room ${room}`)
      })

      socket.on('new-message', message => {
        console.log('Received new message: ', message, messages)
        setMessages([...messages, message])
      })

      return () => {
        socket.off('error')
        socket.off('joined-room')
        socket.off('new-message')
      }
    }
  }, [socket, messages])

  function sendMessage(text) {
    socket.emit('receive-message', text)
  }

  function handleSend() {
    sendMessage(inputRef.current.value)
    // console.log(inputRef.current.value)
  }
  return (
    <div className='messenger-container'>
      <div className='top-bar'>
        <div>Room : {room && room.name}</div>
      </div>
      <div>
        <input type='text' ref={inputRef} />
        <button onClick={handleSend}>Click Me</button>
      </div>
      <div className='messages-container'>
        {/* <MessageCard message={null} /> */}
        {messages &&
          messages.map(message => <p key={message._id}>{message.text}</p>)}
      </div>
    </div>
  )
}

export default RoomMessengerPage
