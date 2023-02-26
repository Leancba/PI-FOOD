
import React, { useState, useEffect, useRef } from "react";
import './Filter.css'
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
    <div>

      <button onClick={(e) => Reload(e)}>
        Reload
      </button>


      {allRecipes.length < 1 ? (

        <select disabled >
            <option  hidden value='ALL'> Diets </option >
      </select>
      ): 
      (
        <select onChange={e => handleDietsFilter(e)  }  >
            <option  hidden value='ALL'> Diets </option >
            <option  value='All'> All </option >
            {allDiets?.map(el => (
            <option key={el.id} value={el.name}> {el.name} </option >
            ))
                }
      </select>
      )}

    {/*  ZONA DE ACOMODADO POR TITULO */ }

    <label>Title</label>
     
    <select className={titleFlag? '' : 'disable'} ref={titleSort} onChange={(e) => handleSort(e)}>
        <option value="ALL">ALL</option>
        <option value="ASC">A-Z</option>
        <option value="DESC">Z-A</option>
    </select>



    {/* ZONA DE ACOMODADO POR HEALTSCORE */}



    <label>HealtScore</label>

    {/* className={flag?  "popup active" : "popup "} */}
      
        <select className={healtScoreFlag? '' : 'disable'} ref={healthScore} onChange={(e) => handleScore(e)}>
        <option value="ALL">ALL</option>
        <option value="MIN">- HealthScore</option>
        <option value="MAX">+ HealthScore</option>
      </select> 
        

      
      {/* <select disabled >
        <option > ALL </option >
      </select> */}
      
    </div>
  );
}