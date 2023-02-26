import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { getRecipeByName} from "../../redux/actions";
import { Link } from "react-router-dom";



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
        <div >
            <input value={name} type='text' placeholder='Search recipe by name...' onChange={e =>  handleInputOnChange(e)}/>
            <button type='sumbit' onClick={e => handleOnSubmit(e)} > BUSCAR </button>
            <Link to="/create">
                <button >Create recipe</button>
            </Link>
        </div>
    )
}