import React, { useState, useRef, useEffect } from 'react';
import styles from '../Styles/Form.module.css';

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      imagen: file,
    });
  };
  const handleGenreChange = (event) => {
    const { options } = event.target;
    const selectedGenres = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      generos: selectedGenres,
    }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validaciones
    if (
      formData.nombre.trim() === '' ||
      (typeof formData.imagen === 'string' && formData.imagen.trim() === '') ||      formData.descripcion.trim() === '' ||
      formData.plataformas.trim() === '' ||
      formData.fechaLanzamiento.trim() === '' ||
      formData.rating.trim() === '' ||
      formData.generos.length === 0
    ) {
      alert('Por favor completa todos los campos');
      return;
    }

    const ratingValue = parseFloat(formData.rating);
    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      alert('El rating debe ser un número entre 0 y 5');
      return;
    }

    // Aquí puedes enviar los datos del formulario al servidor
    console.log('Formulario enviado:', formData);

    // Mostrar mensaje de confirmación
    setShowConfirmation(true);

    // Luego puedes reiniciar el estado del formulario después de unos segundos
    setTimeout(() => {
      setShowConfirmation(false);
      setFormData({
        nombre: '',
        imagen: '',
        descripcion: '',
        plataformas: '',
        fechaLanzamiento: '',
        rating: '',
        generos: [],
      });
    }, 3000); // Ocultar el mensaje de confirmación después de 3 segundos
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>CREAR NUEVO VIDEOJUEGO</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.heading}>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.heading}>Imagen:</label>
          <input type="file" name="imagen" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.heading}>Descripción:</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.heading}>Plataformas:</label>
          <input type="text" name="plataformas" value={formData.plataformas} onChange={handleInputChange} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.heading}>Fecha de Lanzamiento:</label>
          <input type="date" name="fechaLanzamiento" value={formData.fechaLanzamiento} onChange={handleInputChange} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.heading}>Rating:</label>
          <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} min="0" max="5" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.heading}>Géneros:</label>
          <div className={styles.formGroup} ref={dropdownRef}>
            <div onClick={toggleDropdown}>
              <span className={styles.heading}>Seleccionar géneros</span>
              <span>{isDropdownOpen ? '▲' : '▼'}</span>
            </div>
            {isDropdownOpen && (
              <select
                name="generos"
                multiple
                value={formData.generos}
                onChange={handleGenreChange}
                size="5"
              >
                <option value="accion">Acción</option>
                <option value="aventura">Aventura</option>
                <option value="estrategia">Estrategia</option>
                <option value="rol">Rol</option>
                <option value="deporte">Deporte</option>
                <option value="simulacion">Simulación</option>
              </select>
            )}
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>Crear Videojuego</button>
      </form>
      {showConfirmation && <p className={styles.confirmationMessage}>¡Videojuego creado!</p>}
    </div>
  );
};

export default Create;