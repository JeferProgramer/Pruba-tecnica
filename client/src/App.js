import './App.css';
import LadingPage from "./Components/LandingPage/landingPage";
import {Route} from "react-router-dom";
import React, { useState } from "react";
import Artobject from "./Components/Artobject/Artobject.jsx";
import Search from "./Components/Search/Search.jsx";
import UserDetail from "./Components/UserDetail/UserDetail.jsx";
import Navbar from "./Components/Nav/Nav.jsx";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getArtObjects } from './redux/Actions';
import Login from './Components/login/login';
import Cargando from './Components/Loading/loading';

function App() {
const [load,setLoad]  = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArtObjects()).then(() => setLoad(false));
  }, [])
  if(load){
    return <Cargando/>
  }
  return (
    <div className='App'>
      {/* vamos a renderizar cada uno de los componentes con su ruta correspondiente */}
      <Route path="/" component={Navbar}/>
      <Route exact path={"/"} component={LadingPage}/>
      <Route exact path="/home" component={Search} />
      <Route exact path={"/home"} component={Artobject}/>
      <Route exact path="/home/:id" component={UserDetail}/>
      <Route exact path="/login" component={Login}/>
      {/* <Route exact path="/addvideogame" component={AddVideogame}/> */}
    </div>
  );
}

export default App;
