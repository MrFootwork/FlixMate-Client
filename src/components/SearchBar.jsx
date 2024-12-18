import './SearchBar.css'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [search, setSearch] = useState('')

  // Search
  async function handleSubmit(e) {
    if (e.key == 'Enter' && search) {
      await navigate('/browse?search=' + search)
      inputRef.current.blur()
    }

    if (e.key == 'Enter' && !search) {
      await navigate('/browse')
      inputRef.current.blur()
    }
  }

  // Focus and unfocus input (Ctrl+K / Escape)
  useEffect(() => {
    function handleKeyDown(event) {
      // Set focus on Search Bar
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault()
        inputRef.current.focus()
      }

      // Remove focus from Search Bar
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

  function handleFocus() {
    inputRef.current.select()
  }

  return (
    <div className='searchbar-container'>
      <div className='glas'>🔍</div>
      <input
        type='text'
        name='movieInput'
        id='movieInput'
        placeholder='Search here, e.g. Lord of the rings...'
        onKeyDown={handleSubmit}
        value={search}
        onChange={e => setSearch(e.target.value)}
        onFocus={handleFocus}
        ref={inputRef}
      />
      <div className='shortcut'>Ctrl+K</div>
    </div>
  )
}

export default SearchBar
