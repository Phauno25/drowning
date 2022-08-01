import React, { useContext, useEffect, useState } from "react";
import { ContextData } from "../context/ContextData";

const Problema = props => {

    const { problema, id, permanente, sacrificio, recompensa, condicion, nivel, boss } = props.problema;
    let { counter, setCounter, level, setLevel, inventario, setInventario } = useContext(ContextData);
    const [display, setDisplay] = useState("");
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        validarSacrificio();
        if (!boss && permanente && condicion.length) {
            validarCondicion();
        }
        
    }, [counter]);

    const validarSacrificio = () => {
        let a = 0;
        sacrificio.map(e => {
            let index = inventario.findIndex(x => x.nombre === e.sacrificio);
            if (e.cantidad > inventario[index].cantidad) {
                a++
            }
        })
        a > 0 ? setDisabled(true) : setDisabled(false);
    }

    const validarCondicion = () => {
        let a = 0;
        condicion.map(e => {
            let index = inventario.findIndex(x => x.nombre === e.condicion);
            if (e.cantidad > inventario[index].cantidad) {
                a++
            }
        })
        a > 0 ? setDisplay("d-none") : setDisplay("");
    }

    const subirLevel = () => {
        if (boss) {
            const lvl1 = level + 1;
            setLevel(lvl1);
            !permanente ? setDisplay("d-none") : setDisplay("");
        }
        else {
            let lvl1 = level + 1;
            lvl1 = lvl1 - 1;
            setLevel(lvl1);
            !permanente ? setDisplay("d-none") : setDisplay("");
        }

    }

    const resolver = () => {
        sacrificio.map(e=>{
            let index = inventario.findIndex(x => x.nombre === e.sacrificio);
            inventario[index].cantidad--;
        })
        recompensa.map(e => {
            let index = inventario.findIndex(x => x.nombre === e.recompensa);
            inventario[index].cantidad++;
        })
        setCounter(counter + 1)
        subirLevel();
    }

    return (
        <div className={`${display}`}>
            <p>{`${problema}`}</p>
            {!disabled ? <button onClick={() => resolver()}>Resolver</button> : ""}
        </div>
    )
}

export default Problema