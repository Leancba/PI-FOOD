import React from "react";
import './SearchBar.css'
import logo from './cooking.png'
import LoginModal from "./login";
import LogoutModal from "./logout";
import { useState } from "react";
import { getRecipeByName, Logout } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";




export default function SearchBar() {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const token = useSelector(state => state.token)
    console.log(token)


    function handleInputOnChange(e) {
        e.preventDefault();
        setName(e.target.value)
        console.log(name)

    }

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(getRecipeByName(name))
        setName('');

    }





    return (

        <nav className="navbar">
            <figure className="container-image">
                <img width={100} height={80} src={logo} />
            </figure>

            <div className="container-search" >
                <input value={name} type='text' placeholder='Search recipe by name...' onChange={e => handleInputOnChange(e)} />
                <button type='sumbit' onClick={e => handleOnSubmit(e)} > Search </button>
                <div>
                    {token ? (
                        <button type="button" onClick={() => setIsLogoutModalOpen(true) }>Logout Account</button>
                    ) : (
                        <button type="button" onClick={() => setIsLoginModalOpen(true)}>Login for create recipe</button>
                    )}
                </div>
            </div>
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)}  />

        </nav>

    )
}