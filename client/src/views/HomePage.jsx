import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const HomePage = () => {
  const [allResults, setAllResults] = useState([]); // Estado para almacenar todos los resultados
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('name'); // Tipo de ordenamiento (nombre por defecto)
  const [sortOrder, setSortOrder] = useState('asc'); // Sentido del orden (ascendente por defecto)
  const resultsPerPage = 15; // Número de resultados por página
  const [currentPage, setCurrentPage] = useState(1); // Página actual

  useEffect(() => {
    setCurrentPage(1); // Reiniciar a la primera página cuando cambien los filtros
    fetchGames();
  }, [sortBy, sortOrder]); // Eliminamos selectedGenre y selectedOrigin de las dependencias

  const fetchGames = async (page = currentPage) => {
    setLoading(true);
    try {
      const RAWG_API_KEY = '21cb772966be4374ab847401bfb8466d';
      const response = await axios.get('https://api.rawg.io/api/games', {
        params: {
          key: RAWG_API_KEY,
          dates: '2019-09-01,2019-09-30',
          platforms: '18,1,7',
          ordering: `${sortOrder === 'asc' ? '' : '-'}${sortBy}`, // Aplicar el tipo y sentido de ordenamiento
          page: page,
          page_size: resultsPerPage // Asegurar que cada solicitud obtenga solo 15 juegos
        }
      });

      const newResults = response.data.results || [];
      if (page === 1) {
        setAllResults(newResults);
        setSearchResults(newResults.slice(0, resultsPerPage)); // Mostrar solo los primeros 15 juegos en la primera página
      } else {
        setAllResults(prevResults => [...prevResults, ...newResults]);
        setSearchResults(prevResults => [...prevResults, ...newResults.slice(0, resultsPerPage)]); // Agregar los siguientes 15 juegos
      }
      setError(null);
      setCurrentPage(page); // Actualizar la página actual
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error al cargar los datos. Por favor, inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const RAWG_API_KEY = '21cb772966be4374ab847401bfb8466d';
      const response = await axios.get('https://api.rawg.io/api/games', {
        params: {
          key: RAWG_API_KEY,
          search: searchTerm,
          page: 1, // Resetear a la primera página al realizar una nueva búsqueda
          page_size: resultsPerPage // Cantidad de resultados por página
        }
      });

      const newResults = response.data.results || [];
      setAllResults(newResults);
      setSearchResults(newResults.slice(0, resultsPerPage)); // Mostrar solo los primeros 15 juegos
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error al cargar los datos. Por favor, inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const changeSortBy = (sortByValue) => {
    setSortBy(sortByValue);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    setSearchResults(allResults.slice(startIndex, endIndex));
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    fetchGames(nextPage); // Llamar a fetchGames con la página siguiente
  };

  const handleGoBack = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      handlePageChange(previousPage);
    }
  };

  return (
    <div>
      <h1>Página Principal</h1>
      <div>
        <div>
          <button onClick={() => changeSortBy('name')}>Ordenar por Nombre (A-Z)</button>
          <button onClick={() => changeSortBy('-name')}>Ordenar por Nombre (Z-A)</button>
          <button onClick={() => changeSortBy('rating')}>Ordenar por Rating (Menos a Más)</button>
          <button onClick={() => changeSortBy('-rating')}>Ordenar por Rating (Más a Menos)</button>
        </div>
        <SearchBar onSearch={handleSearch} />
        {error && <p>Error: {error}</p>}
        <h2>Resultados de la búsqueda:</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <div className="game-cards">
              {searchResults.map((game) => (
                <Link key={game.id} to={`/details/${game.id}`} className="game-card-link">
                  <div className="game-card">
                    <img src={game.background_image} alt={game.name} />
                    <h3>{game.name}</h3>
                    <p>Géneros: {game.genres.map(genre => genre.name).join(', ')}</p>
                  </div>
                </Link>
              ))}
            </div>
            {allResults.length > 0 && currentPage < 6 && (
              <button onClick={handleLoadMore}>Cargar más</button>
            )}
            {/* Mostrar botones de paginación */}
            <div>
              <button disabled={currentPage === 1} onClick={handleGoBack}>Página Anterior</button>
              {[...Array(Math.min(6, Math.ceil(allResults.length / resultsPerPage))).keys()].map(pageNumber => (
                <button key={pageNumber + 1} onClick={() => handlePageChange(pageNumber + 1)}>
                  {pageNumber + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;

