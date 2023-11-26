import React, { useEffect } from 'react';
import './app.scss';
import Routing from '../pages';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store';
import ModalWindow from '../widgets/modalWindow';
import { MyRejectValue, authThunks } from '../fetures/auth';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const window = useAppSelector(state => state.modalWindow);
 
  useEffect(() => {
    dispatch(authThunks.refreshThunk({}))
    .unwrap()
    .then(() => {
      dispatch({type: 'socket/connect'})
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
