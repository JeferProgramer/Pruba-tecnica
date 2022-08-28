import axios from 'axios';
import setAuthorizationToken from '../../utils/setAutToken.js';
import jwt from 'jsonwebtoken';
const baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
export const getArtObjects = () => {
    return async function(dispatch){
        const responseApi = await fetch(`${baseURL}/artobjects`)
        const json = await responseApi.json()
        dispatch({type:"GET_ART_OBJECTS", payload: json.artObjects}) 
    }
}
export const searchArtObjects = (name) => {
    return async function(dispatch){
        const responseApi = await fetch(`${baseURL}/artobjects?name=${name}`)
        const json = await responseApi.json()
        console.log(json)
        //envio la accion al reducer con la informacion de la api de los juegos que quiero encontrar
        dispatch({ type: "SEARCH_ART_OBJECTS", payload: json })
    }
}

export const getMyArtObjects = () => {
    return async function(dispatch){
        const response = await fetch(`${baseURL}/myartobjects`)
        const json = await response.json()
        //envio los videojuegos de mi DB
        if(json.length){
            dispatch({type:"GET_MY_ART_OBJECTS", payload: json})
        }else{
           dispatch({type:"GET_MY_ART_OBJECTS", payload: json})
        }
    }
}

export function getUser(id){
    return async function(dispatch){
        const response = await fetch(`${baseURL}/user/${id}`)
        const json = await response.json()
        //envio el detalle del videojuego
        dispatch({type:"GET_USER",payload:json})
    }
}
export function addArtObject(body){
    return async function(dispatch){
        const {info} = await axios.post(
            `${baseURL}/create`
            ,body
        );
        return dispatch({
            type: "CREATE_ART_OBJECT",
            payload: info
        })      
    }
}
export function loginClient(signinForm) {
  return async function (dispatch) {
    try {
      return await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinForm),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: 'LOGIN_CLIENT',
            payload: data,
          });
        });
    } catch (error) {
      return console.log(error);
    }
  };
}
