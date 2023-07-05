import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";

import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(values);
  }

  useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      buttonText={props.isLoading ? "Сохранение..." : "Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonState={isValid}
    >
      <input
        type="text"
        id="imageName-input"
        name="name"
        className="popup__text popup__text_type_imageName"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        onChange={handleChange}
        value={values.name || ""}
      />
      <span
        className={`popup__input-error ${
          errors.name ? "popup__input-error_active" : ""
        }`}
      >
        {errors.name}
      </span>
      <input
        type="url"
        id="imageLink-input"
        name="link"
        className="popup__text popup__text_type_imageLink"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={values.link || ""}
      />
      <span
        className={`popup__input-error ${
          errors.link ? "popup__input-error_active" : ""
        }`}
      >
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
