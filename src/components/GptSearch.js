import React from 'react'
import { BG_URL } from '../utils/constants'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'

const GptSearch = () => {
  return (
    <div>
        <div className='absolute -z-10'>
            <img alt='background' src={BG_URL} />
        </div>
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch