import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";

import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(values.avatar);
  }

  useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-avatar"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonState={isValid}
    >
      <input
        type="url"
        id="avatarLink-input"
        name="avatar"
        className="popup__text"
        placeholder="Ссылка на картинку"
        required
        value={values.avatar || ""}
        onChange={handleChange}
      />
      <span
        className={`popup__input-error ${
          errors.avatar ? "popup__input-error_active" : ""
        }`}
      >
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
