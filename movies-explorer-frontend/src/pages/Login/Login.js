import api from '../../utils/MainApi';
import { TOKEN_KEY } from '../../utils/globalVariables';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Login.css';
import { useBurgerStore, useNotificationStore, useFilmsStore, useFilterStore, useFilterSavedStore } from '../../hooks/useStore';
import classNames from 'classnames';
import { UserInfoStoreContext } from '../../UserInfoStoreContext';
import { useContext } from 'react';

const Login = () => {
  const navigate = useNavigate();

  const setVisible = useNotificationStore((state) => state.setVisible);

  const resetBurger = useBurgerStore(state => state.reset);
  const resetNotification = useNotificationStore(state => state.reset);
  const resetFilms = useFilmsStore(state => state.reset);
  const resetFilter = useFilterStore(state => state.reset);
  const resetFilterSaved = useFilterSavedStore(state => state.reset);

  const resetStores = () => {
    [resetBurger,resetNotification, resetFilms, resetFilter,  resetFilterSaved ].forEach(func => func())
  }

  const { checkToken } = useContext(UserInfoStoreContext);

  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
  });

  const emailInputStyles = classNames('authorization__input-value', {
    'authorization__input-value_error': !!errors.email,
  });
  const passwordInputStyles = classNames('authorization__input-value', {
    'authorization__input-value_error': !!errors.password,
  });

  const handleLogin = async ({ email, password }) => {
    try {
      const { token } = await api.login({ email, password });
      localStorage.setItem(TOKEN_KEY, token);
      resetStores();
      await checkToken();
      navigate('/movies', { replace: true });
      setVisible({text: 'Вы успешно авторизировались!', error: false});
    } catch (e) {
      setVisible({text: 'Ошибка авторизации', error: true});
    }
  };

  return (
    <section className="authorization">
      <div className="authorization__container">
        <Link className="authorization__logo" to="/" />
        <h1 className="authorization__title">Рады видеть!</h1>
        <form
          className="authorization__form"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="authorization__inputs">
            <label htmlFor="login-user-email" className="authorization__input">
              <input
                {...register('email', {
                  required: {value: true, message: 'Введите, пожалуйста, E-mail.'},
                  pattern: {value: /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Введите корректный E-mail.'}
                })}
                className={emailInputStyles}
                type="email"
                id="login-user-email"
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
                {...register('password', {
                  required: {value: true, message: 'Введите, пожалуйста, пароль.'},
                  minLength: { value: 4, message: 'Пароль слишком короткий.' },
                })}
                className={passwordInputStyles}
                type="password"
                id="login-user-password"
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
              type="submit"
              className="authorization__button"
              disabled={!isValid}
            >
              Войти
            </button>
            <div className="authorization__wrapper">
              <p className="authorization__text">Ещё не зарегистрированы?</p>
              <Link to="/signup" className="authorization__link">
                Регистрация
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
