import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllDiets, postRecipe } from '../../redux/actions';
import './CreateRecipe.css'
import "./formInput.css";
import FormInput from "./FormInput";

//https://github.com/safak/youtube/blob/react-form/src/App.jsx

export default function CreateRecipe() {

  const dispatch = useDispatch()
  const allDiets = useSelector(state => state.diets);

  useEffect(() => {
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

  const [popuflag, setPopupflag] = useState(false)

  const [mensaje, setMensaje] = useState('')

  

  const inputs = [
    {   
      name: "title",
      type: "text",
      placeholder: "Title",
      errorMessage:
        "Title should be 3-16 characters and shouldn't include any special character!",
      label: "Title",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      name: "summary",
      maxLength:"1000",
      type: "text",
      placeholder: "Summary of your recipe",
      errorMessage: "Mensaje de error",
      label: "Summary",
      pattern: "^[a-zA-Z0-9]{30,}$",
      required: true,
    }, 
    {
      name: "steps",
      type: "text",
      placeholder: "Steps of your recipe",
      errorMessage: "Mensaje de error",
      label: "Steps",
      pattern: "^[a-zA-Z0-9]{30,}$",
      required: true
    },
    {
      name: "healthScore",
      type: "number",
      step:"5",
      placeholder: "Health Score of your recipe",
      errorMessage: "Mensaje de error",
      label: "Health Score",
      min:"0",
      max:"100",
      pattern: "^([1-9]|[1-9][0-9]|100)$",
      required: true,
    },
    {
      name: "image",
      type:"url",
      placeholder: "Enter the url",
      errorMessage: "algo anda mal",
      label: "Image",
      pattern: `^(ftp|http|https):\/\/[^ "]+\.(jpeg|jpg|gif|png)$`,
      required: true,
    }
  ];





  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(values.diet.length === 0 ){

      setMensaje('Debes cargar una dieta')
      setPopupflag(true)

    }

    // dispatch(postRecipe(values));
    
  };










  const onChange = (e) => {

    setValues({ ...values, [e.target.name]: e.target.value });
    
  };
  
  const closeForm = (e) => {
    e.preventDefault();
    setPopupflag(false)
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
    <div className="">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
         <label> Select the Diets: </label>
            {allDiets?.map((d) => {
              return (
                <ul key={d.id}>
                  <input
                    type="checkbox"
                    name={d.name}
                    value={d.name}
                    onChange={(e) => handleCheckDiet(e)}
                    className="formInput"
                  />
                  {d.name.charAt(0).toUpperCase() + d.name.slice(1)}
                </ul>
              );
            })}
        <button>Submit</button> 
      </form>
      <div className={popuflag? "overlay active" : "overlay "} >        
                    <div className={popuflag?  "popup active" : "popup "} >
                        <a href="/#"  onClick={(e) => closeForm(e)} className="btn-cerrar-popup">X</a>
                        <div className="container" >
                            <div>
                                {mensaje}
                            </div>
                                <span className="responsive-button" href="/#"  onClick={(e) => closeForm(e)} >Cerrar</span> 
                        </div> 
                    </div>
             </div> 
    </div>
  );
};

