import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { addRecipe } from './reduxSettings/recipeReducer';

const RecipeForm = () => {
    const recipe = useSelector((state) => state.recipe);
    const dispatch = useDispatch();
    const [ingredient, setIngredient] = useState({ ingredientName: '', ingredientCalories: '', ingredientServing: '' });
    const [inputs, setInputs] = useState({ recipe: "", ingredients: [], calories: "",image:"" });
    const [edit,setEdit] = useState('')

    const handleRecipeChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleIngredientChange = (e) => {
        setIngredient({ ...ingredient, [e.target.name]: e.target.value });
    };

    const handleIngredientSubmit = (e) => {
        e.preventDefault();
        const newIngredients = [...inputs.ingredients, ingredient];
        const totalCals = newIngredients.reduce((total, ingredient) => total + (ingredient.ingredientCalories * ingredient.ingredientServing || 0), 0);
        setInputs({ ...inputs, ingredients: newIngredients, calories: totalCals });
        setIngredient({ ingredientName: '', ingredientCalories: '', ingredientServing: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addRecipe(inputs));
        setInputs({ recipe: "", ingredients: [], calories: "",image:"" });
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = inputs.ingredients.filter((x, i) => i !== index);
        const totalCalories = newIngredients.reduce((total, ingredient) => total + (ingredient.ingredientCalories * ingredient.ingredientServing), 0);
        setInputs({ ...inputs, ingredients: newIngredients, calories: totalCalories });
    };

    const handleEditIngredient = (index) => {
        console.log("Edit ingredient at index:", index);
    };

    useEffect(() => {
        console.log(inputs);
        console.log(recipe);
    }, [inputs, recipe]);

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Recipe Form</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Recipe</label>
                    <input type="text" onChange={handleRecipeChange} name="recipe" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter recipe name" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                    <input type="text" onChange={handleIngredientChange} value={ingredient.ingredientName} name="ingredientName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter ingredient name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Calories</label>
                        <input type="number" onChange={handleIngredientChange} value={ingredient.ingredientCalories} name="ingredientCalories" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter calories" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Serving</label>
                        <input type="number" onChange={handleIngredientChange} name="ingredientServing" value={ingredient.ingredientServing} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter serving size" />
                    </div>
                    
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image Url</label>
                    <input type="text" onChange={handleRecipeChange} value={inputs.image} name="image" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Insert Image Url" />
                </div>
                <div className="flex space-x-4">
                    <button type="button" onClick={handleIngredientSubmit} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Add Ingredient</button>
                    <button type="button" onClick={handleSubmit} className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Save Recipe</button>
                </div>
                <div className="mt-4">
                    {inputs.ingredients.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-700">Added Ingredients</h3>
                            {inputs.ingredients.map((x, i) => (
                                <div key={i} className="p-3 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">{x.ingredientName}</p>
                                        <p className="text-xs text-gray-500">{x.ingredientCalories} kcal · {x.ingredientServing} serving</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button type="button" onClick={() => handleEditIngredient(i)} className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">Edit</button>
                                        <button type="button" onClick={() => handleRemoveIngredient(i)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Remove</button>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                                <p className="text-sm font-medium text-gray-700">Total Calories: <span className="font-bold">{inputs.calories} kcal</span></p>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default RecipeForm;