import React, { useEffect,useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import './CardDetail.css'
import { getRecipeDetail, cleanRecipes,setFlag } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";



export default function CardDetails() {


  const dispatch = useDispatch();

  const pasosLista = useRef(null);
  const resume = useRef(null)

  
  const { id } = useParams();

  const recipe = useSelector((state) => state?.recipesDetails);
  const flag = useSelector(state => state.flag )

  // console.log(recipe.steps?.length)

  

  useEffect(() => {

    dispatch(getRecipeDetail(id));
    dispatch(cleanRecipes());

  }, [dispatch]);

  function closeform() {

    dispatch(setFlag(false));
  

}


  function mostrarPasos(p) {
    resume.current.classList.remove('mostrar');
    pasosLista.current.classList.add('mostrar');
    
  }

  function cerrarPasos() {
    pasosLista.current.classList.remove('mostrar');
  }

  function mostrarResume() {
  
    pasosLista.current.classList.remove('mostrar');
    resume.current.classList.add('mostrar');
  }

  function cerrarResume() {
    resume.current.classList.remove('mostrar');
  }

  return (
  <section className="container-detail" >

    {recipe && recipe.length != [] ? (
      
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
          <h2>HealthScore:</h2>
          <h3>{recipe?.healthScore}</h3>
        </div>
  
  
  
  
        <div class="botones">
           <button onClick={mostrarResume} className="boton-1" >Resume Recipe</button>     
           <button onClick={mostrarPasos}  className="boton-2" >Recipe Steps</button>
        </div>

        <Link to="/home"> 
        <button id="redireccionar" className="boton-2" onClick={closeform}>Ir a Inicio</button>
      </Link>
  
  
        <div class="resume" ref={resume} >
          <div className="resume-content">
            <h2 className="resume-title">{recipe.title}</h2>
            <p  className="resume-description" dangerouslySetInnerHTML={{ __html: recipe?.summary?.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '<strong>$1</strong>')}}></p>
            <button className="cerrar-popup" onClick={cerrarResume}>
                 Cerrar
             </button>   
          </div>    
        </div>
  
        <div className="receta-pasos-lista" ref={pasosLista}>
            <div className="receta-popup">
               <h2>Recipe Steps</h2>
               {recipe.steps && recipe.steps?.[0] === "No hay pasos en esta receta"? (
                <div>
                  <strong>
                    {recipe.steps?.[0]}
                  </strong>
                </div> 
             ) 
             : 
             (
              <ul className="receta-pasos">
                 {recipe.steps?.map((step, index) => (
                   <li key={index}><span>{index + 1}.</span> {step}</li>
                  ))}
               </ul>
             )}
             <button className="cerrar-popup" onClick={cerrarPasos}>
                 Cerrar
             </button>
           </div>
       </div>
    </div>
      ) 
       : 
      (
      <div id="loading">
        <div class="spinner"></div>
     </div> 
      )
    }
    <div className={flag? "popup-no-id active" : "popup-no-id"}>
      <div class="popup-content">
      <h2 class="popup-title">Error</h2>
      <p class="popup-text">La receta solicitada no existe en nuestro sitio.</p>
      <Link to="/home"> 
        <button id="redireccionar" className="popup-button" onClick={closeform}>Ir a Inicio</button>
      </Link>
      </div>
    </div>
</section>

  );
}