import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../context/ContextData'

const Inventario = () => {

    let { inventario } = useContext(ContextData);

    return (
        <div>
            <ul className='list-group' >
                <li className='list-group-item active text-white'> Inventario</li>
                {inventario.map(e => {
                    if (e.id < 20 && e.cantidad > 0) {
                        return <li className='list-group-item' key={e.id}>
                            <span className="badge bg-primary rounded-pill" >{e.cantidad}</span>
                            {` ${e.nombre}`}</li>
                    }

                })}
            </ul>
        </div>
    )
}

export default Inventario