import './ProfilePage.css'
import { useContext, useState } from 'react'
import axios from 'axios'

import config from '../../config'
import { AuthContext } from '../contexts/AuthWrapper'
import { MessageContext } from '../contexts/MessageWrapper'

const ProfilePage = () => {
  const { user, setUser, token, setToken } = useContext(AuthContext)
  const { setMessage } = useContext(MessageContext)

  const [formIsActive, setFormActivity] = useState(false)
  const [inputUser, setInputUser] = useState(user)
  const [inEditing, setEditing] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const buttonClicked = e.nativeEvent.submitter.name

    switch (buttonClicked) {
      case 'edit':
        setEditing(true)
        setFormActivity(true)
        break

      // TODO ask user for confirmation
      case 'delete':
        const userIdToDelete = user._id

        try {
          await deleteUser(userIdToDelete)

          // Notify extension about Logout
          document.dispatchEvent(new Event('FlixMateDisconnect'))

          // Userfeedback
          setMessage({
            type: 'good',
            message: `Succesfully deleted profile! 😢`,
          })

          // TODO use logout function from AuthContext instead
          // Unauthorize current user
          window.localStorage.removeItem('flixmateToken')
          await axios.post(
            config.API_URL + '/auth/logout',
            {},
            { withCredentials: true }
          )
          setToken(null)
          setUser(null)
        } catch (error) {
          console.error(`🚀 ~ handleSubmit ~ error:`, error)

          setMessage({
            type: 'bad',
            message:
              error.status === 404
                ? `User with ID ${userIdToDelete} doesn't exist.`
                : `Was not able to delete profile data.`,
          })
        }

        break

      case 'save':
        try {
          // Update user
          const updatedUser = await updateUser()
          setUser(updatedUser)

          // Renew token
          const newToken = await requestNewToken()
          window.localStorage.setItem('flixmateToken', newToken)
          setToken(newToken)

          // Notify extension
          const notifyExtension = new CustomEvent('FlixMateConnect', {
            detail: { jwt: newToken },
          })
          document.dispatchEvent(notifyExtension)

          setMessage({
            type: 'good',
            message: `Succesfully changed profile data!🎉`,
          })

          setEditing(false)
          setFormActivity(false)
        } catch (error) {
          console.error(`🚀 ~ handleSubmit ~ error:`, error)
          setMessage({
            type: 'bad',
            message: `Was not able to change profile data.`,
          })
        }

        break

      case 'cancel':
        setInputUser(user)
        setEditing(false)
        setFormActivity(false)
        break

      default:
        break
    }
  }

  async function requestNewToken() {
    try {
      const response = await axios.get(config.API_URL + '/auth/refresh-token', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
      console.assert(response.status === 200, response)

      const newToken = response.data.jwt

      return newToken
    } catch (error) {
      throw error
    }
  }

  async function deleteUser(userId) {
    try {
      const response = await axios.delete(`${config.API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      console.assert(response.status === 200, response)

      return response
    } catch (error) {
      throw error
    }
  }

  async function updateUser() {
    try {
      const response = await axios.put(
        `${config.API_URL}/users/${user._id}`,
        inputUser,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      )
      console.assert(response.status === 200, response)

      return response.data
    } catch (error) {
      throw error
    }
  }

  function handleInputChange(e) {
    setInputUser({ ...inputUser, [e.target.name]: e.target.value })
  }

  return (
    <div className='profilepage-container'>
      <header>
        <h1>Hello {user.name}</h1>
        <h2>Welcome to your profile!</h2>
      </header>

      <section className='form-container'>
        <form className='default' onSubmit={handleSubmit}>
          <label htmlFor='email'>
            Email
            <input
              type='text'
              name='email'
              disabled={!formIsActive}
              value={inputUser.email}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor='name'>
            Name
            <input
              type='text'
              name='name'
              disabled={!formIsActive}
              value={inputUser.name}
              onChange={handleInputChange}
            />
          </label>
          <div className='button-container'>
            {!inEditing && (
              <>
                <button name='edit'>Edit</button>
                <button name='delete'>Delete</button>
              </>
            )}
            {inEditing && (
              <>
                <button name='save'>Save</button>
                <button name='cancel'>Cancel</button>
              </>
            )}
          </div>
        </form>
      </section>
    </div>
  )
}

export default ProfilePage
