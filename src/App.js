import React, {Fragment, useEffect, useState} from 'react'
import Cita from './components/Cita';
import Formulario from './components/Formulario';

function App() {

  //citas  en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas')); 
  if(!citasIniciales){
    citasIniciales = []
  }
  
  //Array de citas
  const [citas, setCitas] = useState(citasIniciales)

  //useEffect para realizar operacion cuando state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas')); 
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas]) //array vacio para indicar que se ejecute solo 1 vez

  const crearCita = cita => {
    setCitas([
      ...citas,
      cita
    ])
  }

 const eliminarCita = (id) => {
  const nuevasCitas = citas.filter(cita => cita.id !== id)
  setCitas(nuevasCitas)
 }

 const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario
            crearCita={crearCita}
            />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
              cita={cita}
              key={cita.id}
              eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
