import { useEffect } from "react"
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { addTrailerVideo } from "../utils/moviesSlice"
import { TMDB_API_TOKEN } from "../utils/constants"


const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch()

    const movieTrailers = useSelector(store =>store.movies.trailerVideo)

    const getMovieVideos = async () => {

        try {
            const data = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
                accept: 'application/json',
                Authorization: TMDB_API_TOKEN
            })
            const filteredData = data.data.results.filter((video) => video.type === 'Trailer')
            const trailer = filteredData.length ? filteredData[0] : data[0]
            dispatch(addTrailerVideo(trailer))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        !movieTrailers && getMovieVideos()
    }, [])
}

export default useMovieTrailer