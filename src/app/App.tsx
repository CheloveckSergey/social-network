import React, { useEffect, useRef } from 'react';
import './app.scss';
import Routing from '../pages';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store';
import ModalWindow from '../widgets/modalWindow';
import { MyRejectValue, authThunks } from '../fetures/auth';
import { AudioRoot } from '../widgets/audioRoot';


function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const window = useAppSelector(state => state.modalWindow);

  function refresh() {
    console.log('APP_USE_EFFECT');
    dispatch(authThunks.refreshThunk({}))
    .unwrap()
    .then((data) => {

    })
    .catch((error: MyRejectValue) => {
      navigate('/auth');
    });
  }
 
  useEffect(() => {
    refresh();

    return () => {
      dispatch({type: 'socket/unrefresh'});
      console.log('unrefresh');
    }
  }, []);

  return (
    <div 
      className="App"
      id='App'  
    >
      {window.switch && <ModalWindow />}
      <Routing />
      <AudioRoot />
    </div>
  );
}

export default App;
