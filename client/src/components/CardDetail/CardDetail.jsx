import React, { useEffect } from "react";
import './CardDetail.css'
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail, cleanRecipes } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";



export default function CardDetails() {

  const dispatch = useDispatch();
  
  const { id } = useParams();
  const recipe = useSelector((state) => state?.recipesDetails);
  console.log(recipe)



  useEffect(() => {

    dispatch(getRecipeDetail(id));
    dispatch(cleanRecipes());

  }, [dispatch]);

  return (
    <div className="container-detail" >
      <h2>{recipe.title}</h2>
      <Link to="/home"><button >Go back</button></Link>          
    </div>
  );
}