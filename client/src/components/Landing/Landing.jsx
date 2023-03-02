import React from 'react'
import { Link } from "react-router-dom";
import './Landing.css'

export default function Landing(){
    return (
    <div className="header" >        
        <div className="display-bottomleft">
            <span className="tag">Github: Leancba</span>
        </div>
        <div className="display-middle">
            <span className="text-white" >RECIPE<br/>FOOD APP</span>
            <Link to="/home">
                <p><a className="button">START</a></p>
            </Link>   
        </div>
    </div>

   
    )
};