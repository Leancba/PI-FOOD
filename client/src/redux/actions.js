import {
    RECIPES,
    RECIPES_BY_NAME,
    GET_ALL_DIETS,
    FILTER_BY_DIETS,
    FLAG,
    SORT_BY_TITLE,
    SORT_BY_SCORE,
    RECIPE_DETAIL,
    CLEAN_DETAIL_RECIPE,
    POST_RECIPE,
    LOGIN_SUCCESS,
    LOGOUT
} from "./actionTypes";

import axios from 'axios'


export const Login = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3001/login', payload);
            const token = response.data.token;
            dispatch({ type: LOGIN_SUCCESS , payload: token });
        } catch (error) {
            console.log('Error en postLogin:', error);
            throw new Error('Login error'); // lanzamos un nuevo error usando throw
          }
    };
};


export function Logout() {

    return {
        type: LOGOUT
    }
}

export const postRecipe = (payload) => {

    try {
        return async () => {
            let newRecipe = await axios.post('http://localhost:3001/recipe', payload);
            console.log(newRecipe)
            return newRecipe;

        };
    } catch (error) {

        console.log('ERROR EN postRecipe', error)

    }
};

export function getAllRecipes() {

    return async function (dispatch) {

        var result = await axios.get('http://localhost:3001/recipes');

        return dispatch({
            type: RECIPES,
            payload: result.data
        })
    }
}

// NAME: Traigo a la receta por su nombre -------------------------------------------
export const getRecipeByName = (title) => {

    return async (dispatch) => {
        try {

            let result = await axios.get(`http://localhost:3001/recipes?title=${title}`);

            dispatch({
                type: RECIPES_BY_NAME, payload: result.data, flag: false
            });

        } catch (error) {

            dispatch({
                type: RECIPES_BY_NAME, payload: [], flag: true
            });

        }
    };
};


export const getRecipeDetail = (id) => {

    return async (dispatch) => {

        try {
            let result = await axios.get(`http://localhost:3001/recipe/${id}`);

            dispatch({
                type: RECIPE_DETAIL,
                payload: result.data,
                flag: false
            });

        } catch (error) {

            dispatch({

                type: RECIPE_DETAIL, flag: true
            });

            console.log('entro en error')
            console.log('ERROR EN getRecipeId /actions', error);

        }
    };
};

export const cleanRecipes = () => {
    return {

        type: CLEAN_DETAIL_RECIPE,
        payload: []

    };
};

export function setFlag(payload) {

    return {

        type: FLAG,
        payload

    }
};


export function getAllDiets() {

    return async function (dispatch) {
        var result = await axios.get('http://localhost:3001/diets')

        return dispatch({
            type: GET_ALL_DIETS,
            payload: result.data
        })

    };

};

export function filterRecipesByDiets(payload) {
    console.log(payload)
    return {

        type: FILTER_BY_DIETS,
        payload

    }
}

export function SortByTitle(payload) {

    return {
        type: SORT_BY_TITLE,
        payload
    }
}

export function SortByScore(payload) {

    return {
        type: SORT_BY_SCORE,
        payload
    }
}