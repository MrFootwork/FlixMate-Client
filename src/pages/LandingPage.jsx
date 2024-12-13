import './LandingPage.css'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthWrapper'
import { useState } from 'react'

const deafultLinkContent = { path: '/auth', caption: 'Login' }

const LandingPage = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [linkContent, setLinkContent] = useState(deafultLinkContent)

  useEffect(() => {
    if (user) setLinkContent({ path: '/browse', caption: 'Enter FlixMate' })
    if (!user) setLinkContent(deafultLinkContent)
  }, [user])

  return (
    <div className='landingpage'>
      <header>
        <h1>FlixMate</h1>
        <h2>Share the joy of watching your favourite shows.</h2>
      </header>
      <section>
        <Link to={linkContent.path} className='button'>
          {linkContent.caption}
        </Link>
      </section>
    </div>
  )
}

export default LandingPage
