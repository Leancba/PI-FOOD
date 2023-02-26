import React from 'react'
import { Link } from "react-router-dom";


export default function Landing(){
    return (

        <div>
            <h1>WELCOME</h1>
            <Link to = '/home'>
                <button >go HOME</button>
            </Link>
            <h2>Henry Food APP</h2>
           
        </div>

    );

};