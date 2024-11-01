import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import axios from "axios";
import { TMDB_API_TOKEN } from "../utils/constants";

// custom hook to import now playing movies list from TMDB
const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector(store=>store.movies.nowPlayingMovies)

    const getNowPlayingMovies = async () => {
        try {
            const request = await axios.get(
                "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
                {
                    headers: {
                        accept: "application/json",
                        Authorization: TMDB_API_TOKEN
                    },
                }
            );
            dispatch(addNowPlayingMovies(request.data.results));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        !nowPlayingMovies && getNowPlayingMovies();
    }, []);
};

export default useNowPlayingMovies;
