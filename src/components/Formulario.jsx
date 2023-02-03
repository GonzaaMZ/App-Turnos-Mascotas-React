import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from 'prop-types'

const Formulario = ({ crearCita }) => {
  //Creacion de state de las citas
  const [cita, setCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const [error, setError] = useState(false);

  //Funcion que se ejecuta cada vez que el usuario escriba en el input
  const actualizarState = (e) => {
    setCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  //Extraer los valores de la cita
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  const submitCita = (e) => {
    e.preventDefault();

    //Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      console.log("Hay un error");
      setError(true);
      return;
    }
    setError(false);

    //Asignar id
    cita.id = uuidv4();
    // crear la cita
    crearCita(cita);

    // reinicar el form
    setCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2>Crear Turno</h2>

      {error ? (
        <p className="alerta-error">Todos los campos obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label>Sintomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar Turno
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;
