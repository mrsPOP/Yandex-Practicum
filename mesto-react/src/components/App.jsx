import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setСurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
    cohort: "",
  });
  const [cards, setCards] = useState([]);

  useEffect(() => {
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
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
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
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log("Ошибка, не удалось поставить лайк", err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((req) => {
        if (req["message"] === "Пост удалён") {
          setCards(cards.filter((c) => c._id !== card._id));
        }
      })
      .catch((err) => console.log("Ошибка удаления карточки", err));
  };

  const handleUpdateUser = (newInfo) => {
    api
      .editProfileInfo(newInfo)
      .then((newInfo) => setСurrentUser(newInfo))
      .then(closeAllPopups)
      .catch((err) =>
        console.log("Ошибка изменения информации о пользователе", err)
      );
  };

  const handleUpdateAvatar = (url) => {
    api
      .changeAvatar(url)
      .then((newInfo) => setСurrentUser(newInfo))
      .then(closeAllPopups)
      .catch((err) =>
        console.log("Ошибка изменения аватара пользователя", err)
      );
  };

  const handleAddPlaceSubmit = (newCard) => {
    api
      .addNewCard(newCard)
      .then((nCard) => {
        setCards([nCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка удаления карточки", err));
  };

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
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
        </div>
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
      </CurrentUserContext.Provider>
  );
}

export default App;
