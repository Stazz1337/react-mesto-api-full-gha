import { useState, useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AuthForm(props) {
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.handleAuth(values.email, values.password);
  };

  return (
    <div className="authForm">
      <p className="authForm__welcome">{props.welcomeText}</p>
      <form onSubmit={handleSubmit} className="authForm__form" noValidate>
        <input
          className="authForm__input"
          placeholder="Email"
          id="email"
          name="email"
          type="email"
          value={values.email || ""}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={30}
          onBlur={() => setIsEmailTouched(true)}
        />

        <span
          className={`popup__input-error ${
            isEmailTouched && errors.email ? "popup__input-error_active" : ""
          }`}
        >
          {errors.email}
        </span>

        <input
          className="authForm__input"
          placeholder="Пароль"
          id="password"
          name="password"
          type="password"
          value={values.password || ""}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={30}
          onBlur={() => setIsPasswordTouched(true)}
        />

        <span
          className={`popup__input-error ${
            isPasswordTouched && errors.password
              ? "popup__input-error_active"
              : ""
          }`}
        >
          {errors.password}
        </span>

        <button
          type="submit"
          onSubmit={handleSubmit}
          className="authForm__button"
          disabled={!isValid}
        >
          {props.buttonText}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
