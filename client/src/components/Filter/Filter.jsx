
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import './Filter.css'
import logo from './cooking3.png'
import { useDispatch, useSelector } from "react-redux";
import {


  getAllRecipes,
  getAllDiets,
  filterRecipesByDiets,
  SortByTitle,
  SortByScore



} from "../../redux/actions";



export default function Filters({ setOrder }) {

  const dispatch = useDispatch();

  const titleSort = useRef(),
        healthScore = useRef()


  const allDiets = useSelector(state => state.diets);

  const allRecipes = useSelector(state => state.recipes);


  const [payload, setPayload] = useState(''),
        [titleFlag, setTitleFlag] = useState(true),
        [healtScoreFlag, setHealtScore] = useState(true)
        

  // Filter by diets-----------------------------------------------

  function handleDietsFilter(e){

    e.target.value === 'All' ?
    dispatch(getAllRecipes())
    : 
    dispatch(filterRecipesByDiets(e.target.value))
    dispatch(SortByTitle(payload))
    
       
}
  

  //Order by name and score------------------------------------------

  function handleSort(e){

    e.preventDefault(); 
    dispatch(SortByTitle(e.target.value))
    setOrder(e.target.value);
    setPayload(e.target.value)

    if(e.target.value !== 'ALL'){

        setHealtScore(false)

    }  else if (e.target.value === 'ALL'){

      setHealtScore(true)

    }
    
}
  

  const handleScore = (e) => {
    e.preventDefault();
    dispatch(SortByScore(e.target.value));
    setOrder(e.target.value);

    if(e.target.value !== 'ALL'){

        setTitleFlag(false)

    } else if(e.target.value === 'ALL') {

      setTitleFlag(true)

    }

    
  };


  const Reload = (e) => {
    
    e.preventDefault();
    setHealtScore(true)
    setTitleFlag(true)
    titleSort.current.value = 'ALL'
    healthScore.current.value = 'ALL'
    dispatch(getAllRecipes())

    
  }


  //---------------------------------------------------------------
  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  // ---------------------------------------------------------------
  return (
    <section className="container">

     <figure className="container-image-filter">
          <img width={100} height= {80} src= {logo}/>
     </figure>


    <div className="filter-container" >
     <div className="filter">
        <label>Diets</label>
        <select className={allRecipes.length < 1? 'disable' : ''} onChange={e => handleDietsFilter(e)  }  >
             <option  hidden value='ALL'> Diets </option >
             <option  value='All'> All </option >
             {allDiets?.map(el => (
             <option key={el.id} value={el.name}> {el.name} </option >
            ))}
        </select>
    </div>
      
    <div className="filter">
      <label>Title</label>
      <select className={titleFlag? '' : 'disable'} ref={titleSort} onChange={(e) => handleSort(e)}>
          <option value="ALL">ALL</option>
          <option value="ASC">A-Z</option>
          <option value="DESC">Z-A</option>
      </select>
    </div>



    <div className="filter"> 
      <label>HealtScore</label>      
          <select className={healtScoreFlag? '' : 'disable'} ref={healthScore} onChange={(e) => handleScore(e)}>
          <option value="ALL">ALL</option>
          <option value="MIN">- HealthScore</option>
          <option value="MAX">+ HealthScore</option>
      </select> 
    </div>
  </div>
  
  <div className="button-container">
      <button onClick={(e) => Reload(e)}>
         Reload
      </button>

      <Link to="/create">
            <button >Create recipe</button>
      </Link>
  </div>
          
      
      
    </section>
  );
}