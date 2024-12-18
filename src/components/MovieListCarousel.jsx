import './MovieListCarousel.css'
import ReactModal from 'react-modal'
import RoomCreation from './RoomCreation'
import { useState } from 'react'
import Modal from './Modal'

function MovieListCarousel({ movies }) {
  const [selected, setSelected] = useState(false)

  function createRoom(movie) {
    console.log('creating Room for ' + movie.title)
    setSelected(movie)
  }

  function resetSelection() {
    setSelected(null)
  }

  // FIXME Build a real carousel
  // FIXME add loading spinner
  return (
    <div className='carousel-component'>
      {!movies.length ? (
        <div>Loading...</div>
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

export default MovieListCarousel
