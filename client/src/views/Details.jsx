import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Details = () => {
  // Obtenemos el id del videojuego de los parámetros de la ruta
  const { id } = useParams();

  // Estado local para almacenar la información del videojuego
  const [gameDetails, setGameDetails] = useState({});
  const [loading, setLoading] = useState(true);

  // Efecto que se ejecuta al montar el componente y cada vez que cambia el id
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const RAWG_API_KEY = '21cb772966be4374ab847401bfb8466d'; // Reemplaza 'tu_api_key_aqui' con tu propia API key
        const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
          params: {
            key: RAWG_API_KEY,
            dates: '2019-09-01,2019-09-30',
            platforms: '18,1,7'
          }
        });
        setGameDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setLoading(false);
      }
    };

    fetchGameDetails();

    // Limpiamos el estado local al desmontar el componente o cuando cambia el id
    return () => {
      setGameDetails({});
    };
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      {/* Mostramos la información del videojuego */}
      <h2>{gameDetails.name}</h2>
      <img src={gameDetails.background_image} alt={gameDetails.name} />
      <p>Plataformas: {gameDetails.platforms.map(platform => platform.platform.name).join(', ')}</p>
      <p>Descripción: {gameDetails.description_raw}</p>
      <p>Fecha de lanzamiento: {gameDetails.released}</p>
      <p>Rating: {gameDetails.rating}</p>
      <p>Géneros: {gameDetails.genres.map(genre => genre.name).join(', ')}</p>
    </div>
  );
};

export default Details;
