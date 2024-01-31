// En un archivo llamado rawgApi.js

import axios from 'axios';

const RAWG_API_BASE_URL = 'https://api.rawg.io/api/games';
const RAWG_API_KEY = '21cb772966be4374ab847401bfb8466d';
const RAWG_API_PARAMS = 'dates=2019-09-01,2019-09-30&platforms=18,1,7';

export const fetchGameDetails = async (gameId) => {
  try {
    const response = await axios(`${RAWG_API_BASE_URL}/${gameId}?key=${RAWG_API_KEY}&${RAWG_API_PARAMS}`);
    return response.data;
  } catch (error) {
    console.error('Error al llamar a la API de RAWG:', error);
    throw error; // Propaga el error para que el componente que llama pueda manejarlo si es necesario
  }
};
