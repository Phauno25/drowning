import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../context/ContextData'

const Inventario = () => {

    let { inventario } = useContext(ContextData);

    return (
        <div>
            <ul className='list-group'>
                {inventario.map(e => {
                    if (e.id < 20 && e.cantidad > 0) {
                        return <li className='list-group-item' key={e.id}>{`${e.cantidad} ${e.nombre}`}</li>
                    }

                })}
            </ul>
        </div>
    )
}

export default Inventario