import React from "react";
import cargando from "./loading.gif"
import "./loading.css";
export default function Cargando(){
    return(
        <div className="loading">
            <h1>Cargando...</h1>
            <img src={cargando} alt="" align="" />
        </div>
    )
}