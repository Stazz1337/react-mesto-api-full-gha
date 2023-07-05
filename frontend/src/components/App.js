import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';

import { useNavigate, Navigate, Route, Routes } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

import ProtectedRouteElement from './ProtectedRoute';

import * as auth from '../utils/Auth';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);

  const [cardsResult, setCardsResult] = useState([]);

  const [selectedCard, setSelectedCard] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userEmail, setUserEmail] = useState(null);

  const [isReg, setIsReg] = useState(null);

  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);

        setToken(data.token);

        setUserEmail(email);

        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setInfoPopupOpen(true);
        setIsReg(true);

        navigate('/signin');
      })
      .catch((err) => {
        setInfoPopupOpen(true);
        setIsReg(false);
        console.log(err);
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    setToken(jwt);
    if (jwt) {
      // проверим токен
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            // авторизуем пользователя
            setIsLoggedIn(true);
            navigate('/');
            setUserEmail(res.email);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
        .then(([userData, cards]) => {
          setCurrentUser(userData);

          setCardsResult(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, token]);

  function handleCardClick(e) {
    setSelectedCard(e);
    setImagePopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setInfoPopupOpen(false);
    setImagePopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
   

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCardsResult((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    

    api
      .deleteCard(card._id, token)
      .then(() => {
        setCardsResult((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(values) {
    setIsLoading(true);
    
    api
      .setUserInfo(values, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(value) {
    setIsLoading(true);
    
    api
      .setAvatar(value, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(values) {
    setIsLoading(true);
   
    api
      .postCardServer(values, token)
      .then((newCard) => {
        setCardsResult([newCard, ...cardsResult]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className='wrapper'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={userEmail} />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                element={
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cardsResult}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleCardDelete}
                  />
                }
              />
            }
          />

          <Route
            path='/signup'
            element={<Register handleRegister={handleRegister} />}
          />
          <Route path='/signin' element={<Login handleLogin={handleLogin} />} />

          <Route
            path='*'
            element={
              isLoggedIn ? <Navigate to='/' /> : <Navigate to='/signin' />
            }
          />
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <InfoTooltip
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          isReg={isReg}
        />

        <PopupWithForm title='Вы уверены?' name='confirm' buttonText='Да' />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
