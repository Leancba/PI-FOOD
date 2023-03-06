import {
RECIPES,
RECIPES_BY_NAME,
GET_ALL_DIETS,
FILTER_BY_DIETS,
FLAG,
FLAG_ID,
SORT_BY_TITLE,
SORT_BY_SCORE,
RECIPE_DETAIL,
CLEAN_DETAIL_RECIPE,
POST_RECIPE
} from "./actionTypes";

const initialState = {

    recipes:[],

    //estado para realizar filtro de dieta
    recipesForFilter: [],
    recipesDetails: [],
    recipesbyname:[],
    diets : [],
    flag : false


}

export default function rootReducer (state = initialState, action){

    

    
    
    switch (action.type) {


        case POST_RECIPE:
            return {
                ...state,
            };

        case FLAG:
            
            return {


                ...state,
                flag : action.payload

               
            }


        case RECIPES:
            
            return {


                ...state,
                recipes : action.payload,

                recipesForFilter: action.payload

               
            }
            
            

        case RECIPES_BY_NAME:
           
            return {

                ...state, 
                recipes : action.payload,
                recipesForFilter:action.payload,
                flag: action.flag
                
                
            }

        case RECIPE_DETAIL:
            console.log('estoy en detail', action.flag)
            return {
                ...state,
                recipesDetails: action.payload,
                flag: action.flag
            };
        
        case CLEAN_DETAIL_RECIPE:

            return {
                ...state,
                recipesDetails: action.payload,
            };
        

        case GET_ALL_DIETS:

            return {
                ...state,
                diets : action.payload
            }

        case FILTER_BY_DIETS:

            const recipeFilter = state.recipesForFilter.filter(el => el.diets.includes(action.payload))

            //aca mediante el action.payload(tipo de dieta), para el rendereizado del home, ubico
            //en primer lugar el tipo de dieta para poder ver al filtrarlo en el front

            recipeFilter.forEach(receta => {
                const indiceTipoDieta = receta.diets.indexOf(action.payload);
                if (indiceTipoDieta > -1) {

                  receta.diets.splice(indiceTipoDieta, 1);
                  receta.diets.unshift(action.payload);

                }
              });

            console.log(recipeFilter)

            if(recipeFilter.length > 0){

                return {
                    ...state,
                    recipes: recipeFilter,
               }

            } else {
                return {
                    ...state,
                    flag : true
                }
            }

            case SORT_BY_TITLE:

    
               if (action.payload === 'ASC') {
    
               const sorted =  state.recipes.sort(( el1, el2 ) => {
                
                    if(el1.title > el2.title) {
                        return 1;
                    }
                    if(el1.title < el2.title) {
                        return -1;
                    }
                    return 0;
                }) 
                
                return {
                    ...state,
                    recipes: sorted
                    
                }
    
            } else if (action.payload === 'DESC') {
    
                const sorted =  state.recipes.sort(( el1, el2 ) => {
    
                    if(el1.title > el2.title) {
                        return -1;
                    }
                    if(el1.title < el2.title) {
                        return 1;
                    }
                    return 0;
                })
                
                return {
                    ...state,
                    recipes: sorted
                    
            }
        }

        case SORT_BY_SCORE:

            if (action.payload === 'MIN') {
    
                const sorted =  state.recipes.sort(( el1, el2 ) => {
                 
                     if(el1.healthScore > el2.healthScore) {
                         return 1;
                     }
                     if(el1.healthScore < el2.healthScore) {
                         return -1;
                     }
                     return 0;
                 }) 
                 console.log('prueba', sorted)
                 return {
                     ...state,
                     recipes: sorted
                     
                 }
     
             } else if (action.payload === 'MAX') {
     
                 const sorted =  state.recipes.sort(( el1, el2 ) => {
     
                     if(el1.healthScore > el2.healthScore) {
                         return -1;
                     }
                     if(el1.healthScore < el2.healthScore) {
                         return 1;
                     }
                     return 0;
                 })
                 
                 return {
                     ...state,
                     recipes: sorted
                     
             }
         }

             default: {
                return state
            };
        }
    }