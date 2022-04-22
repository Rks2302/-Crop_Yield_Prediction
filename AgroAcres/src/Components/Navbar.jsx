import React from 'react';
import { Link } from "react-router-dom";

function Navbar(){
    return <div style={{
        width: "100%",
        position: "fixed",
    }}>
        <nav class="navbar navbar-light">
            <div class="container-fluid">
                <h1>AgroAcres</h1>
                <ul class="nav-item">
                    <li>
                        <Link to="/" >
                            <a >Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link to="/seasonwise" >
                            <a>Seasonal</a>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cropwise" >
                            <a>Crops</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
}

export default Navbar;