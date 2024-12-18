import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthWrapper'
import RoomCard from '../components/RoomCard'
import './RoomsListPage.css'

const API_URL = import.meta.env.VITE_API_URL

const RoomsListPage = () => {
  const [rooms, setRooms] = useState(null)
  const { token } = useContext(AuthContext)

  async function getRooms() {
    const { data } = await axios.get(API_URL + '/rooms', {
      headers: { Authorization: `Bearer ${token}` },
    })

    setRooms(data)
  }

  useEffect(() => {
    getRooms()
  }, [])

  return (
    <table className='RoomList'>
      <thead>
        <tr className='list-header-row'>
          <th>Room Name</th>
          <th>Owner</th>
          <th className='show'>Current Show</th>
          <th className='participants'>Viewers</th>
          <th className='dummy'></th>
          <th className='dummy'></th>
        </tr>
      </thead>

      <tbody>
        {rooms
          ? rooms.map(room => <RoomCard room={room} key={room._id} />)
          : 'Loading...'}
      </tbody>
    </table>
  )
}

export default RoomsListPage
