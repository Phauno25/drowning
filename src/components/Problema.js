import React, { useContext, useState } from "react";
import { ContextData } from "../context/ContextData";

const Problema = props => {
    const {problema,id,permanente,sacrificio,recompensa,nivel,boss} = props.problema;
    const [display,setDisplay] = useState("");
    let {level,setLevel} = useContext(ContextData);

    const subirLevel = () => {
       const lvl1 = level + 1;
       setLevel(lvl1);
       !permanente ? setDisplay("d-none") : setDisplay("");
    }

    const resolver = () =>{
        if (!sacrificio) {
            
        }
    }

    return (
        <div className={`${display}`}>
            <p>{`${problema}`}</p>
            <button onClick={()=> resolver()}>Resolver</button>
        </div>
    )
}

export default Problema