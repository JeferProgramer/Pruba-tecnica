import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import { useState } from "react";
import './navhome.css';
import { CSSTransition } from "react-transition-group";

export default function Nav(){
    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
  
    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 700px)");
      mediaQuery.addListener(handleMediaQueryChange);
      handleMediaQueryChange(mediaQuery);
  
      return () => {
        mediaQuery.removeListener(handleMediaQueryChange);
      };
    }, []);
  
    const handleMediaQueryChange = (mediaQuery) => {
      if (mediaQuery.matches) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
  
    const toggleNav = () => {
      setNavVisibility(!isNavVisible);
    };
    return (
      <div className="Header">
        <CSSTransition
          in={!isSmallScreen || isNavVisible}
          timeout={250}
          classNames="NavAnimation"
          unmountOnExit
        >
          <nav className="Nav">
          <Link to="/">Empieza</Link>
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/favoritos">Favoritos</Link>
          </nav>
        </CSSTransition>
        <button onClick={toggleNav} className="Burger">
          <span role="img" aria-label="">
            {isNavVisible ? <span><img src="https://cdn.pixabay.com/photo/2016/07/25/14/42/close-1540630_1280.png" alt="" /></span>:<span><img src="https://cdn-icons-png.flaticon.com/512/1177/1177431.png" alt="" /></span>}
          </span>
          <i class="fi fi-rr-align-justify"></i>
        </button>
      </div>
    );
}