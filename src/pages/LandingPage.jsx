import './LandingPage.css'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthWrapper'
import { useState } from 'react'

const LandingPage = () => {
  const { user } = useContext(AuthContext)

  const [linkContent, setLinkContent] = useState({
    path: '/auth',
    caption: 'Login',
  })

  useEffect(() => {
    if (user) setLinkContent({ path: '/browse', caption: 'Enter FlixMate' })
    if (!user) setLinkContent({ path: '/auth', caption: 'Login' })
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
