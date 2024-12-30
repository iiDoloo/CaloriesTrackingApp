import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trackRecipe } from './reduxSettings/trackingRecuer';

const RecipeList = () => {
    const recipe = useSelector((state) => state.recipe);
    const [searchBar, setSearchBar] = useState("");
    const [filterValue, setFilterValue] = useState('');
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(filterValue);
    }, [filterValue]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Recipe List</h1>
            <p className="text-center text-gray-500 mb-2">Here you can look up your favorite recipes, filter and track them!</p>
            <div className="mb-8">
                <input
                    type="text"
                    value={searchBar}
                    onChange={(e) => setSearchBar(e.target.value)}
                    placeholder="Search for a recipe..."
                    className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg"
                />
            </div>
            <div className="flex space-x-4 mb-8">
                <button onClick={() => setFilterValue('breakfast')} className="flex-1 px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500">Breakfast</button>
                <button onClick={() => setFilterValue('lunch')} className="flex-1 px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500">Lunch</button>
                <button onClick={() => setFilterValue('dinner')} className="flex-1 px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500">Dinner</button>
                <button onClick={() => setFilterValue('dessert')} className="flex-1 px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500">Dessert</button>
                <button onClick={() => setFilterValue('other')} className="flex-1 px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500">Other</button>
            </div>
            {recipe.length > 0 ? (
                <div className="space-y-8">
                    {recipe
                        .filter((x) => (filterValue === '' || x.mealType.toLowerCase() === filterValue.toLowerCase()) &&
                            x.recipe.toLowerCase().includes(searchBar.toLowerCase()))
                        .map((x, i) => (
                            <div key={i} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-xl p-6 border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-6">
                                        <img
                                            src={x.image === "" ? "https://www.eatingwell.com/thmb/088YHsNmHkUQ7iNGP4375MiAXOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_7866255_foods-you-should-eat-every-week-to-lose-weight_-04-d58e9c481bce4a29b47295baade4072d.jpg" : x.image}
                                            alt={x.recipe}
                                            className="w-24 h-24 object-cover rounded-lg shadow-md"
                                        />
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">{x.recipe}</h2>
                                            <p className="text-sm text-gray-600">{x.mealType}</p>
                                        </div>
                                    </div>
                                    <button onClick={()=>{dispatch(trackRecipe(x))}} className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500">Track</button>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-inner">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Ingredients:</h3>
                                    <ul className="space-y-3">
                                        {x.ingredients.map((ingr, id) => (
                                            <li key={id} className="text-sm text-gray-700">
                                                {ingr.ingredientName} - {ingr.ingredientCalories} kcal · {ingr.ingredientServing} serving
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-6 p-4 bg-white rounded-lg shadow-inner">
                                    <p className="text-lg font-medium text-gray-700">Total Calories: <span className="font-bold">{x.calories} kcal</span></p>
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

export default RecipeList;