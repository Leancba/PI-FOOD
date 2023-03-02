import React from 'react';
import './popup.css'
import './Home.css'


import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes, getAllDiets, setFlag, } from '../../redux/actions';

import Filters from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../navbar/SearchBar';
import RecipeCard from '../Card/Card'


export default function Home(){
    

    const dispatch = useDispatch()
    


    //trayendo la informacion de los stados del reducer
    const allRecipes = useSelector(state => state.recipes)
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



     //paginacion---------------------------

    const [currentPage, setCurrentPage ] = useState(1);
    const [vgPerPage, setVgPerPage] = useState(9)
    
    const indexOfLastVg = currentPage * vgPerPage //1 * 15 = 15
    const indexOfFirstVg = indexOfLastVg - vgPerPage // 15 - 15 = 0

    const currentRecipes = allRecipes.slice(indexOfFirstVg, indexOfLastVg)

    const pageNow = (pageNumber) => {

        setCurrentPage(pageNumber)
    }
      //-------------------------------------

     
    return (
    <section className='Home'>
             <SearchBar/>
             
        <div className='center'>
        <Filters setOrder={setOrder} />
            

        <div className='column'>
            <div className='recipe-container'>
            {currentRecipes?.map(el => {
                
                return ( 
                    <div key={(el.id)}>
                            <RecipeCard title={el.title} image={el.image} id= {el.id} healtscore = {el.healthScore} diets = {el.diets} />
                    </div>
                 )
                })
             }
             </div>
             
             <Pagination
                vgPerPage={vgPerPage}
                allVideogamesfromState={allRecipes.length}
                pageNow={pageNow}
                />
         </div>
         
        </div>
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
        </section>

    )
}