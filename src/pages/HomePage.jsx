import './HomePage.css'
import config from '../../config'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'

import { AuthContext } from '../contexts/AuthWrapper'
import { SearchMovieContext } from '../contexts/SearchMovieWrapper'

import MovieList from '../components/MovieList'
import MovieCarousel from '../components/MovieCarousel'

const HomePage = () => {
  const [movies, setMovies] = useState(null)
  const { token } = useContext(AuthContext)
  const { movies: searchMovies, searchValue } = useContext(SearchMovieContext)

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
      {searchMovies.length ? (
        <>
          <h2>Search results for "{searchValue}"</h2>
          <MovieList movies={searchMovies} />
        </>
      ) : (
        <></>
      )}
      <h2>Top Picks</h2>
      {movies && <MovieCarousel movies={movies} />}
      {/* {movies && <MovieList movies={movies} />} */}
    </div>
  )
}

export default HomePage

// ATTRIBUTIONS
// Extension Icon: <a href="https://www.flaticon.com/free-icons/puzzle" title="puzzle icons">Puzzle icons created by Google - Flaticon</a>
// Profile Image: <a href="https://www.flaticon.com/free-icons/female" title="female icons">Female icons created by Prosymbols Premium - Flaticon</a>
// FM Logo: <a href="https://www.flaticon.com/free-icons/fm-tuner" title="fm tuner icons">Fm tuner icons created by Freepik - Flaticon</a>
