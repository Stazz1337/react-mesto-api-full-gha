import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ handleRegister }) {
  return (
    <>
      <AuthForm
        handleAuth={handleRegister}
        welcomeText={"Регистрация"}
        buttonText={"Зарегистрироваться"}
      ></AuthForm>
      <div className="register">
        <div className="register__signin">
          <p className="register__signin-label">
            {" "}
            Уже зарегистрированы? &nbsp;{" "}
          </p>
          <Link to="/signin" className="register__signin-link">
            Войти
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
