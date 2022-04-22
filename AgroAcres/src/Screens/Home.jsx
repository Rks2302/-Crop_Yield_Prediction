import React from 'react';
import { Link } from "react-router-dom";

function Home() {
    return <div className="home" style={{
        height: "100vh",
    }}>
        <div style={{
            height: "100%",
        }}>
            <img src="../../Images/4.jfif" alt="image" width="100%" height="100%"></img>
            <div style={{
                position: "absolute",
                top: "35%",
                left: "2%",
            }}>
                <h1 style={{
                    color: "#000505",
                    fontWeight: "700"
                }}>“Farming is a profession of hope.”<br /><span style={{
                    marginLeft: "55%",
                }}> — Brett Brian</span></h1>
                <Link to="/seasonwise" className="homebutton" style={{
                    textDecoration: "none",
                    color:"#fff"
                }}>Get Started</Link>
            </div>
        </div>
    </div>

}

export default Home;