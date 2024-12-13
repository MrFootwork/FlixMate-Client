import { useState, useEffect } from 'react'
import config from '../../config'
import ExtensionIndicator from '../components/ExtensionIndicator'
import './HomePage.css'
import axios from 'axios'
import MovieListCarousel from '../components/MovieListCarousel'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthWrapper'

const HomePage = () => {
  const [movies, setMovies] = useState({})
  const { token } = useContext(AuthContext)

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
      <h2>Top Picks</h2>
      {movies && <MovieListCarousel movies={movies} />}
      <ExtensionIndicator />
    </div>
  )
}

export default HomePage

// ATTRIBUTIONS
// Extension Icon: <a href="https://www.flaticon.com/free-icons/puzzle" title="puzzle icons">Puzzle icons created by Google - Flaticon</a>
// Profile Image: <a href="https://www.flaticon.com/free-icons/female" title="female icons">Female icons created by Prosymbols Premium - Flaticon</a>
// FM Logo: <a href="https://www.flaticon.com/free-icons/fm-tuner" title="fm tuner icons">Fm tuner icons created by Freepik - Flaticon</a>
