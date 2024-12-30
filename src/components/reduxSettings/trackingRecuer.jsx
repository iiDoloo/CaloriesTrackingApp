import { createSlice } from '@reduxjs/toolkit'


const trackingReducer = createSlice({
  name: 'track',
  initialState : [],
  reducers: {
    trackRecipe(state,action){
        console.log(action)
        return [...state,action.payload]
    }
  },
})


export const {trackRecipe} = trackingReducer.actions
export default trackingReducer.reducer