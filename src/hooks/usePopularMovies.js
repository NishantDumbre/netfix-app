import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import axios from "axios";
import { TMDB_API_TOKEN } from "../utils/constants";

// custom hook to import popular movies list from TMDB
const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(store=>store.movies.popularMovies)
    const getNowPlayingMovies = async () => {
        try {
            const request = await axios.get(
                "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                {
                    headers: {
                        accept: "application/json",
                        Authorization: TMDB_API_TOKEN
                    },
                }
            );
            dispatch(addPopularMovies(request.data.results));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        !popularMovies && getNowPlayingMovies();
    }, []);
};

export default useNowPlayingMovies;
