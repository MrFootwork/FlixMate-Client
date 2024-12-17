import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthWrapper'
import ExtensionIndicator from '../components/ExtensionIndicator'
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
    console.log(data)
    setRooms(data)
  }

  useEffect(() => {
    getRooms()
  }, [])

  return (
    <table className='RoomList'>
      {/* FIXME place on app and exclude landing page and auth */}
      <ExtensionIndicator />

      <tr className='list-header-row'>
        <th>Room Name</th>
        <th>Owner</th>
        <th className='show'>Current Show</th>
        <th className='participants'>Viewers</th>
        <th className='dummy'></th>
        <th className='dummy'></th>
      </tr>

      {rooms
        ? rooms.map(room => <RoomCard room={room} key={room._id} />)
        : 'Loading...'}
    </table>
  )
}

export default RoomsListPage
