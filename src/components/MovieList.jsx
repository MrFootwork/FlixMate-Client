import './MovieList.css'
import { useState } from 'react'

import Modal from './Modal'
import RoomCreation from './RoomCreation'
import LoadingSpinner from './LoadingSpinner'

function MovieList({ movies, loading }) {
  const [selected, setSelected] = useState(false)

  function createRoom(movie) {
    console.log('creating Room for ' + movie.title)
    setSelected(movie)
  }

  function resetSelection() {
    setSelected(null)
  }

  return (
    <div className='carousel-component'>
      {!movies?.length ? (
        <div className='loading-container'>
          <LoadingSpinner loading={loading} />
        </div>
      ) : (
        movies.map((movie, i) => (
          <button
            key={movie.netflix_id}
            className='card'
            onClick={() => createRoom(movie)}
          >
            <img src={movie.img} alt={movie.title} />
          </button>
        ))
      )}

      <Modal isOpen={selected} close={resetSelection}>
        {selected && <RoomCreation movie={selected} />}
      </Modal>
    </div>
  )
}

export default MovieList
