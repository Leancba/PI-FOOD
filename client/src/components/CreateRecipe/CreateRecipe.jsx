import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllDiets, postRecipe, getAllRecipes } from '../../redux/actions';
import './CreateRecipe.css'
import FormInput from "./FormInput";
import { Link } from "react-router-dom";



export default function CreateRecipe() {

  const dispatch = useDispatch()

  const allDiets = useSelector(state => state.diets);
  const allRecipes = useSelector(state => state.recipes)


  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getAllDiets());
  }, [dispatch]);

  const [values, setValues] = useState({
    title: "",
    summary: "",
    steps: "",
    healthScore: "",
    image: "",
    diet: []
  });

  const [popuflag, setPopupflag] = useState('')

  const [title, setTitle] = useState('Error');
  const [mensaje, setMensaje] = useState('probando');

  const containerClass = title === 'Error' ? 'container-popup-error' : 'container-popup-exito';
  const buttonColor = title === "Error" ? "red" : "green";
  const buttonText = title === "Error" ? "Aceptar" : "Continuar";
  
  

  const inputs = [
    {   
      name: "title",
      type: "text",
      placeholder: "Title",
      errorMessage:
        "Title should be 3-16 characters and shouldn't include any special character!",
      label: "Title",
      required : true, 
      pattern:"[a-zA-Z0-9 ]{3,}"
    },
    {
      name: "summary",
      maxLength:"1000",
      type: "text",
      placeholder: "The summary must contain at least 30 characters",
      errorMessage: "Mensaje de error",
      label: "Summary",
      pattern: "^[a-zA-Z0-9 ]{30,}$",
      required: true,
    }, 
    {
      name: "steps",
      type: "text",
      placeholder: "Steps of your recipe",
      errorMessage: "The recipe must contain at least 3 steps (sentences), separated by a full stop each. Ex: Steps 1. Steps 2. Steps 3.",
      label: "Steps",
      pattern:"^(.*\\..*){1,}\\.$",
      required: true
    },
    {
      name: "healthScore",
      type: "number",
      step:"5",
      placeholder: "Health Score of your recipe",
      errorMessage: "Select a number between 0 and 100",
      label: "Health Score",
      min:"0",
      max:"100",
      pattern: `^([1-9]|[1-9][0-9]|100)$`,
      required: true,
    },
    {
      name: "image",
      type:"url",
      placeholder: "Enter the url",
      errorMessage: "The address does not correspond to an image jpeg , jpg , gif , png.",
      label: "Image",
      pattern: `^(ftp|http|https):\/\/[^ "]+\.(jpeg|jpg|gif|png)$`,
      required: true,
    }
  ];

  const handleSubmit = (e) => {

    e.preventDefault();

    if(values.diet.length === 0 ){
      
      setPopupflag(true)
      setTitle('Error')
      setMensaje('Debes cargar una dieta')
    
    } else if (allRecipes.find((r) => r.title.toLowerCase() === values.title.toLowerCase())){
      setPopupflag(true)
      setTitle('Error')
      setMensaje('La receta ya existe')
    }
     else{

      try {
        
        dispatch(postRecipe(values))
         .then(() => {
          setPopupflag(true)
          setTitle('Exito')
          setMensaje('La receta ha sido creada con exito!')

      })
        .catch((error) => {
        setPopupflag(true)
        setTitle('Error')
        setMensaje('ha ocurrido un error en la creacion de la receta, vuelva a intentarlo.')
     });
        
      } catch (error) {
        console.error(error)
      }
    }
  };

  const onChange = (e) => {

    setValues({ ...values, [e.target.name]: e.target.value });
    
  };
  
  const closeForm = (e) => {
    e.preventDefault();
    setPopupflag(false)
  }

  const closeFormClean = () => {
    setPopupflag(false)
    setValues({
      title: "",
      summary: "",
      steps: "",
      healthScore: "",
      image: "",
      diet: []
    });
  
  }

  const handleCheckDiet = (e) => {
    if (e.target.value && !values.diet.includes(e.target.value)) {
      setValues({
        ...values,
        diet: [...values.diet, e.target.value],
      });
    } else if (!e.target.checked) {
      setValues({
        ...values,
        diet: values.diet.filter((d) => d !== e.target.value),
      });
    }
    console.log(values.diet)
  };

  return (
    <section id="form">
      <h1>Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        
        <div className="inputs" >
          <div className="inputs-container" >
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        </div>
        </div>
        <div className="checkboxes">
            <label className="checkboxes__label">Select the Diets:</label>
            <ul className="checkboxes__list">
              {allDiets?.map((d) => {
              return (
              <li key={d.id} className="checkboxes__item">
              <input
                type="checkbox"
                name={d.name}
                value={d.name}
                onChange={(e) => handleCheckDiet(e)}
                id={`diet-${d.id}`}
                className="checkboxes__input visually-hidden"
          />
              <label htmlFor={`diet-${d.id}`} className="checkboxes__text">
                {d.name.charAt(0).toUpperCase() + d.name.slice(1)}
              </label>
              </li>
            );
          })}
          </ul>
      </div>

      <div class="submit-btn">
        <button type="submit">Enviar</button>
      </div>


      </form>
      <div className={popuflag? "overlay active" : "overlay "} >        
                    <div className={popuflag?  "popup active" : "popup "} >
                      <div className={containerClass}>
                        <div className="titulo">{title}</div>
                        <div className="mensaje">{mensaje}</div>

                        {title === 'Exito' ? (
                          <Link to="/create"> 
                          <button className="btn" onClick={closeFormClean} >
                            Cargar otra receta
                          </button>
                        </Link>
                          
                        ):
                        <button className="btn" onClick={closeForm} >
                           Cerrar
                        </button>
                        }

                      </div> 
                    </div>
             </div> 
    </section>
  );
};

