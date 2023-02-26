import React from 'react';

import Filters from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';

import './popup.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes, getAllDiets, filterRecipesByDiets, setFlag, SortByTitle  } from '../../redux/actions';

import SearchBar from '../navbar/SearchBar';
import RecipeCard from '../Card/Card'


export default function Home(){
    

    const dispatch = useDispatch()


    //trayendo la informacion de los stados del reducer
    const allRecipes = useSelector(state => state.recipes)

    const prueba = allRecipes.map((recipe) => {
            
        return {
            title: recipe?.title,
            healthScore: recipe?.healthScore
        }
    });

    // console.log(prueba.slice(0,10))

  

    const flag = useSelector(state => state.flag )


    const [order, setOrder] = useState("");


    function closeform(e, value) {

        e.preventDefault();
        dispatch(setFlag(value));
        dispatch(getAllRecipes());

    }


    useEffect(() => {
        
          dispatch(getAllRecipes());
          dispatch(getAllDiets())
        
      },[]);



      //funciones y estados de la paginacion---

    const [currentPage, setCurrentPage ] = useState(1);
    const [vgPerPage, setVgPerPage] = useState(9)
    
    const indexOfLastVg = currentPage * vgPerPage //1 * 15 = 15
    const indexOfFirstVg = indexOfLastVg - vgPerPage // 15 - 15 = 0

    const currentRecipes = allRecipes.slice(indexOfFirstVg, indexOfLastVg)

    const pageNow = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
      //------------------------------

     
    return (
        <div>
        <Filters setOrder={setOrder} />
        <SearchBar />
        <Pagination
                vgPerPage={vgPerPage}
                allVideogamesfromState={allRecipes.length}
                pageNow={pageNow}
                />

        {currentRecipes?.map(el => {
            return ( 
                <div key={(el.id)}>
                        <RecipeCard title={el.title} image={el.image} id= {el.id} />
                 </div>
                )
            })
            }

            <div className={flag? "overlay active" : "overlay "} >        
                    <div className={flag?  "popup active" : "popup "} >
                        <a href="/#"  onClick={e => closeform(e , false)} className="btn-cerrar-popup">Reload Recipes</a>
                        <div className="container" >
                            <div>
                                Receta/s no encontrada/s
                            </div>
                                <span className="responsive-button" href="/#"  onClick={''}>Cerrar</span> 
                        </div> 
                    </div>
             </div> 
        </div>

    )
}