import Card from "./Card";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img
            src={currentUser.avatar}
            alt="аватар пользователя"
            className="profile__avatar"
          />
          <button
            className="profile__avatar-edit-button link"
            type="button"
            aria-label="редактировать аватар"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button link"
              type="button"
              aria-label="редактировать"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button link"
          type="button"
          aria-label="добавить"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="places" aria-label="карточки мест">
        <ul className="place">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
