import React, { createContext, useEffect, useState } from 'react'

export const ContextData = createContext();


const ContextProvider = ({ children }) => {

    let [nivel, setNivel] = useState(1);
    const [data, setData] = useState([]);

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

    
    /* const [inventario,setInventario] = useState([]); */

    return (
        <ContextData.Provider value={{ data, nivel, setNivel }}>
            {children}
        </ContextData.Provider>
    )
}

export default ContextProvider