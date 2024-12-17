import { useNavigate } from 'react-router-dom'
import './SearchBar.css'

import React from 'react'
import { useEffect, useRef } from 'react'

function SearchBar() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    if (e.key == 'Enter') navigate('/search?s=' + e.target.value)
  }

  // Ctrl + K: Focus Input Field
  const inputRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault()
        inputRef.current.focus()
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        inputRef.current.blur()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className='searchbar-container'>
      <div className='glas'>🔍</div>
      <input
        type='text'
        name='movieInput'
        id='movieInput'
        placeholder='Type the title of your favourite movie here...'
        onKeyDown={handleSubmit}
        ref={inputRef}
      />
      <div className='shortcut'>Ctrl+K</div>
    </div>
  )
}

export default SearchBar
