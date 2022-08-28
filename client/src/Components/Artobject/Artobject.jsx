import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import "./artobject.css";
import {Link} from "react-router-dom";



export default function Artobject({artObjects}){
    //hook para acceder a un estado del store 
    const artObjectsComplete = useSelector(state =>  (state.artObjects))
    //hook para dispachar una accion
    const dispatch = useDispatch()
    const [carga, setCarga] = useState(true);//para verificar el load

    return (
        <div className='Pagination'>
            <div className='Card'>
                {artObjectsComplete?.map(artobject => {
                    console.log(artobject.webImage.url)
                    return (
                        <div className='CardEntry' key={artobject.id}>
                                {/* me traigo las imagenes */}
                                <img src={artobject.webImage.url} className='Image' alt="" />
                                <h4 className='titleCard'>{artobject.title}</h4>
                                <h2 className='author'>{artobject.principalOrFirstMaker}</h2>
                                <Link to={artobject.links.web} className='link' target={"_blank"}>Url sitio Rijksmuseum</Link>
                        </div>
                    )
                })}
                </div>
        </div>
    )
}



