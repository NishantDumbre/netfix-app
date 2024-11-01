import { useEffect } from "react"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { addTrailerVideo } from "../utils/moviesSlice"


const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch()
    const getMovieVideos = async () => {

        try {
            const data = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGRjNzY2YmU4NzA3NjVkMGIxN2M3YjA2MmQzZmRiZCIsIm5iZiI6MTczMDQ2MTgyMy4wMDkxNTcyLCJzdWIiOiI2NzFlNzE4ZWIzZDVjYmI4NDJmNDdjNTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8HZI6PZE_0ZSu4UatLCaoGRGyX5Q8uP7TfaEyVifaz8'
            })
            const filteredData = data.data.results.filter((video) => video.type === 'Trailer')
            const trailer = filteredData.length ? filteredData[0] : data[0]
            dispatch(addTrailerVideo(trailer))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovieVideos()
    }, [])
}

export default useMovieTrailer