import React, { useState } from 'react';

const Create = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    imagen: '',
    descripcion: '',
    plataformas: '',
    fechaLanzamiento: '',
    rating: '',
    generos: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Realizar aquí las validaciones con JavaScript
    // Por ejemplo, validar que los campos no estén vacíos
    if (formData.nombre.trim() === '' || formData.imagen.trim() === '' || formData.descripcion.trim() === '' || formData.plataformas.trim() === '' || formData.fechaLanzamiento.trim() === '' || formData.rating.trim() === '') {
      alert('Por favor completa todos los campos');
      return;
    }
    // Aquí puedes enviar los datos del formulario al servidor
    console.log('Formulario enviado:', formData);
    // Luego puedes reiniciar el estado del formulario
    setFormData({
      nombre: '',
      imagen: '',
      descripcion: '',
      plataformas: '',
      fechaLanzamiento: '',
      rating: '',
      generos: [],
    });
  };

  return (
    <div>
      <h2>Crear Nuevo Videojuego</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
        </div>
        <div>
          <label>Imagen:</label>
          <input type="text" name="imagen" value={formData.imagen} onChange={handleInputChange} />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
        </div>
        <div>
          <label>Plataformas:</label>
          <input type="text" name="plataformas" value={formData.plataformas} onChange={handleInputChange} />
        </div>
        <div>
          <label>Fecha de Lanzamiento:</label>
          <input type="date" name="fechaLanzamiento" value={formData.fechaLanzamiento} onChange={handleInputChange} />
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} />
        </div>
        <div>
          <label>Géneros:</label>
          {/* Aquí puedes agregar lógica para seleccionar/agregar varios géneros */}
        </div>
        <button type="submit">Crear Videojuego</button>
      </form>
    </div>
  );
};

export default Create;
