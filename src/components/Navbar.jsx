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
                        <Link to="/" className="text-gray-800 hover:text-blue-500 font-medium">Tracker</Link>
                        <Link to="/form" className="text-gray-800 hover:text-blue-500 font-medium">Form</Link>
                        <Link to="/list" className="text-gray-800 hover:text-blue-500 font-medium">List</Link>
                        <Link to="/item" className="text-gray-800 hover:text-blue-500 font-medium">Items</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;