import './HomePage.css'
import config from '../../config'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'

import { AuthContext } from '../contexts/AuthWrapper'
import { SearchMovieContext } from '../contexts/SearchMovieWrapper'

import MovieList from '../components/MovieList'
import MovieCarousel from '../components/MovieCarousel'
import LoadingSpinner from '../components/LoadingSpinner'

const HomePage = () => {
  const { token } = useContext(AuthContext)

  // Search for Title
  const {
    movies: searchMovies,
    searchValue,
    loading: searchIsLoading,
    isSearching,
  } = useContext(SearchMovieContext)

  // Top Picks
  const [topPicks, setTopPicks] = useState(null)
  const [topPicksLoading, setTopPicksLoading] = useState(true)

  useEffect(() => {
    axios
      .get(config.API_URL + '/movies/top-picks', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setTimeout(() => {
          setTopPicks(response.data)
          setTopPicksLoading(false)
        }, 500 + Math.random() * 1000)
      })
      .catch(err => {
        console.error(err)
      })

    getActionMovies()
    getComedyBlockBusters()
  }, [])

  // Action Movies
  const [actionMovies, setActionMovies] = useState(null)
  const [actionLoading, setActionLoading] = useState(true)

  async function getActionMovies() {
    const { data } = await axios.get(config.API_URL + '/movies/action', {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })

    setActionMovies(data.results)
    setActionLoading(false)
  }

  // Block Busters
  const [comedyBlockbusters, setComedyBlockbusters] = useState(null)
  const [comedyLoading, setComedyLoading] = useState(true)

  async function getComedyBlockBusters() {
    const { data } = await axios.get(
      config.API_URL + '/movies/comedy-blockbusters',
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    setComedyBlockbusters(data.results)
    setComedyLoading(false)
  }

  return (
    <div className='homepage-container'>
      {!isSearching ? (
        <></>
      ) : (
        <>
          <h2>Search results for "{searchValue}"</h2>
          <MovieList movies={searchMovies} isLoading={searchIsLoading} />
        </>
      )}

      <h2>Top Picks</h2>
      {topPicksLoading ? (
        <div className='loading-container'>
          <LoadingSpinner loading={topPicksLoading} />
        </div>
      ) : (
        <MovieCarousel movies={topPicks} />
      )}

      <h2>Action</h2>
      {actionLoading ? (
        <div className='loading-container'>
          <LoadingSpinner loading={actionLoading} />
        </div>
      ) : (
        <MovieCarousel movies={actionMovies} />
      )}

      <h2>Comedy Blockbusters</h2>
      {comedyLoading ? (
        <div className='loading-container'>
          <LoadingSpinner loading={comedyLoading} />
        </div>
      ) : (
        <MovieCarousel movies={comedyBlockbusters} />
      )}
    </div>
  )
}

export default HomePage

// ATTRIBUTIONS
// Extension Icon: <a href="https://www.flaticon.com/free-icons/puzzle" title="puzzle icons">Puzzle icons created by Google - Flaticon</a>
// Profile Image: <a href="https://www.flaticon.com/free-icons/female" title="female icons">Female icons created by Prosymbols Premium - Flaticon</a>
// FM Logo: <a href="https://www.flaticon.com/free-icons/fm-tuner" title="fm tuner icons">Fm tuner icons created by Freepik - Flaticon</a>
// Participants Icon: <a target="_blank" href="https://icons8.com/icon/VlSPAotgzcER/conference-foreground-selected">Conference Foreground Selected</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
