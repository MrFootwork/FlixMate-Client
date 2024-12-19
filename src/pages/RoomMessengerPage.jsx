import './RoomMessengerPage.css'
import { useRef, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import axios from 'axios'

import { AuthContext } from '../contexts/AuthWrapper'
import MessengerMessageCard from '../components/MessengerMessageCard'

const API_URL = import.meta.env.VITE_API_URL

function RoomMessengerPage() {
  // CONNECTION
  const { token } = useContext(AuthContext)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    // Only runs on component destruction
    return () => {
      if (socket) {
        socket.disconnect()
        setSocket(null)
      }
    }
  }, [socket])

  useEffect(() => {
    if (token && !socket) {
      setSocket(
        io(API_URL, {
          auth: { token },
        })
      )
    }
  }, [token])

  // ROOM
  const { roomId } = useParams()
  const [room, setRoom] = useState(null)
  const [joined, setJoined] = useState(null)

  // MESSAGES
  const [messages, setMessages] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (messages) return
    getRoomMessages()
  }, [token])

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

      // socket.on('disconnect', () => {
      //   setSocket(null)
      // })

      return () => {
        socket.off('error')
        socket.off('joined-room')
        socket.off('new-message')
      }
    }
  }, [socket, messages])

  function sendMessage() {
    const inputMessage = inputRef.current.value
    socket.emit('receive-message', inputMessage)
  }

  // Scroll to bottom on first render
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    // FIXME use grid instead
    <div className='messenger-page-container'>
      {/* <aside className='room-nav-sidebar'>
        <header>Rooms</header>
        <nav>
          <ul>
            <li>Room 1</li>
            <li>Room 2</li>
          </ul>
        </nav>
      </aside> */}

      <div className='messages-container'>
        <div className='messages-history-container'>
          {messages &&
            messages.map((message, i) => (
              <MessengerMessageCard
                key={message._id}
                message={message}
                nextMessage={messages[i + 1]}
              />
            ))}
          <div ref={bottomRef}></div>
        </div>

        <div className='messages-input-container'>
          <input type='text' ref={inputRef} placeholder='Type a message' />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* <aside>
        <header>
          <div>
            <img src='' alt='Room Image' />
          </div>
          <h2>Room {room && room.name}</h2>
          <nav>
            <button>Enter Watch Party</button>
          </nav>
        </header>
        <section>
          <h3>Room Members</h3>
          <ul>
            <li>Member 1</li>
            <li>Member 2</li>
          </ul>
        </section>
      </aside> */}
    </div>
  )
}

export default RoomMessengerPage
