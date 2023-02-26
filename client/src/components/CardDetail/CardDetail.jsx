import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail, cleanRecipes } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";



export default function CardDetails() {

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id)
  const recipe = useSelector((state) => state?.recipesDetails);
  console.log(recipe)



  useEffect(() => {

    dispatch(getRecipeDetail(id));
    dispatch(cleanRecipes());

  }, [dispatch]);

  return (
    <div >
    
              <h2>{recipe.title}</h2>
              <Link to="/home">
                <button >Go back</button>
              </Link>          
            
    </div>
  );
}