import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
        movieNames: null,
        movieResults: null
    },
    reducers: {
        toggleGptSearchView: (state, action) => {
            state.showGptSearch = !state.showGptSearch
        },
        addGptMovieResult: (state, action) =>{
            state.movieNames = action.payload.movieNames
            state.movieResults = action.payload.movieResults
        }
    }
})


export const { toggleGptSearchView, addGptMovieResult } = gptSlice.actions

export default gptSlice.reducer