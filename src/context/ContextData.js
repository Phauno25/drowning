import React, { createContext, useEffect, useState } from 'react'

export const ContextData = createContext();


const ContextProvider = ({ children }) => {

    useEffect(() => {

        getProblemas();
    }, [])


    const getProblemas = async () => {
        let mock = [];
        mock = await fetch('./problemasMock.json')
            .then(res => res.json()
                .then(res => setData(res)));

    };


    const [nivel, setNivel] = useState(0);
    const [data, setData] = useState([]);

    /* const [inventario,setInventario] = useState([]); */

    return (

        <ContextData.Provider value={{ data, nivel, setNivel }}>
            {children}
        </ContextData.Provider>
    )
}

export default ContextProvider