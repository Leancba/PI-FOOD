import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../../redux/actions';
import './login.css'

const LoginModal = ({ isOpen, onClose }) => {
    
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const dispatch = useDispatch();
  const token = useSelector(state => state.token)
  console.log(token)

  const handleOnChange = (event) => {

    const { name, value } = event.target;
    setValues({ ...values, [name]: value });

  };
  

  if (!isOpen) {
    return null;
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(values)
    dispatch(Login(values))
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login</h2>
        <form onSubmit={handleOnSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={values.username} onChange={handleOnChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={values.password} onChange={handleOnChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
        <button type="submit">Cerrar</button>
      </div>
    </div>
  );
};

export default LoginModal;