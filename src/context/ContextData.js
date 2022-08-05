import React, { createContext, useState } from 'react'


export const ContextData = createContext();

const inventarioInicial = [
    {id:1,nombre:"Esperanza",cantidad:0},
    {id:2,nombre:"Cuerpo",cantidad:0},
    {id:3,nombre:"Vida",cantidad:0},
    {id:4,nombre:"Amor",cantidad:0},
    {id:5,nombre:"Conocimiento",cantidad:0},
    {id:6,nombre:"Integridad",cantidad:0},
    {id:7,nombre:"Memoria",cantidad:0},
    {id:8,nombre:"Experiencia",cantidad:0},
    {id:9,nombre:"Lealtad",cantidad:0},
    {id:10,nombre:"Amigo",cantidad:0},
    {id:11,nombre:"Corazon Roto",cantidad:0},
    {id:12,nombre:"Pareja",cantidad:0},
    {id:13,nombre:"Trabajo",cantidad:0},
    {id:14,nombre:"Dinero",cantidad:0},
    {id:15,nombre:"Stress",cantidad:0},
    {id:16,nombre:"Respeto",cantidad:0},
    {id:17,nombre:"Proyecto",cantidad:0},
    {id:18,nombre:"Cosas",cantidad:0},
    {id:19,nombre:"Sueños Rotos",cantidad:0},
    {id:20,nombre:"Ambicion Perdida",cantidad:0},
    {id:21,nombre:"Ver Amigo",cantidad:0},
    {id:22,nombre:"Soltero",cantidad:1},
    {id:23,nombre:"Sexo",cantidad:0},
    {id:24,nombre:"Desempleado",cantidad:1},
    {id:25,nombre:"ExpLaboral",cantidad:0},

]

const ContextProvider = ({ children }) => {

    const [level, setLevel] = useState(1);
    const [inventario,setInventario] = useState(inventarioInicial)
    const [counter,setCounter] = useState(0)

    return (
        <ContextData.Provider value={{ counter,level,inventario, setCounter,setLevel,setInventario }}>
            {children}
        </ContextData.Provider>
    )
}

export default ContextProvider