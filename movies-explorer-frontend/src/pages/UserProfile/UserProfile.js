import './UserProfile.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useNotificationStore } from '../../hooks/useStore';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { UserInfoStoreContext } from '../../UserInfoStoreContext';

const UserProfile = () => {
  const { currentUser, setLoggedOut, setUpdate } =
    useContext(UserInfoStoreContext);

  const setVisible = useNotificationStore((state) => state.setVisible);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const [editState, setEditState] = useState(false);
  const setEditOn = () => setEditState(true);
  const setEditOff = () => setEditState(false);

  const saveButtonStyle = classNames('user-profile__save-button', {
    'user-profile__save-button_active': editState,
  });
  const profileOptionsStyle = classNames('user-profile__options', {
    'user-profile__options-inactive': editState,
  });
  const nameInputWithError = classNames('user-profile__input', {
    'user-profile__input_with-error': errors.name,
  });
  const emailInputWithError = classNames('user-profile__input', {
    'user-profile__input_with-error': errors.email,
  });

  const handleEditButtonClick = () => {
    setEditOn();
  };

  const handleLogout = () => {
    setLoggedOut();
    localStorage.clear();
    navigate('/', { replace: true });
  };

  const watchName = watch('name');
  const watchEmail = watch('email');

  return (
    <>
      <Header isAuthorized={true} />
      <section className="user-profile">
        <h1 className="user-profile__name">
          Привет, {currentUser?.name ?? 'Друг'}!
        </h1>
        <form
          onSubmit={handleSubmit((data) => {
            if (
              currentUser.name === data.name &&
              currentUser.email === data.email
            ) {
              setEditOff();
              return;
            }
            try {
              if (!errors.email && !errors.name) {
                setEditOff();
                setUpdate(data);
                setVisible({ text: 'Данные успешно изменены!' });
              }
            } catch (e) {
              setVisible({
                text: 'Ошибка редактирования профиля',
                error: true,
              });
            }
          })}
          className="user-profile__form"
        >
          <label htmlFor="user-name" className="user-profile__label">
            <span className="user-profile__label-text">Имя</span>
            <input
              {...register('name', {
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
              id="user-name"
              type="text"
              className={nameInputWithError}
              disabled={!editState}
            />
            {errors?.name && (
            <p className="user-profile__input-error">
              {errors?.name?.message}
            </p>
          )}
          </label>
          <label htmlFor="user-email" className="user-profile__label">
            <span className="user-profile__label-text">E&#8209;mail</span>
            <input
              {...register('email', {
                required: {value: true, message: 'Введите, пожалуйста, E-mail.'},
                pattern: {value: /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Введите корректный E-mail.'}
              })}
              id="user-email"
              type="email"
              className={emailInputWithError}
              disabled={!editState}
            />
            {(errors?.email) && (
            <p className="user-profile__input-error">
              {errors?.email?.message}
            </p>
          )}
          </label>
          <div className={profileOptionsStyle}>
            <button
              type="button"
              className="user-profile__edit"
              onClick={handleEditButtonClick}
            >
              Редактировать
            </button>
            <button
              onClick={handleLogout}
              type="button"
              className="user-profile__log-out"
            >
              Выйти из аккаунта
            </button>
          </div>
          <button
            type="submit"
            className={saveButtonStyle}
            disabled={!isValid || (watchName === currentUser.name && watchEmail === currentUser.email)}
          >
            Сохранить
          </button>
        </form>
      </section>
    </>
  );
};

export default UserProfile;
