import React, { useEffect, useState } from 'react'
import Formulario from './components/Formulario'
import axios from 'axios'
import Cancion from './components/Cancion'
import Info from './components/Info'

const App = () => {

  //definir el state
  const [busquedaletra, setBusquedaletra] = useState({})
  const [letra, setLetra] = useState('');
  const [informacion, setInformacion] = useState({});

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaletra;

      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      //Ambas inician al mismo tiempo pero cada una va a terminar cuando finalice de descargartodos sus datos
      const [letra, informacion] = await Promise.all([
        axios.get(url),
        axios.get(url2)
      ])

      setLetra(letra.data.lyrics)
      setInformacion(informacion.data.artists[0])
    }
    //Llamando a la función
    consultarApiLetra();
  }, [busquedaletra, informacion])

  return (
    <>
      <Formulario
        setBusquedaletra={setBusquedaletra}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info informacion={informacion} />
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>

    </>
  )
}

export default App
