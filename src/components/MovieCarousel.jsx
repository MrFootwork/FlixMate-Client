import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import './MovieCarousel.css'

import { useState } from 'react'

import Modal from './Modal'
import RoomCreation from './RoomCreation'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
    slidesToSlide: 3,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 1500 },
    items: 6,
    slidesToSlide: 3,
  },
  desktop: {
    breakpoint: { max: 1500, min: 1024 },
    items: 5,
    slidesToSlide: 3,
  },
  four: {
    breakpoint: { max: 1024, min: 850 },
    items: 4,
    slidesToSlide: 2,
  },
  three: {
    breakpoint: { max: 850, min: 580 },
    items: 3,
    slidesToSlide: 2,
  },
  two: {
    breakpoint: { max: 580, min: 420 },
    items: 2,
    slidesToSlide: 2,
  },
  one: {
    breakpoint: { max: 420, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
}

function MovieCarousel({ movies }) {
  const [selected, setSelected] = useState(false)

  function createRoom(movie) {
    console.log('creating Room for ' + movie.title)
    setSelected(movie)
  }

  function resetSelection() {
    setSelected(null)
  }

  return (
    <div className='Carousel'>
      <Carousel responsive={responsive} swipeable={true} centerMode={true}>
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
      </Carousel>
      <Modal isOpen={selected} close={resetSelection}>
        {selected && <RoomCreation movie={selected} />}
      </Modal>
    </div>
  )
}

export default MovieCarousel
