import { useEffect } from "react";

function Popup(props) {
  useEffect(() => {
    if (!props.isOpen) return;

    function handleESC(e) {
      if (e.key === "Escape") {
        props.onClose();
      }
    }

    document.addEventListener("keydown", handleESC);

    return () => document.removeEventListener("keydown", handleESC);
  }, [props.isOpen, props]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <div
      className={`popup ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={handleOverlayClick}
    >
      {props.children}
    </div>
  );
}

export default Popup;
