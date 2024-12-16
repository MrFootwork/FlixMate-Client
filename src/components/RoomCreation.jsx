import { useContext } from 'react'
import './RoomCreation.css'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthWrapper'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

const RoomCreation = ({ movie }) => {
  const { token } = useContext(AuthContext)

  const navigate = useNavigate()

  async function handleRoomCreation(e) {
    e.preventDefault()
    const { data } = await axios.post(
      API_URL + '/rooms',
      {
        name: e.target.name.value,
        movie: {
          title: movie.title,
          id: movie.netflix_id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const roomLink = `https://netflix.com/watch/${data.movie.id}?flixmate=${data._id}`
    window.open(roomLink, '_blank', 'noopener,noreferrer')
    navigate('/rooms')
  }

  return (
    <div className='RoomCreation'>
      <form onSubmit={handleRoomCreation}>
        <label htmlFor='movie'>
          Movie
          <input type='text' name='movie' value={movie.title} disabled={true} />
        </label>
        <label htmlFor='name'>
          Room's Name
          <input type='text' name='name' />
        </label>
        <input type='submit' value='CREATE A ROOM' />
      </form>
    </div>
  )
}

export default RoomCreation
