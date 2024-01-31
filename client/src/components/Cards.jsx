import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import './styles/StyleCards.css';

function Cards({ games, onClose }) {
  // Comprobación de duplicados
  const hasDuplicates = new Set(games.map((game) => game.id)).size !== games.length;

  if (hasDuplicates) {
    console.error("Hay identificadores duplicados en el arreglo de juegos.");
  }

  return (
    <div className="card-container">
      {games.map((game) => (
        <Card
          key={game.id}
          id={game.id}
          name={game.name}
          description={game.description}
          rating={game.rating}
          image={game.image}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

Cards.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Cards
