import React, { useState, useContext, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import axios from 'axios'

import config from '../../config'
import { AuthContext } from './AuthWrapper'

const SearchMovieContext = React.createContext()

const API_URL = config.API_URL

function SearchMovieWrapper({ children }) {
  const { token } = useContext(AuthContext)
  const { search } = useLocation()
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState(null)

  useEffect(() => {
    async function searchMovies() {
      const searchParams = new URLSearchParams(search)
      const searchValue = searchParams.get('search') || ''
      setSearchValue(searchValue)

      try {
        const { data } = await axios.get(API_URL + '/movies?s=' + searchValue, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setMovies(data)
      } catch (error) {
        console.error(error)
      }
    }

    if (search) searchMovies()

    return () => {}
  }, [search])

  return (
    <SearchMovieContext.Provider value={{ movies, searchValue }}>
      {children}
    </SearchMovieContext.Provider>
  )
}

export { SearchMovieWrapper, SearchMovieContext }
