import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from "../utils/mestoAuth";

import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Footer from "./Footer";
import InfoTooltip from "./InfoTooltip";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";

import successIcon from "../images/success-signup.svg";
import errorIcon from "../images/error-login.svg";
import { loginMessages, registrationMessages } from "../utils/constants";

function App() {
  const history = useHistory();

  //Стейты
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [infoContent, setInfoContent] = useState({ icon: null, text: null });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState("");

  const [isRenderLoading, setIsRenderLoading] = useState(false);


  //Эффекты при монтировании/обновлении компонента
  useEffect(() => {
    Promise.all([api.getCardList(), api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData);
        setCurrentUser((state) => ({...state, ...userData}) );
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
  
      if (!token) return;
  
      auth
        .getContent(token)
        .then((res) => {
          setCurrentUser((state) => ({...state, email: res.data.email}) );
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }; 

    checkToken();
  }, [history]);

  //Открытие попапов
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeleteCardClick = (card) => {
    setIsDeleteCardPopupOpen(true);
    setDeletedCard(card);
  };

  //Закрытие попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
    setIsInfoOpen(false);
  };

  //Рендер загрузки
  const toggleRenderLoading = () => {
    setIsRenderLoading((isRenderLoading) => !isRenderLoading);
  };

  //Действия с карточками (просмотр, лайк, удаление, добавление)
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((card) => (card._id === newCard._id ? newCard : card))
        );
      })
      .catch((err) => console.error(err));
  };

  const handleCardDelete = () => {
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => item._id !== deletedCard._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => toggleRenderLoading());
  };

  const handleAddPlaceSubmit = (cardData) => {
    api
      .addNewCard(cardData)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => toggleRenderLoading());
  };

  //Изменение данных пользователя (данные, аватар)
  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((newData) => {
        setCurrentUser(state => ({...state,...newData}));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => toggleRenderLoading());
  };

  const handleUpdateAvatar = (avatarData) => {
    api
      .setUserAvatar(avatarData)
      .then((newData) => {
        setCurrentUser(state => ({...state,...newData}));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => toggleRenderLoading());
  };

  //Регистрация, авторизация, выход из приложения
  const handleRegister = (userData) => {
    return auth
      .registration(userData)
      .then(() => {
        setInfoContent({
          icon: successIcon,
          text: "Вы успешно зарегистрировались!",
        });
        setIsInfoOpen(true);

        setTimeout(() => {
          history.push("/");
          setIsInfoOpen(false);
        }, 1500);
      })
      .catch((resCode) => {
        const registrationMessage = registrationMessages[resCode]
          ? registrationMessages[resCode]
          : "Что-то пошло не так! Попробуйте ещё раз.";

        setInfoContent({ icon: errorIcon, text: registrationMessage });
        setIsInfoOpen(true);
      });
  };

  const handleLogin = (loginData) => {
    return auth
      .authorization(loginData)
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          setCurrentUser((state) => ({...state, email: loginData.email}));
        }
        setLoggedIn(true);
        history.push("/");
      })
      .catch((errorCode) => {
        const errorMessage = loginMessages[errorCode]
          ? loginMessages[errorCode]
          : "Что-то пошло не так! Попробуйте ещё раз.";

        setInfoContent({ icon: errorIcon, text: errorMessage });
        setIsInfoOpen(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedIn={loggedIn}
        onLogout={handleLogout}
      />

      <Switch>
        <Route path="/sign-up">
          {<Register onRegister={handleRegister} />}
        </Route>

        <Route path="/sign-in">
          {<Login onLogin={handleLogin} />}
        </Route>

        <ProtectedRoute path="/" loggedIn={loggedIn}>
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
          />
        </ProtectedRoute>

        <Route path="*">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>

      <Footer />

      <InfoTooltip
        icon={infoContent.icon}
        text={infoContent.text}
        isOpen={isInfoOpen}
        onClose={closeAllPopups}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isRenderLoading={isRenderLoading}
        renderLoading={toggleRenderLoading}
        renderLoadingButtonText={"Сохранение..."}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isRenderLoading={isRenderLoading}
        renderLoading={toggleRenderLoading}
        renderLoadingButtonText={"Обновление..."}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddNewCard={handleAddPlaceSubmit}
        isRenderLoading={isRenderLoading}
        renderLoading={toggleRenderLoading}
        renderLoadingButtonText={"Добавление..."}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        isRenderLoading={isRenderLoading}
        renderLoading={toggleRenderLoading}
        onDeleteCard={handleCardDelete}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
