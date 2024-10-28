import { useEffect } from "react"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { addTrailerVideo } from "../utils/moviesSlice"


const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch()
    const getMovieVideos = async () => {

        const data = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGRjNzY2YmU4NzA3NjVkMGIxN2M3YjA2MmQzZmRiZCIsIm5iZiI6MTczMDA0ODc5MS45ODk2MzMsInN1YiI6IjY3MWU3MThlYjNkNWNiYjg0MmY0N2M1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lWoPFEMSKceSVl_jl6wnPBoBJBaYbuVkDic72-eUrZc'
        })

        const filteredData = data.data.results.filter((video) => video.type === 'Trailer')
        const trailer = filteredData.length ? filteredData[0] : data[0]
        dispatch(addTrailerVideo(trailer))
    }

    useEffect(() => {
        getMovieVideos()
    }, [])
}

export default useMovieTrailer