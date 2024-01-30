import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [genreFilter, setGenreFilter] = useState(''); // Estado para el filtro de género
  const [sourceFilter, setSourceFilter] = useState(''); // Estado para el filtro de origen
  const [sortBy, setSortBy] = useState(''); // Estado para la opción de ordenación

  useEffect(() => {
    setCurrentPage(1); // Reseteamos la página actual cuando se cambia el término de búsqueda
  }, []);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.rawg.io/api/games?search=${searchTerm}&page=${currentPage}`);
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      const data = await response.json();
      let filteredResults = data.results || [];

      // Aplicar filtros
      if (genreFilter) {
        filteredResults = filteredResults.filter(game => game.genres.some(genre => genre.name === genreFilter));
      }
      if (sourceFilter) {
        filteredResults = filteredResults.filter(game => game.metacritic !== null); // Suponiendo que el origen de la API tiene una clasificación de Metacritic
      }

      // Aplicar ordenación
      if (sortBy === 'name') {
        filteredResults.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'rating') {
        filteredResults.sort((a, b) => (b.metacritic || 0) - (a.metacritic || 0));
      }

      setSearchResults(filteredResults);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResults([]);
      setError('Error al cargar los datos. Por favor, inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <h1>Página Principal</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p>Error: {error}</p>}
      <h2>Resultados de la búsqueda:</h2>
      <div>
        {/* Opciones de filtrado */}
        <label>
          Filtrar por género:
          <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
            <option value="">Todos</option>
            <option value="Action">Acción</option>
            <option value="Adventure">Aventura</option>
            {/* Agregar más opciones de género según sea necesario */}
          </select>
        </label>
        <label>
          Filtrar por origen:
          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
            <option value="">Todos</option>
            <option value="api">API</option>
            {/* Agregar más opciones de origen según sea necesario */}
          </select>
        </label>
        {/* Opciones de ordenación */}
        <button onClick={() => setSortBy('name')}>Ordenar por nombre</button>
        <button onClick={() => setSortBy('rating')}>Ordenar por rating</button>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="game-cards">
            {searchResults.map((game) => (
              <Link key={game.id} to={`/game/${game.id}`} className="game-card-link">
                <div className="game-card">
                  <img src={game.background_image} alt={game.name} />
                  <h3>{game.name}</h3>
                  <p>Géneros: {game.genres.map(genre => genre.name).join(', ')}</p>
                </div>
              </Link>
            ))}
          </div>
          {searchResults.length > 0 && (
            <button onClick={handleLoadMore}>Cargar más</button>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
