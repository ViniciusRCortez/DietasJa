import React from "react";
import { View, Text, Image} from "react-native";
import styles from "./style"

export default function Title(){
    return (
        <View style = {styles.caixaTitle}>
            <Image source = {require("../../assets/outralogo.png")}
             style = {styles.imagemestilo}></Image>
            <Text style = {styles.estiloTitle}>Dietas Já!</Text>
        </View>

    );
}