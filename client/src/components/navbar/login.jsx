import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../../redux/actions';

import './login.css'

const LoginModal = ({ isOpen, onClose }) => {
    
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const [loginStatus, setLoginStatus] = useState(null);

  const dispatch = useDispatch();
  

  const handleOnChange = (event) => {

    const { name, value } = event.target;
    setValues({ ...values, [name]: value });

  };
  

  if (!isOpen) {
    return null;
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      await dispatch(Login(values));
      setLoginStatus('Login successful');
      setTimeout(() => {
        setLoginStatus('');
        onClose();
      }, 2000); // establece el estado en una cadena vacía después de 2 segundos
    } catch (error) {
      setLoginStatus('Invalid username or password');
      setTimeout(() => {
        setLoginStatus('');
      }, 2000); // establece el estado en una cadena vacía después de 2 segundos
    }
    
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
          {loginStatus && (
          <p style={{ color: loginStatus.includes('Invalid') ? 'red' : 'green' }}>
            {loginStatus}
          </p>
        )}
          <button type="submit">Submit</button>
          <button type="submit" onClick={() => onClose()}>Close</button>
        </form>
       
      </div>
    </div>
  );
};

export default LoginModal;