import Popup from "./Popup";

function ImagePopup(props) {
  return (
    <Popup onClose={props.onClose} isOpen={props.isOpen}>
      <div className="popup__container-image">
        <button
          className="popup__close link"
          type="button"
          aria-label="закрыть"
          onClick={props.onClose}
        />

        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image"
        />
        <p className="popup__image-title">{props.card.name}</p>
      </div>
    </Popup>
  );
}

export default ImagePopup;
