import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from '../utils/openai'
import axios from "axios";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchTextRef = useRef(null)
  const dispatch = useDispatch()

  const searchMovieTMDB = async (movieName) =>{
    const result = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`)
    return result.data
  }

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchTextRef.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map(movieName => searchMovieTMDB(movieName))
    console.log(promiseArray)
    const tmdbResults = await Promise.all(promiseArray) 
    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}))
  }

  return (
    <div className="pt-[10%] flex justify-center ">
      <form className="w-1/2 bg-black grid grid-cols-12 p-4 rounded-md " onSubmit={(e) => e.preventDefault()}>
        <input
          className="col-span-9 p-2"
          placeholder={lang[langKey].gptSearchPlaceholder}
          ref={searchTextRef}
        />
        <button
          onClick={handleGptSearchClick}
          className="col-span-3 p-2 ml-3 bg-red-600 text-white rounded-md text-md"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
