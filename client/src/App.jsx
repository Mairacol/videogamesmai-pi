// En app.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './views/LandingPage';
import HomePage from './views/HomePage';
import Create from './views/Create';
import Details from './views/Details';
import Styles from './Styles/App.module.css'

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
