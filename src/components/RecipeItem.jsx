import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editRecipe, removeRecipe, removeRecipeIngredient } from './reduxSettings/recipeReducer';

const RecipeItem = () => {
    const [edit, setEdit] = useState("");
    const [editIngredient, setEditIngredient] = useState({});
    const recipe = useSelector((state) => state.recipe);
    const dispatch = useDispatch();

    const handleEdit = (ingredientId, recipeId) => {
        setEdit({ ...edit, recipeId: recipeId, ingredientId: ingredientId });
        setEditIngredient({
            ...editIngredient,
            ingredientName: recipe[recipeId].ingredients[ingredientId].ingredientName,
            ingredientCalories: recipe[recipeId].ingredients[ingredientId].ingredientCalories,
            ingredientServing: recipe[recipeId].ingredients[ingredientId].ingredientServing,
        });
    };

    const saveIngredientEdit = (e, recipeId, ingredientId) => {
        e.preventDefault();
        setEdit({ ...edit, recipeId: null, ingredientId: null });
        dispatch(editRecipe({ recipeId, ingredientId, editIngredient }));
    };

    const removeIngredient = (recipeId, ingredientId) => {
        dispatch(removeRecipeIngredient({ recipeId, ingredientId }));
    };

    const removeWholeRecipe = (recipeId)=>{
      dispatch(removeRecipe({recipeId}))
    }

    useEffect(() => {
        console.log(recipe);
    }, [recipe]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Recipes Items</h1>
            <p className="text-center text-gray-500 mb-2 ">Here you can Visualize, Edit and Remove Recipes and their ingredients</p>
            {recipe.length > 0 ? (
                <div className="space-y-6">
                    {recipe.map((x, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <img src={x.image == "" ? "https://www.eatingwell.com/thmb/088YHsNmHkUQ7iNGP4375MiAXOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_7866255_foods-you-should-eat-every-week-to-lose-weight_-04-d58e9c481bce4a29b47295baade4072d.jpg" : x.image} alt={x.recipe} className="w-20 h-20 object-cover rounded-lg" />
                                    <h2 className="text-2xl font-semibold text-gray-800">Recipe: {x.recipe}</h2>
                                </div>
                                <button onClick={()=>{removeWholeRecipe(i)}} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">❌</button>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-700 mb-3">Ingredients:</h3>
                                <ul className="space-y-2">
                                    {x.ingredients.map((ingr, id) => (
                                        (edit.recipeId == i && edit.ingredientId == id) ? (
                                            <form onSubmit={(e) => saveIngredientEdit(e, i, id)} className="flex space-x-2">
                                                <input type="text" value={editIngredient.ingredientName} name="ingredientName" onChange={(e) => setEditIngredient({ ...editIngredient, ingredientName: e.target.value })} placeholder="Ingredient" className="p-2 border border-gray-300 rounded-md flex-1" />
                                                <input type="text" value={editIngredient.ingredientCalories} name="ingredientCalories" onChange={(e) => setEditIngredient({ ...editIngredient, ingredientCalories: e.target.value })} placeholder="Calories" className="p-2 border border-gray-300 rounded-md flex-1" />
                                                <input type="text" value={editIngredient.ingredientServing} name="ingredientServing" onChange={(e) => setEditIngredient({ ...editIngredient, ingredientServing: e.target.value })} placeholder="Serving" className="p-2 border border-gray-300 rounded-md flex-1" />
                                                <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Save</button>
                                            </form>
                                        ) : (
                                            <li key={id} className="bg-white p-3 rounded-md shadow-sm flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800">{ingr.ingredientName}</p>
                                                    <p className="text-xs text-gray-500">{ingr.ingredientCalories} kcal · {ingr.ingredientServing} serving</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button onClick={() => handleEdit(id, i)} className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">Edit</button>
                                                    <button onClick={() => removeIngredient(i, id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Remove</button>
                                                </div>
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No recipes found. Add a recipe to get started!</p>
            )}
        </div>
    );
};

export default RecipeItem;