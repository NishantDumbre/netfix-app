import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addNowPlayingMovies } from '../utils/moviesSlice'
import axios from 'axios'


// custom hook to import now playing movies list from TMDB
const useNowPlayingMovies = () => {
    const dispatch = useDispatch()
    const getNowPlayingMovies = async () => {
        const request = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
            headers: {
                accept: 'application/json',
                Authorization: process.env.REACT_APP_TMDB_API_TOKEN
            }
        })
        console.log(request.data)
        dispatch(addNowPlayingMovies(request.data))
    }

    useEffect(() => {
        getNowPlayingMovies()
    }, [])
}

export default useNowPlayingMovies