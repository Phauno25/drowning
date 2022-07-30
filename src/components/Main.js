import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../context/ContextData'
import Problema from './Problema'

const Main = () => {

  const { data, nivel } = useContext(ContextData);
  const [problema, setProblema] = useState(data);

  useEffect(() => {
    if (data) {
      setProblema(data);
      console.log(problema);
    }
    
  },[data])

  return (
    <div>
      {problema.map(e => {
        if (e.nivel <= nivel) {
          return (<Problema key={e.id} problema={e} />)
        }
      }
      )}
    </div>
  )
}

export default Main