import { configureStore } from '@reduxjs/toolkit'

import recipeReducer from './recipeReducer'
import trackingReducer from './trackingRecuer'

const store = configureStore({ reducer: {recipe :recipeReducer,track:trackingReducer} })

export default store