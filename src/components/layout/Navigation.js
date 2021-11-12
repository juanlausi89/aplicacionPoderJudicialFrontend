import React from "react";

import {Link} from 'react-router-dom';

const Navigation = ()=>{
   
    return (
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <Link to={"/"} className="bienvenido">Bienvenidos</Link>
                <Link to={"/edifices"} className="edificios">Edificios</Link>
            </nav>
        </aside>
    );
    
}

export default Navigation;
