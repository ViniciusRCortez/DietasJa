import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Title from './components/Title/'
import Login from "./pages/Login"
import EditarLogin from "./pages/EditarLogin"
import EditarPerfil from "./pages/EditarPerfil"
import PrimeiroAcesso from "./pages/PrimeiroAcesso";
import Routes from "./routes"
import 'react-native-gesture-handler';
import InformConsumo from "./pages/InformConsumo";
import InformacoesDoUsuario from "./pages/InformacoesDoUsuario";

export default function App() {
    return(
        <View style={styles.container}>
            <InformacoesDoUsuario></InformacoesDoUsuario>
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
  