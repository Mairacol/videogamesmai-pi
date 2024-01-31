import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function Badge({ info }) {
  return (
    <div className="badge">
      <span>{info}</span>
    </div>
  );
}

Badge.propTypes = {
  info: PropTypes.string.isRequired,
};

export function CardInfo({
  name, description, rating
}) {
  return (
    <aside>
      <h2 id="titulo">{name}</h2>
      <div className="card__info">
        <p>{description}</p>
        <p>Rating: {rating}</p>
      </div>
    </aside>
  );
}

CardInfo.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

const Card = (props) => {
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    // lógica para manejar cambios en la calificación (rating)
  }, [selectedRating]);

  const { id, name, description, image, onClose } = props;

  const handleRatingChange = (e) => {
    setSelectedRating(parseInt(e.target.value));
  };

  return (
    <Link to={`/details/${id}`} className="game-card-link">
      <article className="card">
        <button className='btn' onClick={() => onClose(parseInt(id, 10))}>X</button>

        <div className="card__img">
          <img src={image} alt={name} />
          <CardInfo
            name={name}
            description={description}
            rating={selectedRating}
          />
        </div>
        <br></br>
        {/* Componente para seleccionar la calificación (rating) */}
        <select value={selectedRating} onChange={handleRatingChange}>
          <option value="0">Seleccionar Rating</option>
          <option value="1">★☆☆☆☆</option>
          <option value="2">★★☆☆☆</option>
          <option value="3">★★★☆☆</option>
          <option value="4">★★★★☆</option>
          <option value="5">★★★★★</option>
        </select>
      </article>
    </Link>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Card
