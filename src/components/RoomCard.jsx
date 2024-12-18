import './RoomCard.css'
import { useState } from 'react'

const RoomCard = ({ room }) => {
  const { name, owner, participants, movie } = room
  const [expanded, setExpanded] = useState(false)

  function handleExpand() {
    setExpanded(!expanded)
  }

  function handleJoin() {
    const roomLink = `https://netflix.com/watch/${movie.id}?flixmate=${room._id}`
    window.open(roomLink, '_blank', 'noopener,noreferrer')
  }

  if (!movie) return null
  return (
    <tr className='RoomCard'>
      <td className='details'>
        <p>{name}</p>
        <p>{owner.name}</p>
        <p className='show'>{movie.title}</p>
        <p className='participants-number'>{participants.length}</p>
        <button onClick={handleJoin}>Join</button>
        <button className='expand' onClick={handleExpand}>
          {expanded ? 'X' : 'V'}
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
