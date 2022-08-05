import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../context/ContextData'
import Inventario from './Inventario';
import Problema from './Problema'

const Main = () => {

  const { level } = useContext(ContextData);
  const [problema, setProblema] = useState([]);


  useEffect(() => {

    const getProblemas = async () => {
      let mock = [];
      mock = await fetch('./problemasMock.json')
        .then(res => res.json())
        .then(res => {
          res.sort((a, b) => { return b.id - a.id });
          setProblema(res)
        })
        .catch((err) => console.log(err));

    };
    getProblemas();

  }, [])




  return (
    <div className='container-xl'>
      <div className='row'>


        <div className='col-md-9 col-12'>
          {problema.map(e => {
            if (e.nivel <= level && level < 14) {
              return (<Problema key={e.id} problema={e} />)
            }
            if (e.nivel == level && level >= 14) {
              return (<Problema key={e.id} problema={e} />)
            }
          }
          )}
        </div>
        <div className='col-md-3 col-12'>
          <Inventario />

        </div>
      </div>
    </div>
  )
}

export default Main

