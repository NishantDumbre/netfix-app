import React from 'react'
import {IMG_CDN_URL} from '../utils/constants'

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-40 mr-5'>
        <img alt='movie name' src={IMG_CDN_URL + posterPath} />
    </div>
  )
}

export default MovieCard