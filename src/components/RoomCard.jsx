import './RoomCard.css'
import { useState } from 'react'

const RoomCard = ({ room }) => {
  const { name, owner, participants, movie } = room
  const [expanded, setExpanded] = useState(false)

  function handleExpand() {
    setExpanded(!expanded)
  }

  function hidden() {
    return expanded ? '' : 'hide'
  }

  function handleJoin() {
    const roomLink = `https://netflix.com/watch/${movie.id}?flixmate=${room._id}`
    window.open(roomLink, '_blank', 'noopener,noreferrer')
  }

  if (!movie) return null
  return (
    <div className='RoomCard'>
      <div className='details'>
        <p className={hidden()}>{name}</p>
        <p className={hidden()}>Owner: {owner.name}</p>
        <p className={hidden()}>Show: {movie.title}</p>
        <p className='participants-number'>
          Participants: {participants.length}
        </p>
        <button onClick={handleJoin}>Join</button>
        <button className='expand' onClick={handleExpand}>
          {expanded ? 'X' : 'V'}
        </button>
      </div>
      {expanded ? (
        <ul className='participants'>
          {participants.map(participant => (
            <li key={participant._id}>{participant.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
export default RoomCard
