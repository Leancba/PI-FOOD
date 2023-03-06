import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import './Card.css'


export default function RecipeCard ({ image, title , id, healtscore, diets }) {

  
  
  const allDiets = useSelector(state => state.diets)

    const tituloCortado = title.slice(0, 20);
    const tituloMostrado = title.length > 20 ? tituloCortado + '...' : title;


 let color;

  if (healtscore< 40) {
    color = "red";
  } else if (healtscore< 70) {
    color = "yellow";
  } else {
    color = "green";
  }
 
    return (
        <div class="carta" >
            <img src={image} height= {100} width= {100} />
            <h2><span id="estrella" style={{ color: color }}>★</span>{tituloMostrado}</h2>
            <p>{diets[0]}</p>
            <Link to={`/recipe/${id}`} className="boton">Detail</Link>
        </div>
    );

};