import React from 'react';
import {Link} from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex-shrink-0">
                        <Link className="text-xl font-bold text-gray-800" to="/">RecipeApp</Link>
                    </div>

                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-gray-800 hover:text-blue-500 font-medium">RecipeApp</Link>
                        <Link to="/form" className="text-gray-800 hover:text-blue-500 font-medium">RecipeForm</Link>
                        <Link to="/list" className="text-gray-800 hover:text-blue-500 font-medium">RecipeList</Link>
                        <Link to="/item" className="text-gray-800 hover:text-blue-500 font-medium">RecipeItem</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;