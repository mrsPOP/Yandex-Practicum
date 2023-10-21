import './Registration.css';
import api from '../../utils/MainApi';
import { TOKEN_KEY } from '../../utils/globalVariables';
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../../hooks/useStore';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { UserInfoStoreContext } from '../../UserInfoStoreContext';
import { useContext } from 'react';

const Registration = () => {
  const navigate = useNavigate();

  const setVisible = useNotificationStore((state) => state.setVisible);
  const { checkToken } = useContext(UserInfoStoreContext);

  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });

  const handleLogin = async ({ email, password }) => {
    try {
      const { token } = await api.login({ email, password });
      localStorage.setItem(TOKEN_KEY, token);
      await checkToken();
      navigate("/movies", { replace: true });
      setVisible({ text: "Вы успешно авторизировались!", error: false });
    } catch (e) {
      setVisible({ text: "Ошибка авторизации", error: true });
    }
  };

  const nameInputWithError = classNames("authorization__input-value", {
    "authorization__input-value_error": errors.name,
  });
  const emailInputWithError = classNames("authorization__input-value", {
    "authorization__input-value_error": errors.email,
  });
  const passwordInputWithError = classNames("authorization__input-value", {
    "authorization__input-value_error": errors.password,
  });

  const handleRegister = async ({ email, password, name }) => {
    try {
      await api.register({ email, password, name });
      handleLogin({ email, password });
    } catch (e) {
      setVisible({ text: "Ошибка регистрации", error: true });
    }
  };

  return (
    <section className="authorization">
      <div className="authorization__container">
        <Link className="authorization__logo" to="/" />
        <h1 className="authorization__title">Добро пожаловать!</h1>
        <form
          className="authorization__form"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="authorization__inputs">
            <label htmlFor="login-user-name" className="authorization__input">
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Введите, пожалуйста, имя.",
                  },
                  minLength: { value: 2, message: "Имя слишком короткое." },
                  maxLength: { value: 30, message: "Имя слишком длиное." },
                  pattern: {
                    value: /^[\p{L}\s-]+$/u,
                    message:
                      "Имя может содержать только кириллицу, латиницу, пробел и тире.",
                  },
                })}
                className={nameInputWithError}
                type="text"
                id="registration-user-name"
                placeholder="Вася"
              />
              {errors?.name && (
                <p className="authorization__input-error">
                  {errors?.name?.message}
                </p>
              )}
            </label>
            <label htmlFor="login-user-email" className="authorization__input">
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Введите, пожалуйста, E-mail.",
                  },
                  pattern: {
                    value:
                      /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Введите корректный E-mail.",
                  },
                })}
                className={emailInputWithError}
                type="email"
                id="registration-user-email"
                placeholder="super@gmail.com"
              />
              {errors?.email && (
                <p className="authorization__input-error">
                  {errors?.email?.message}
                </p>
              )}
            </label>
            <label
              htmlFor="login-user-password"
              className="authorization__input"
            >
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Введите, пожалуйста, пароль.",
                  },
                  minLength: { value: 4, message: "Пароль слишком короткий." },
                })}
                className={passwordInputWithError}
                type="password"
                id="registration-user-password"
                placeholder="puper1234"
              />
              {errors?.password && (
                <p className="authorization__input-error">
                  {errors?.password?.message}
                </p>
              )}
            </label>
          </div>
          <div className="authorization__actions">
            <button
              className="authorization__button"
              type="submit"
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>
            <div className="authorization__wrapper">
              <p className="authorization__text">Уже зарегистрированы?</p>
              <Link to="/signin" className="authorization__link">
                Войти
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registration;
