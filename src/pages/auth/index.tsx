import React, { ChangeEvent, FC, useState } from "react";
import './styles.scss';
import AuthApi from "../../fetures/auth/api";
import { useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { MyRejectValue, loginThunk, registerThunk } from "../../entities/user/model/redux";

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
    dispatch(registerThunk({login, password}))
    .unwrap()
    .then(() => {
      navigate('/home');
    } )
    .catch((error: MyRejectValue) => {
      console.log('ОШИБКА В КЛИКЕ ЛОГИНА');
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
      <p>
        Confirm the password
      </p>
      <input 
        type="text" 
        value={cPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCPassword(e.target.value)}
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
    dispatch(loginThunk({login, password}))
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

  return (
    <>
      <div className="centralizing-container">
        <div className="auth-panel regular-panel">
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