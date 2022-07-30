import React, { createContext, useState } from 'react'

export const ContextData = createContext();

const inventarioInicial = [
    {esperanza:0},
    {cuerpo:0},
    {vida:0},
    {amor:0},
    {conocimiento:0},
    {integridad:0},
    {memoria:0},
    {experiencia:0},
    {lealtad:0},
    {amigo:0},
    {corazonroto:0},
    {pareja:0},
    {trabajo:0},
    {dinero:0},
    {stress:0},
    {respeto:0},
    {proyecto:0},
    {cosas:0},
    {suenoroto:0},
    {ambicionperdida:0},
    

]

const ContextProvider = ({ children }) => {

    let [level, setLevel] = useState(1);
    const [inventario,setInventario] = useState(inventarioInicial)
    
    /* const [inventario,setInventario] = useState([]); */

    return (
        <ContextData.Provider value={{ level,inventario, setLevel,setInventario }}>
            {children}
        </ContextData.Provider>
    )
}

export default ContextProvider