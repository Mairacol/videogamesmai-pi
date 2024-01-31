// src/views/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Styles/LandingPage.module.css'

const LandingPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Bienvenido a Videogames</h1>
            <p className={styles.subheading}>¡Descubre todo lo que tenemos para ofrecerte!</p>
            <Link to="/home"  className={styles.link}>
                <button className={styles.button}>Ingresar</button>
            </Link>
        </div>
    );
};

export default LandingPage;
