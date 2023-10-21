import React, { useState } from 'react';
import auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth
      .authorizate({ email: formValue.email, password: formValue.password })
      .then((req) => {
        if (req.token) {
          localStorage.setItem('token', `${req.token}`);
          setFormValue({ email: '', password: '' });
          navigate('/');
          handleLogin(formValue.email);
        }
      })
      .catch(() => {
        handleLogin();
      });
  };
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form" onSubmit={handleSubmit} >
        <input
          id="email"
          value={formValue.email}
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
          required
        />
        <input
          id="password"
          value={formValue.password}
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          minLength={8}
          required
        />
        <div className="login__button-box">
          <button className="login__button" type="submit" >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
