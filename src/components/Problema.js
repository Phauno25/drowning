import React, { useContext, useEffect, useState } from "react";
import { ContextData } from "../context/ContextData";

const Problema = props => {

    const { problema, id, permanente, sacrificio, recompensa, condicion, boss, tiempo } = props.problema;
    let { counter, setCounter, level, setLevel, inventario, setInventario } = useContext(ContextData);
    const [display, setDisplay] = useState("");
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {

        validarSacrificio();
        const validarCondicion = () => {

            if (!boss && permanente && condicion.length) {
                let a = 0;
                condicion.map(e => {
                    let index = inventario.findIndex(x => x.nombre === e.condicion);
                    if (e.cantidad > inventario[index].cantidad) {
                        a++;
                    }
                })
                a > 0 ? setDisplay("d-none") : setDisplay("");
            }
        }
        validarCondicion();

    }, [counter, inventario, level]);

    const validarSacrificio = () => {
        let a = 0;
        sacrificio.map(e => {
            let index = inventario.findIndex(x => x.nombre === e.sacrificio);
            if (e.cantidad !== 100 && e.cantidad > inventario[index].cantidad) {
                a++;
            }
        })
        a > 0 ? setDisabled(true) : setDisabled(false);
    }



    const subirLevel = () => {
        if (boss) {
            const lvl1 = level + 1;
            setLevel(lvl1);
            !permanente ? setDisplay("d-none") : setDisplay("");
        }
        else {
            !permanente ? setDisplay("d-none") : setDisplay("");
        }

    }

    const resolver = async () => {

        iniciarProgreso().then(() => {
            switch (id) {

                case 101: //Muerto
                    morir()
                    .then(() => sacrificar())
                    .then(()=> recompensar())
                    .then(() => {
                        setDisabled(false)
                        let countercito = counter + 1
                        setCounter(countercito)
                        subirLevel();
                    })
                    break;

                default:
                    sacrificar()
                        .then(() => recompensar())
                        .then(() => {
                            setDisabled(false)
                            let countercito = counter + 1
                            setCounter(countercito)
                            subirLevel();
                        })

                    break;
            }
        })
    }

    const iniciarProgreso = () => {
        return new Promise((resolve, reject) => {
            setDisabled(true);
            let num = 0;
            const progreso = document.getElementById(`progreso${id}`);
            const intervalo = setInterval(thick, 2);
            function thick() {
                if (num < 100) {
                    num++;
                    progreso.innerText = `[${num}%]`;
                }
                else {
                    progreso.innerText = "";
                    clearInterval(intervalo);
                    resolve(true);
                }
            }
        })
    }

    const sacrificar = () => {
        return new Promise((resolve, reject) => {
            let inv = [...inventario];
            let index = {};
            sacrificio.map(e => {
                index = inv.findIndex(x => x.nombre === e.sacrificio);
                if (e.cantidad === 100) {
                    inv[index].cantidad = 0;
                }
                else {
                    inv[index].cantidad = inv[index].cantidad - e.cantidad
                }
                setInventario(inv)
            })
            resolve(true);
        })
    }

    const recompensar = () => {
        return new Promise((resolve, reject) => {
            let inv = [...inventario];
            let index = {};
            recompensa.map(e => {
                index = inv.findIndex(x => x.nombre === e.recompensa);
                inv[index].cantidad++;
            })
            setInventario(inv)
            resolve(true);
        })
    }

    const morir = () => {
        return new Promise((resolve, reject) => {
            const inv = [];
            inventario.map(e => {
                if (e.id <= 2) {
                    inv.push(e)
                }
                else{
                    e.cantidad = 0;
                }
                console.log(inv)
            })
            setInventario(inv)
            resolve(true);
        })
    }




    return (

        <div className={`row ${display}`}>

            <div className="col-md-4 col-6">
                <p className="mr-4">{`${problema} `}</p>
            </div>

            <div className="col-2">
                {!disabled ? <button id={`resolver${id}`} className="btn btn-secondary text-white btn-sm" onClick={() => resolver()}>Resolver</button> : ""}

                <p id={`progreso${id}`}></p>
            </div>

            <div className="col-md-6 col-6 justify-content-around">
                {sacrificio.map(e => {
                    const index = inventario.findIndex(x => x.nombre === e.sacrificio);
                    if (inventario[index].id <= 20) {
                        return <span className=" mx-1 badge bg-danger">-{e.cantidad} {e.sacrificio} </span>
                    }

                })}
                {recompensa.map(e => {
                    const index = inventario.findIndex(x => x.nombre === e.recompensa);
                    if (inventario[index].id <= 20) {
                        return <span className="mx-1 badge bg-success">+{e.cantidad} {e.recompensa} </span>
                    }


                })}
            </div>
            


        </div >
    )
}

export default Problema