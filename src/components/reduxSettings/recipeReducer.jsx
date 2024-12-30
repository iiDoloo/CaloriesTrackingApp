import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    addRecipe(state,action) {
      console.log(action)
      return [...state,action.payload]
    },
    editRecipe(state, action) {
      console.log(action)
      return state.map((x,i)=>i==action.payload.recipeId?{...x,ingredients:
        x.ingredients.map((ingr,ingrId)=>ingrId==action.payload.ingredientId?action.payload.editIngredient:ingr)}:x)
    },
    removeRecipe(state,action){
      console.log(action)
      return state.filter((x,i)=>i!=action.payload.recipeId)
    },
    removeRecipeIngredient(state,action){
      console.log('remove payload',action)
      return state.map((x,i)=>i==action.payload.recipeId?{...x,ingredients:
        x.ingredients.filter((ingr,id)=>id!=action.payload.ingredientId)
      }:x)
    }
  },
})

export const {addRecipe,editRecipe,removeRecipeIngredient, removeRecipe} = recipeSlice.actions
export default recipeSlice.reducer