import React, { useEffect } from 'react';
import './app.scss';
import Routing from '../pages';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store';
import { MyRejectValue, refreshThunk } from '../entities/user/model/redux';
import ModalWindow from '../widgets/modalWindow';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const window = useAppSelector(state => state.modalWindow);
 
  useEffect(() => {
    dispatch(refreshThunk({}))
    .unwrap()
    .then(() => {
      // navigate('/home');
    } )
    .catch((error: MyRejectValue) => {
      navigate('/auth');
    });
  }, []);

  return (
    <div className="App">
      {window.switch && <ModalWindow />}
      <Routing />
    </div>
  );
}

export default App;
