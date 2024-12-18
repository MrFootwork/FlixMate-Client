import { useContext } from 'react'
import './MessengerMessageCard.css'

import React from 'react'
import { AuthContext } from '../contexts/AuthWrapper'
import { useState, useEffect } from 'react'
import { formatDate } from '../utils/date'

/**
 * @typedef {Object} User
 * @property {string} _id - The unique identifier of the user. 
 * @property {string} email - The email of the user.
 * @property {string} name - The name of the user.
 * @property {string} picture - The URL of the user's profile picture.

 * @typedef {Object} Message
 * @property {string} createdAt - The ISO string representing when the message was created.
 * @property {string} updatedAt - The ISO string representing when the message was last updated.
 * @property {string} text - The content of the message.
 * @property {User} user - Information about the user who sent the message.
 * @property {string} _id - The unique identifier of the message.
 * @property {number} __v - The version key (e.g., for Mongoose documents).
 */

/**
 * A React functional component that processes a message.
 *
 * @param {{ message: Message }} props - The props for the component, including the message object.
 * @returns {JSX.Element} A rendered JSX element.
 */
function MessengerMessageCard({ message }) {
  const { user } = useContext(AuthContext)
  const [itsMe, setItsMe] = useState(false)
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    if (user) setItsMe(user._id === message.user._id)

    const wasUpdated =
      new Date(message.createdAt).toISOString() !==
      new Date(message.updatedAt).toISOString()

    if (wasUpdated) setUpdated(true)
  }, [])

  return (
    <div className={`message-block ${itsMe ? 'me' : ''}`}>
      <div className={`message-container`}>
        <p className='message-content'>
          {message.text} by {itsMe ? 'me' : message.user.name}
        </p>
      </div>
      <p className='message-time'>
        {updated
          ? `${formatDate(new Date(message.updatedAt))} (edited)`
          : formatDate(new Date(message.createdAt))}
      </p>
    </div>
  )
}

export default MessengerMessageCard
