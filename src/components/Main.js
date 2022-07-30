import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../context/ContextData'
import Problema from './Problema'

const Main = () => {

  useEffect(() =>{
    setProblema(data);
  })
  const { data } = useContext(ContextData);
  const [problema,setProblema] = useState([]);
  return (
    <div>
      {problema.map(e=>(
        <Problema problema={e} />
      ))}
    </div>
  )
}

export default Main