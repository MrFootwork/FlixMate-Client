import axios from 'axios'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState, useMemo } from 'react'
import { AuthContext } from '../contexts/AuthWrapper'
import MovieListCarousel from '../components/MovieListCarousel'
import { useLocation } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

const MoviesPage = () => {
  const query = useQuery()
  const [movies, setMovies] = useState([])
  const { token } = useContext(AuthContext)
  console.log(query.get('s'))

  async function searchForMovies() {
    const { data } = await axios.get(API_URL + '/movies?s=' + query.get('s'), {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log('Found movies: ', data)
    setMovies(data)
  }

  useEffect(() => {
    searchForMovies()
  }, [query])

  return <div>{movies && <MovieListCarousel movies={movies} />}</div>
}

export default MoviesPage
