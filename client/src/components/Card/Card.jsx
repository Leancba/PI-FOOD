import React from 'react';
import { Link } from "react-router-dom";


export default function RecipeCard ({ image, title , id }) {
 
    return (
        <div>
            <h1>{title}</h1>
            <img src={image} height= {250} width= {450} />

            <Link to={`/recipe/${id}`}>
                    <button >See details</button>
            </Link>
        </div>
    );

};