import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../context/ContextData'
import Problema from './Problema'

const Main = () => {

  const {level} = useContext(ContextData);
  const [data, setData] = useState([]);
  const [problema, setProblema] = useState(data);

  useEffect(() => {

    const getProblemas = async () => {
        let mock = [];
        mock = await fetch('./problemasMock.json')
            .then(res => res.json())
            .then(res => setData(res))
            .catch((err)=> console.log(err));
    };
    getProblemas();
   
}, [])

  return (
    <div>
      {problema.map(e => {
        if (e.nivel <= level) {
          return (<Problema key={e.id} problema={e} />)
        }
      }
      )}
    </div>
  )
}

export default Main