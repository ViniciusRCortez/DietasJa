import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerRoutes from "./drawer.routes";
import Login from "../pages/Login";

export default function Routes() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // Função para alterar o estado de login do usuário
  const handleLogin = () => {
    setUserLoggedIn(true);
  };

  const handleLogOut = () => {
    setUserLoggedIn(false);
  }

  return (
    <NavigationContainer>
      {userLoggedIn ? (
        <DrawerRoutes handleLogOut={handleLogOut}/>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
}
