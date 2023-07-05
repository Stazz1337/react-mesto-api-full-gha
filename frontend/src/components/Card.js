import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = (`place__like ${
    isLiked && "place__like_active"
  }`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="place__item-wrapper">
      <figure className="place__item">
        <img
          src={props.card.link}
          alt={props.card.name}
          className="place__image"
          onClick={handleClick}
        />
        {isOwn && (
          <button
            className="place__delete link"
            type="button"
            aria-label="удалить"
            onClick={handleDeleteClick}
          />
        )}

        <figcaption className="place__title-wrapper">
          <h2 className="place__title">{props.card.name}</h2>
          <div className="place__like-wrapper">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}
            />
            <p className="place__count">{props.card.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;
