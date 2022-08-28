import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';

function LandingPage(){
    return (
        <div className='box'>
            <h1 className='welcome'>Bienvenido !</h1>
            <Link exact to="/home" className='button'>Empieza Ahora</Link>
        </div>
    )
} 
export default LandingPage