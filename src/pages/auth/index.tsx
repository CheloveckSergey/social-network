import React, { ChangeEvent, FC, useState } from "react";
import './styles.scss';
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useNavigate } from "react-router-dom";

import Rotator from "../../shared/rotator";
import { MyRejectValue, authThunks } from "../../fetures/auth";

interface RegLogSectionProps {
  toggleLogReg: React.Dispatch<React.SetStateAction<boolean>>,
  setEMessage: React.Dispatch<React.SetStateAction<string>>,
}

const RegSection: FC<RegLogSectionProps> = ({ toggleLogReg, setEMessage }) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cPassword, setCPassword] = useState<string>('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  async function register() {
    if (!validation(login, password, cPassword, setEMessage)) {
      return;
    }
    dispatch(authThunks.registerThunk({login, password}))
    .unwrap()
    .then(() => {
      navigate('/home');
    } )
    .catch((error: MyRejectValue) => {
      if (error.message) {
        setEMessage(error.message);
      }
    });
  }

  function validation(login: string, password: string, confirmPassword: string, setEMessage: React.Dispatch<React.SetStateAction<string>>): boolean {
    if (login.length < 4 || login.length > 15) {
      setEMessage('Логин должен быть не меньше 4 и небольше 15 символов');
      return false;
    }
    if (password.length < 7 || password.length > 15) {
      setEMessage('Пароль должен быть не меньше 7 и небольше 15 символов');
      return false;
    }
    if (password !== confirmPassword) {
      setEMessage('Пароли должны совпадать');
      return false;
    }
    return true;
  }

  function passwordLevel(password: string): 'low' | 'middle' | 'hard' | '' {
    if (password.length === 0) {
      return '';
    } else if (password.length < 7 || password.length > 15) {
      return 'low';
    } else if (password.length < 10) {
      return 'middle';
    } else {
      return 'hard';
    }
  }
  
  return (
    <div className="enter-section">
      <p>
        Enter the login
      </p>
      <input 
        type="text" 
        value={login} 
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setLogin(e.target.value);
          setEMessage('');
        }}
      />
      <p>
        Enter the password
      </p>
      <input 
        className={passwordLevel(password)}
        type="text" 
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
          setEMessage('');
        }}
      />
      <p>
        Confirm the password
      </p>
      <input 
        type="text" 
        value={cPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setCPassword(e.target.value);
          setEMessage('');
        }}
      />
      <button className="green send" onClick={register}>
        Registration
      </button>
      <button onClick={() => toggleLogReg(true)}>
        <h4 className="green-to-pale">Назад</h4>
      </button>
    </div>
  )
}

const LoginSection: FC<RegLogSectionProps> = ({ toggleLogReg, setEMessage }) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  async function log() {
    dispatch(authThunks.loginThunk({login, password}))
    .unwrap()
    .then(() => {
      navigate('/home');
    } )
    .catch((error: MyRejectValue) => {
      console.log('ОШИБКА В КЛИКЕ ЛОГИНА');
      console.log(error);
      if (error.message) {
        setEMessage(error.message);
      }
    });
  }
  
  return (
    <div className="enter-section">
      <p>
        Enter the login
      </p>
      <input 
        type="text" 
        value={login} 
        onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
      />
      <p>
        Enter the password
      </p>
      <input 
        type="text" 
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
      <button className="green send" onClick={log}>
        Login
      </button>
      <p className="extra">Не зарегистрированы?</p>
      <button onClick={() => toggleLogReg(false)}>
        <h4 className="green-to-pale">Регистрация</h4>
      </button>
    </div>
  )
}

const AuthPage: FC = () => {
  const [logReg, toggleLogReg] = useState<boolean>(true);
  const [eMessage, setEMessage] = useState<string>('');

  const { loading } = useAppSelector(state => state.user);

  return (
    <>
      <div className="centralizing-container">
        <div className="auth-panel regular-panel">
          {loading && 
          <div className="blackout-auth">
            <Rotator size={50} />
          </div>}
          <h1 className="icon">
            Здесь будет иконка
          </h1>
          <h3 className="welcome-header">
            Welcome to The Club, Body!
          </h3>
          <p className="error">
            {eMessage}
          </p>
          {logReg ? (
            <LoginSection toggleLogReg={toggleLogReg} setEMessage={setEMessage} />
          ) : (
            <RegSection toggleLogReg={toggleLogReg} setEMessage={setEMessage} />
          )}
        </div>
      </div>
    </>
  )
}

export default AuthPage;