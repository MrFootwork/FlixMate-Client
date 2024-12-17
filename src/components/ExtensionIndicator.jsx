import './ExtensionIndicator.css'
import icon from '../assets/images/extension.png'
import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { ThemeContext } from '../contexts/ThemeWrapper'

function ExtensionIndicator() {
  const { pathname } = useLocation()
  const [firstSlug, setFirstSlug] = useState('')
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    setFirstSlug(pathname.split('/')[1] || '')
  }, [pathname])

  function openInstallationGuide() {
    console.log('Opening installation guide...')
  }

  return (
    <>
      {Boolean(firstSlug) && (
        <button
          className='extension-image-container'
          onClick={openInstallationGuide}
        >
          <div className='background'></div>
          <img
            src={icon}
            alt='indicator for existence of extension'
            style={{
              filter: theme === 'dark' ? 'invert(1)' : 'invert(0)',
              transition: 'filter 0.1s ease',
            }}
          />
        </button>
      )}
    </>
  )
}

export default ExtensionIndicator
