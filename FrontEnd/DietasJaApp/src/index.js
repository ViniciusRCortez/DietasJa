import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Title from './components/Title/'
import Login from "./pages/Login"
import EditarLogin from "./pages/EditarLogin"
import EditarPerfil from "./pages/EditarPerfil"
import Routes from "./routes"
import PrimeiroAcesso from "./pages/PrimeiroAcesso";
import 'react-native-gesture-handler';
import TelaInicial from "./pages/TelaInicial";
import EditarMetas from "./pages/EditarMetas";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
    return(
        <View style={styles.container}>
             <Routes></Routes>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingTop: 0,
    },
  });
  