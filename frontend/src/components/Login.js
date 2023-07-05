import AuthForm from "./AuthForm";

function Login({ handleLogin }) {
  return (
    <AuthForm
      handleAuth={handleLogin}
      welcomeText={"Вход"}
      buttonText={"Войти"}
    />
  );
}

export default Login;
