import React, { useEffect } from "react";
import './CardDetail.css'
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail, cleanRecipes } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";



export default function CardDetails() {

  const dispatch = useDispatch();
  
  const { id } = useParams();
  const recipe = useSelector((state) => state?.recipesDetails);

  console.log(recipe.steps)


//   const stepsText = "Primera oración. Segunda oración. Tercera oración.";
// const stepsArray = stepsText.split(".");




  
{/* <Link to="/home"><button >Go back</button></Link>           */}

  useEffect(() => {

    dispatch(getRecipeDetail(id));
    dispatch(cleanRecipes());

  }, [dispatch]);

  return (
  <section className="container-detail" >
    <div class="receta">
      <h2 class="receta-titulo">{recipe.title}</h2>
      <img class="receta-imagen" src={recipe.image}alt="Imagen de la receta"/>
      <div class="receta-tipos-dieta">
        <h3>Tipos de dieta:</h3>
          <ul>
            {recipe.typeDiets?.map((diet, index) => (
             <li key={index}>{diet}</li>
           ))}
          </ul>
      </div>
      <div class="receta-resumen">
        <h3>Resumen de la receta:</h3>
        <p dangerouslySetInnerHTML={{ __html: recipe?.summary?.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '<strong>$1</strong>')}}></p>
      </div>
      <div class="receta-healthscore">
        <h3>{recipe.healthScore}</h3>
        <p></p>
      </div>
      <div class="receta-preparacion">
        <h3>Paso a paso de la preparación:</h3>
        {/* <ul>
            {recipe.steps && recipe.steps.length > 0 ? 

            recipe.steps?.map((steps, index) => (

             <li key={index}>{steps}</li>
           ))
           
           :

           (  
           <li>{recipe.steps}</li>
           )
            
            }

          </ul> */}





      </div>
  </div>
</section>

  );
}