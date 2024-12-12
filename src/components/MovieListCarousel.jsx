import './MovieListCarousel.css'

function MovieListCarousel({ movies }) {
  if (!Array.isArray(movies)) {
    return <div>Loading...</div>
  }

  function createRoom(movie) {
    console.log('creating Room for ' + movie.title)
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
    </div>
  )
}

export default MovieListCarousel
