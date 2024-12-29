import { useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './components/reduxSettings/store';
import RecipeTracker from './components/RecipeTracker';
import RecipeForm from './components/RecipeForm';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeItem from './components/RecipeItem';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<RecipeTracker />} />
                        <Route path="/list" element={<RecipeList />} />
                        <Route path="/form" element={<RecipeForm />} />
                        <Route path="/item" element={<RecipeItem />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;