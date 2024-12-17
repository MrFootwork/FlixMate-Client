import './HomePage.css'
import axios from 'axios'
import config from '../../config'
import { useState, useEffect, useContext } from 'react'

import ExtensionIndicator from '../components/ExtensionIndicator'
import MovieListCarousel from '../components/MovieListCarousel'

import { AuthContext } from '../contexts/AuthWrapper'
import { SearchMovieContext } from '../contexts/SearchMovieWrapper'

const HomePage = () => {
  const [movies, setMovies] = useState({})
  const { token } = useContext(AuthContext)
  const { movies: searchMovies } = useContext(SearchMovieContext)

  useEffect(() => {
    axios
      .get(config.API_URL + '/movies/top-picks', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setMovies(response.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <div className='homepage-container'>
      {searchMovies && (
        <>
          <h2>Search Results</h2>
          <MovieListCarousel movies={searchMovies} />
        </>
      )}
      <h2>Top Picks</h2>
      {movies && <MovieListCarousel movies={movies} />}
      {/* FIXME move this to app */}
      <ExtensionIndicator />
    </div>
  )
}

export default HomePage

// ATTRIBUTIONS
// Extension Icon: <a href="https://www.flaticon.com/free-icons/puzzle" title="puzzle icons">Puzzle icons created by Google - Flaticon</a>
// Profile Image: <a href="https://www.flaticon.com/free-icons/female" title="female icons">Female icons created by Prosymbols Premium - Flaticon</a>
// FM Logo: <a href="https://www.flaticon.com/free-icons/fm-tuner" title="fm tuner icons">Fm tuner icons created by Freepik - Flaticon</a>
