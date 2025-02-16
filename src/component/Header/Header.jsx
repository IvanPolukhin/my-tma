import React from "react";
import "./Header.css";
import Button from "../Button/Button";
import { useTelegram } from "../../hook/useTelegram";

const Header = () => {
  const { user, onClose } = useTelegram();
  return (
    <div className={"header"}>
      <Button onClick={onClose}>Закрыть</Button>
      <span className={"username"}>{user?.username}</span>
    </div>
  );
};

export default Header;
