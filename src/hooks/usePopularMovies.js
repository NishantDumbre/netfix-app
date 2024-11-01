import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import axios from "axios";

// custom hook to import popular movies list from TMDB
const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const getNowPlayingMovies = async () => {
        try {
            const request = await axios.get(
                "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                {
                    headers: {
                        accept: "application/json",
                        Authorization: process.env.REACT_APP_TMDB_API_TOKEN,
                    },
                }
            );
            dispatch(addPopularMovies(request.data.results));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getNowPlayingMovies();
    }, []);
};

export default useNowPlayingMovies;
