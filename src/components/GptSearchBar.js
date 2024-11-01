import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  console.log(langKey)
  console.log(lang[langKey])

  return (
    <div className="pt-[10%] flex justify-center ">
      <form className="w-1/2 bg-black grid grid-cols-12 p-4 rounded-md ">
        <input
          className="col-span-9 p-2"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          type="submit"
          className="col-span-3 p-2 ml-3 bg-red-600 text-white rounded-md text-md"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
