import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Registration';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';
import auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setСurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
    _id: '',
    cohort: '',
  });
  const [cards, setCards] = useState([]);
  const [infoTooltipPopupOpened, setInfoTooltipPopupOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] =
    useState(false);
  const [userEmail, setUserEmail] = useState('');
  // a variable to check for the token in App, to prevent ProtectedRoute from triggering too early
  const [isJwtTokenChecked, setIsJwtTokenChecked] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setСurrentUser(data);
        })
        .catch(() => console.log);

      api
        .getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch(() => console.log);
    }
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setInfoTooltipPopupOpened(false);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log('Ошибка, не удалось поставить лайк', err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(function (cards) {
          return cards.filter((c) => c._id !== card._id);
        });
      })
      .catch((err) => console.log('Ошибка удаления карточки', err));
  };

  const handleUpdateUser = (newInfo) => {
    api
      .editProfileInfo(newInfo)
      .then((newInfo) => setСurrentUser(newInfo))
      .then(closeAllPopups)
      .catch((err) =>
        console.log('Ошибка изменения информации о пользователе', err)
      );
  };

  const handleUpdateAvatar = (url) => {
    api
      .changeAvatar(url)
      .then((newInfo) => setСurrentUser(newInfo))
      .then(closeAllPopups)
      .catch((err) =>
        console.log('Ошибка изменения аватара пользователя', err)
      );
  };

  const handleAddPlaceSubmit = (newCard) => {
    api
      .addNewCard(newCard)
      .then((nCard) => {
        setCards([nCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log('Ошибка удаления карточки', err));
  };

  const handleRegister = (valid) => {
    setIsSuccessInfoTooltipStatus(valid);
    setInfoTooltipPopupOpened(true);
  };

  const handleLogin = (email) => {
    if (email) {
      setUserEmail(email);
      setIsJwtTokenChecked(true);
      setLoggedIn(true);
    } else {
      setIsSuccessInfoTooltipStatus(false);
      setInfoTooltipPopupOpened(true);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setIsJwtTokenChecked(true);
  };

  const getAccess = (jwt) => {
    auth
      .authenticate(jwt)
      .then((res) => {
        setUserEmail(res.email);
        setIsJwtTokenChecked(true);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log('Ошибка: некорректный токен', err);
        logOut();
      });
  };

  const checkToken = () => {
    setIsJwtTokenChecked(false);
    const jwt = localStorage.getItem('token');
    if (jwt) {
      getAccess(jwt);
    } else {
      logOut();
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          handleLogOut={logOut}
          isJwtTokenChecked={isJwtTokenChecked}
          email={userEmail}
        />
        {isJwtTokenChecked && (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement isAllowed={loggedIn} path={'/sign-in'}>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                  />
                  <Footer />
                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                  />
                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                  />

                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleAddPlaceSubmit}
                  />

                  <ImagePopup
                    isOpen={isImagePopupOpen}
                    card={selectedCard}
                    onClose={closeAllPopups}
                  />
                </ProtectedRouteElement>
              }
            />

            <Route
              path="/sign-up"
              element={
                <ProtectedRouteElement isAllowed={!loggedIn} path={'/'}>
                  <Register handleRegister={handleRegister} replace />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/sign-in"
              element={
                <ProtectedRouteElement isAllowed={!loggedIn} path={'/'}>
                  <Login handleLogin={handleLogin} replace />
                </ProtectedRouteElement>
              }
            />
            <Route path="*" element={<Navigate to={'/'} replace />} replace />
          </Routes>
        )}
        <InfoTooltip
          name="info-tooltip"
          buttonText="Да"
          isOpen={infoTooltipPopupOpened}
          onClose={closeAllPopups}
          isSuccessInfoTooltipStatus={isSuccessInfoTooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
