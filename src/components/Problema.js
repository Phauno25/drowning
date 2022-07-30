import React, { useContext } from "react";
import { ContextData } from "../context/ContextData";

const Problema = props => {
    const {problema,id} = props.problema;
    const {nivel,setNivel} = useContext(ContextData);

    return (
        <div>
            <p>{`${problema}`}</p>
            <button onClick={()=> setNivel}>Resolver</button>
        </div>
    )
}

export default Problema