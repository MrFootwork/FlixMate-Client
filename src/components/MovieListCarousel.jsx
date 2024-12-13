import './MovieListCarousel.css'
import ReactModal from 'react-modal'
import RoomCreation from './RoomCreation'
import { useState } from 'react'

function MovieListCarousel({ movies }) {
  const [selected, setSelected] = useState(null)
  if (!Array.isArray(movies)) {
    return <div>Loading...</div>
  }

  function createRoom(movie) {
    console.log('creating Room for ' + movie.title)
    setSelected(movie)
  }

  return (
    <div className='carousel-component'>
      {movies &&
        movies.map((movie, i) => (
          <button
            key={movie.netflix_id}
            className='card'
            onClick={() => createRoom(movie)}
          >
            <img src={movie.img} alt={movie.title} />
          </button>
        ))}
      <ReactModal
        isOpen={selected}
        shouldCloseOnEsc={true}
        onRequestClose={() => setSelected(null)}
        style={{
          content: {
            width: '95%',
            maxWidth: '400px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        {selected && <RoomCreation movie={selected} />}
      </ReactModal>
    </div>
  )
}

export default MovieListCarousel
