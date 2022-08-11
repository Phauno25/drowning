import React, { useContext, useEffect, useRef, useState } from "react";
import { ContextData } from "../context/ContextData";

const Problema = props => {

    const { problema, id, permanente, sacrificio, recompensa, condicion, boss, tiempo } = props.problema;
    let { level, setLevel, inventario, setInventario } = useContext(ContextData);
    const [display, setDisplay] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [background, setBackground] = useState("bg-warning");
    const [counter, setCounter] = useState(0);


    useEffect(() => {
        setTimeout(() => {
            setBackground("");
        }, 10)

    }, []);
    useEffect(() => {
        setBackground("bg-warning");
        setTimeout(() => {
            setBackground("");
        }, 200)

    }, [counter]);

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

    }, [inventario, level]);

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

    const resolver = async (time) => {

        if (!disabled) {
            iniciarProgreso(time).then(() => {
                switch (id) {

                    case 101: //Muerto
                        morir()
                            .then(() => sacrificar())
                            .then(() => recompensar())
                            .then(() => {
                                setDisabled(false)
                                const newCounter = counter + 1
                                setCounter(newCounter);
                                subirLevel();
                                setLoading(false);
                            })
                        break;
                    case 30: //Olvidado - Final 
                        morir()
                        const inv = inventario;
                        inv.map(e => {
                            if (e == 22 || e == 24) {
                                e.cantidad = 1
                            }
                            else {
                                e.cantidad = 0;
                            }

                        })
                        setInventario(inv);
                        setDisabled(false);
                        setCounter(0);
                        setLevel(1);
                        break;


                    default:
                        sacrificar()
                            .then(() => recompensar())
                            .then(() => {
                                setDisabled(false)
                                const newCounter = counter + 1
                                setCounter(newCounter);
                                subirLevel();
                                setLoading(false);
                            })

                        break;
                }
            })
        }

    }

    const iniciarProgreso = (time) => {

        return new Promise((resolve, reject) => {
            setLoading(true);
            let num = 0;
            const progreso = document.getElementById(`progreso${id}`);
            const intervalo = setInterval(thick, time * 6);
            function thick() {
                if (num < 100) {
                    num++;
                    progreso.style.width = `${num}%`;
                    progreso.ariaValueNow = `${num}`;

                }
                else {
                    progreso.innerText = "";
                    progreso.style.width = `${0}%`;
                    progreso.ariaValueNow = `${0}`;
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
                else {
                    e.cantidad = 0;
                }
                console.log(inv)
            })
            setInventario(inv)
            resolve(true);
        })
    }




    return (

        <div className={`row ${display} problema border-bottom align-items-center ${background}`}>

            <div className="col-md-4 col-6">
                <p className="my-2">{`${problema} `}</p>
            </div>

            <div className="col-2 d-flex align-items-center">

                <div className={`w-100 ${!loading ? "d-none" : ""}`}>
                    <div className="progress">
                        <div id={`progreso${id}`} className={`progress-bar progress-bar-striped bg-success`} role="progressbar" aria-label="Success striped example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                        </div>

                    </div>
                </div>


                <button id={`resolver${id}`} className={!disabled ? `btn btn-secondary ${loading ? "d-none" : ""} text-white btn-sm` : `btn btn-warning ${display} text-white btn-sm`} onClick={() => resolver(tiempo)}>{disabled ? "No alcanza" : "Resolver"}</button>

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