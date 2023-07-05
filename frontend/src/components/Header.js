import { useState } from "react";
import logo from "../images/header-logo.svg";
import { useNavigate, Link, useLocation } from "react-router-dom";
import burger from "../images/header-burger.svg";
import close from "../images/form-Close-Icon.svg";

function Header({ email }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [navBar, setNavBar] = useState(false);

  function showNavBar() {
    setNavBar(!navBar);
  }

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/signin");
    setNavBar(false);
  }

  return (
    <header className="header">
      {location.pathname === "/" && (
        <>
          <ul
            className={navBar ? "header__dropdown" : "header__dropdown_hidden"}
          >
            <li>
              <Link to="#" className="header__link">
                {email}
              </Link>
            </li>
            <li>
              <button onClick={signOut} className="header__button link">
                Выйти
              </button>
            </li>
          </ul>

          <img src={logo} alt="Место Россия" className="header__logo" />

          <button
            className="header__burger"
            onClick={showNavBar}
            style={{
              backgroundImage: navBar ? `url(${close})` : `url(${burger})`,
            }}
          ></button>

          <ul className="header__nav header__nav_hidden">
            <li>
              <Link to="#" className="header__link">
                {email}
              </Link>
            </li>

            <li>
              <button onClick={signOut} className="header__button link">
                Выйти
              </button>
            </li>
          </ul>
        </>
      )}

      {location.pathname === "/signup" && (
        <>
          <img src={logo} alt="Место Россия" className="header__logo" />
          <ul className="header__nav ">
            <li>
              <Link to="signin" className="header__link link">
                Войти
              </Link>
            </li>
          </ul>
        </>
      )}

      {location.pathname === "/signin" && (
        <>
          <img src={logo} alt="Место Россия" className="header__logo" />
          <ul className="header__nav ">
            <li>
              <Link to="signup" className="header__link link">
                Регистрация
              </Link>
            </li>
          </ul>
        </>
      )}
    </header>
  );
}

export default Header;
