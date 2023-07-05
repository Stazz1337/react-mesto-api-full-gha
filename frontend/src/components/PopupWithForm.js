import Popup from "./Popup";

function PopupWithForm(props) {
  return (
    <Popup onClose={props.onClose} isOpen={props.isOpen}>
      <div className="popup__container">
        <button
          className="popup__close link"
          type="button"
          aria-label="закрыть"
          onClick={props.onClose}
        />

        <form
          className={`popup__form`}
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
        >
          <h2 className={`popup__heading`}>{props.title}</h2>

          {props.children}

          <button
            name="button"
            type="submit"
            className="popup__button"
            disabled={!props.buttonState}
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default PopupWithForm;
