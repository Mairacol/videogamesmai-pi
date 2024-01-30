// src/views/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <h1>Bienvenido a Videogames</h1>
            <p>¡Descubre todo lo que tenemos para ofrecerte!</p>
            <Link to="/home">
                <button>Ingresar</button>
            </Link>
        </div>
    );
};

export default LandingPage;
