import { useNavigate } from 'react-router-dom'
import './RoomCard.css'
import { useState } from 'react'

import enterRoom from '../assets/images/enter-room.png'
import chatIcon from '../assets/images/chat-icon.png'
import participantsIcon from '../assets/images/participants.png'

const RoomCard = ({ room }) => {
  const { name, owner, participants, movie } = room
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  function handleExpand() {
    setExpanded(!expanded)
  }

  function handleJoin() {
    const roomLink = `https://netflix.com/watch/${movie.id}?flixmate=${room._id}`
    window.open(roomLink, '_blank', 'noopener,noreferrer')
  }

  function handleChat() {
    navigate(`/rooms/${room._id}`)
  }

  if (!movie) return null
  return (
    <tr className='RoomCard'>
      <td className={`details ${expanded ? 'expanded' : 'closed'}`}>
        {/* FIXME hook.js:608 Warning: validateDOMNesting(...): Text nodes cannot appear as a child of <tbody>. Error Component Stack */}
        <p>{name}</p>
        <p>{owner.name}</p>
        <p className='show'>{movie.title}</p>
        <p className='participants-number'>{participants.length}</p>
        <button onClick={handleJoin}>
          <img className='enter-room' src={enterRoom} alt='Enter room' />
        </button>
        <button onClick={handleChat}>
          <img className='join-chat' src={chatIcon} alt='Join Chat' />
        </button>
        <button className='expand' onClick={handleExpand}>
          <img
            className='participants'
            src={participantsIcon}
            alt='Show Participants'
          />
        </button>
      </td>
      {expanded ? (
        <td>
          <ul className='participants'>
            {participants.map(participant => (
              <li key={participant._id}>{participant.name}</li>
            ))}
          </ul>
        </td>
      ) : null}
    </tr>
  )
}
export default RoomCard
