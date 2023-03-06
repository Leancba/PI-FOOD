import React, { useEffect,useRef } from "react";
import './CardDetail.css'
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail, cleanRecipes } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";



export default function CardDetails() {

  const dispatch = useDispatch();

  const pasosLista = useRef(null);
  const resume = useRef(null)

  
  const { id } = useParams();
  const recipe = useSelector((state) => state?.recipesDetails);
  
{/* <Link to="/home"><button >Go back</button></Link>           */}

  useEffect(() => {

    dispatch(getRecipeDetail(id));
    dispatch(cleanRecipes());

  }, [dispatch]);


  function mostrarPasos() {
    pasosLista.current.classList.add('mostrar');
  }

  function cerrarPopup() {
    pasosLista.current.classList.remove('mostrar');
  }

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
      <div class="receta-healthscore">
        <h3>{recipe.healthScore}</h3>
        <p></p>
      </div>

      <div class="receta-resumen" ref={resume} >
        <button></button>
        <h3>Resumen de la receta:</h3>
        <p dangerouslySetInnerHTML={{ __html: recipe?.summary?.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '<strong>$1</strong>')}}></p>
      </div>

      <div class="receta-preparacion">
        <button class="receta-pasos" onClick={mostrarPasos}>Ver pasos de la receta</button>
      
        <div className="receta-pasos-lista" ref={pasosLista}>
           <div className="receta-popup">
              <h2>Pasos de la receta</h2>
              <ul className="receta-pasos">
                {recipe.steps?.map((step, index) => (
                  <li key={index}>{step}</li>
                 ))}
              </ul>
            <button className="cerrar-popup" onClick={cerrarPopup}>
                Cerrar
            </button>
          </div>
        </div>

      </div>
  </div>
</section>

  );
}