import React, { useContext, useState } from "react";
import { ContextData } from "../context/ContextData";

const Problema = props => {
    const {problema,id,permanente} = props.problema;
    const [display,setDisplay] = useState("");
    let {nivel,setNivel} = useContext(ContextData);

    const aumentar = () => {
       const nivel1 = nivel + 1;
       setNivel(nivel1);
       !permanente ? setDisplay("d-none") : setDisplay("");
    }

    return (
        <div className={`${display}`}>
            <p>{`${problema}`}</p>
            <button onClick={()=> aumentar()}>Resolver</button>
        </div>
    )
}

export default Problema