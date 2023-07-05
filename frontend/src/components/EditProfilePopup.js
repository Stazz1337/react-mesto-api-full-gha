import PopupWithForm from "./PopupWithForm";
import { useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup(props) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    resetForm();
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, props.isOpen, setValues, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser(values);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonState={isValid}
    >
      <input
        type="text"
        id="name-input"
        name="name"
        className="popup__text popup__text_type_name"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required
        value={values.name || ""}
        onChange={handleChange}
      />
      <span
        className={`popup__input-error ${
          errors.name ? "popup__input-error_active" : ""
        }`}
      >
        {errors.name}
      </span>
      <input
        type="text"
        id="about-input"
        name="about"
        className="popup__text popup__text_type_about"
        placeholder="Профессия"
        minLength={2}
        maxLength={200}
        required
        value={values.about || ""}
        onChange={handleChange}
      />
      <span
        className={`popup__input-error ${
          errors.about ? "popup__input-error_active" : ""
        }`}
      >
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
