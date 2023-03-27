import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../../redux/actions';

import './logout.css'

const LogoutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();    
  
  

  if (!isOpen) {
    return null;
  }

  const Logouts = () => {
    dispatch(Logout())
    onClose()
  };

  return (
    <div id="myModal" class="custom-modal">
    <div class="custom-modal-content">
      <div class="custom-modal-header">
        <h2>¿Desea cerrar sesión?</h2>
        <span class="custom-close">&times;</span>
      </div>
      <div class="custom-modal-body">
        <p>Presione "Sí" para cerrar sesión o "No" para continuar con la sesión actual.</p>
      </div>
      <div class="custom-modal-footer">
        <button onClick={() => Logouts() } id="yesBtn">Sí</button>
        <button onClick={() => onClose()} id="noBtn">No</button>
      </div>
    </div>
  </div>
  );
};

export default LogoutModal;