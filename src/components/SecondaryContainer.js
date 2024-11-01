import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies = useSelector(store => store.movies)

  return (
    <div className='bg-black'>
      <div className=' text-white -mt-52 relative z-20'>
      {movies && <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />}
      {movies && <MovieList title={'Comedy'} movies={movies.nowPlayingMovies} />}
      {movies && <MovieList title={'Popular'} movies={movies.popularMovies} />}
      {movies && <MovieList title={'Drama'} movies={movies.nowPlayingMovies} />}
    </div>
    </div>
  )
}

export default SecondaryContainer