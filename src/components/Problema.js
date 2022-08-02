import React, { useContext, useEffect, useState } from "react";
import { ContextData } from "../context/ContextData";

const Problema = props => {

    const { problema, id, permanente, sacrificio, recompensa, condicion, boss,tiempo } = props.problema;
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
            if (e.cantidad != 100 && e.cantidad > inventario[index].cantidad) {
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

    const resolver = async() => {
        switch (id) {
            case 101: //Muerto
                inventario.map(e => {
                    e.id > 2 ? e.cantidad = 0 : e.cantidad = e.cantidad;
                })
                break;

            default:
                sacrificio.map(e => {
                    let index = inventario.findIndex(x => x.nombre === e.sacrificio);
                    if (e.cantidad === 100) {
                        inventario[index].cantidad = 0;
                    }
                    else {
                        inventario[index].cantidad = inventario[index].cantidad - e.cantidad
                    }
                })
                recompensa.map(e => {
                    let index = inventario.findIndex(x => x.nombre === e.recompensa);
                    inventario[index].cantidad++;
                })
                break;
        }

        setCounter(counter + 1) 
        subirLevel();
    }


const iniciarProgreso = () =>{
    setDisabled(true)
    let num = 0;
    const progreso = document.getElementById(`progreso${id}`)
    const intervalo = setInterval(thick, tiempo * 10);
    function thick() {
        if (num < 100) {
            num++
            console.log(num)
            progreso.innerText = `[${num}%]`;
        }
        else {
            resolver();
            progreso.innerText = "";
            clearInterval(intervalo);
            setDisabled(false);
        }
    }
}


    return (
        <div className={`${display}`}>
            <p>{`${problema}`}</p>
            {!disabled ? <button id={`resolver${id}`} className="btn btn-primary" onClick={() => iniciarProgreso()}>Resolver</button> : ""}
            <p id={`progreso${id}`}></p>
        </div>
    )
}

export default Problema