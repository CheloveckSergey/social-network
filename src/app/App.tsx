import React, { useEffect, useRef } from 'react';
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

  const isExecuted = useRef(false);
 
  useEffect(() => {
    if (!isExecuted.current) {
      dispatch(authThunks.refreshThunk({}))
      .unwrap()
      .then((data) => {

      })
      .catch((error: MyRejectValue) => {
        navigate('/auth');
      });
      isExecuted.current = true;
    }

    return () => {
      dispatch({type: 'socket/unrefresh'});
      console.log('unrefresh');
    }
  }, []);

  return (
    <div className="App">
      {window.switch && <ModalWindow />}
      <Routing />
    </div>
  );
}

export default App;
