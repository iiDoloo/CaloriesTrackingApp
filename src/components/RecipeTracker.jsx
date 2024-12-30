import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const RecipeTracker = () => {
    const recipe = useSelector((state) => state.recipe);
    const trackedRecipes = useSelector((state)=>state.track)
    console.log(trackedRecipes)
    const dispatch = useDispatch();
    const total_calories = trackedRecipes.reduce((prev, curr) => prev + curr.calories, 0);
    console.log(total_calories)

    return (
        <div className="max-w-4xl mt-8 mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center bg-yellow-400 text-white py-2 px-4 rounded-lg">Recipe Tracker</h2>
            <h3 className="text-xl font-bold  text-center">Your Recipes of the Day : </h3>
            <p className="text-center text-gray-500 mb-2 ">Total Calories : {total_calories}</p>
            {trackedRecipes.length > 0 ? (
                <div className="space-y-4">
                    {trackedRecipes.map((x, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                            <img src={x.image!=""?x.image:"https://www.eatingwell.com/thmb/088YHsNmHkUQ7iNGP4375MiAXOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_7866255_foods-you-should-eat-every-week-to-lose-weight_-04-d58e9c481bce4a29b47295baade4072d.jpg"} className="w-full h-48 object-cover rounded-lg mb-4"/>
                            <h2 className="text-lg font-semibold text-gray-700">{x.recipe}</h2>
                            <div className="mt-2">
                                <h4 className="text-sm font-medium text-gray-600">Ingredients:</h4>
                                <ul className="list-disc list-inside mt-1">
                                    {x.ingredients.map((ingredient, idx) => (
                                        <li key={idx} className="text-sm text-gray-500">
                                            {ingredient.ingredientName} - {ingredient.ingredientCalories} kcal · {ingredient.ingredientServing} serving
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                                <p className="text-sm font-medium text-gray-700">
                                    Total Calories: <span className="font-bold">{x.calories} kcal</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) :<p className="text-center mt-9 text-gray-500">No recipes found. Add and track a recipe to get started!</p>
            }
        </div>
    );
};

export default RecipeTracker;