import React, { useEffect } from 'react'
import { addNowPlayingMovies } from '../utils/moviesSlice'
import Header from './Header'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const Browse = () => {

  const dispatch = useDispatch()
  const moviesRedux = useSelector((store)=>store.movies)

  const getNowPlayingMovies = async () => {
    const request = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGRjNzY2YmU4NzA3NjVkMGIxN2M3YjA2MmQzZmRiZCIsIm5iZiI6MTczMDA0ODc5MS45ODk2MzMsInN1YiI6IjY3MWU3MThlYjNkNWNiYjg0MmY0N2M1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lWoPFEMSKceSVl_jl6wnPBoBJBaYbuVkDic72-eUrZc'
      }
    })
    console.log(request.data)
    dispatch(addNowPlayingMovies(request.data))
  }

  useEffect(()=>{
    getNowPlayingMovies()
  }, [])

  return (
    <div>
      <Header />
    </div>
  )
}

export default Browse