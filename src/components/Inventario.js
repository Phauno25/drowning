import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../context/ContextData'

const Inventario = () => {

    const { inventario } = useContext(ContextData);

    return (
        <div>
            <ul>
                {inventario.map(e => {
                    if (e.id <=20 && e.cantidad > 0) {
                        return <li key={e.id}>{`${e.cantidad} ${e.nombre}`}</li>
                    }
                   
                })}
            </ul>
        </div>
    )
}

export default Inventario