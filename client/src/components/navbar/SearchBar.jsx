import React from "react";
import './SearchBar.css'
import logo from './cooking.png'

import { useState } from "react";
import { useDispatch } from 'react-redux'
import { getRecipeByName} from "../../redux/actions";




export default function SearchBar(){

    const dispatch = useDispatch()

    const [name, setName] = useState('')

    
    function handleInputOnChange(e) {
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
        
    }

    function handleOnSubmit (e){
        e.preventDefault();
        dispatch(getRecipeByName(name)) 
        setName('');
        
    }

   

    return (
     
        <nav className="navbar">
            <figure className="container-image">
                <img width={100} height= {80} src= {logo}/>
            </figure>

            <div className="container-search" >
                 <input value={name} type='text' placeholder='Search recipe by name...' onChange={e =>  handleInputOnChange(e)}/>
                 <button type='sumbit' onClick={e => handleOnSubmit(e)} > Search </button>
            </div>
    
        </nav>
    
    )
}