import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/auth";

const Register = ({ handleRegister }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth
      .registrate({ email: formValue.email, password: formValue.password })
      .then((req) => {
        if (req) {
          setFormValue({ email: "", password: "" });
          navigate("/sign-in");
          handleRegister(true);
        }
      })
      .catch(() => {
        handleRegister(false);
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
    <div className="register">
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          required
          id="email"
          value={formValue.email}
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          id="password"
          value={formValue.password}
          type="password"
          name="password"
          placeholder="Пароль"
          minLength={8}
          onChange={handleChange}
        />
        <div className="register__button-box">
          <button className="register__button" type="submit">
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className="register__sign-in">
        <p>Уже зарегистрированы?</p>
        <Link to="sign-in" className="register__link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
