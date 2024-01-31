import React, { useState } from 'react';
import styles from '../Styles/HomePage.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para realizar la búsqueda, por ejemplo, pasando el término de búsqueda al componente padre
    onSearch(searchTerm);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
      className={styles.searchInput}
        type="text"
        placeholder="Buscar videojuego..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button className={styles.searchButton}  type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;
