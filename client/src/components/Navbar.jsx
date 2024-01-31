import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles['navbar-list']}>
        <li className={styles['navbar-item']}>
          <Link to="/" className={styles['navbar-link']}>Inicio</Link>
        </li>
        <li className={styles['navbar-item']}>
          <Link to="/home" className={styles['navbar-link']}>Home</Link>
        </li>
        <li className={styles['navbar-item']}>
          <Link to="/create" className={styles['navbar-link']}>Crear</Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
