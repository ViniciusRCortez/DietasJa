import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles"

export default function Welcome() {
    const navigation = useNavigation();

    const handleLoginPress = () => {
      navigation.navigate('Login');
    };
    return(

       < View style ={styles.container}>
        <View style ={styles.containerlogo}>
            <Animatable.Image source={require('../../assets/outralogo.png')}
            animation="flipInY"
            style={{width:370, height:200}}
            rezideMode="contain"></Animatable.Image>
            <Text style = {styles.titulologo}>DietasJá</Text>
        </View>

        <Animatable.View style ={styles.containerForm} animation="fadeInUp" delay = {700}>
            <Text style = {styles.title}>Controle sua saúde, conquiste seus objetivos!</Text>
            <Text style = {styles.text}>Faça o login para começar</Text>

            <TouchableOpacity style = {styles.botao} onPress={handleLoginPress} >
                <Text style = {styles.botaotexto}>Acessar</Text>
            </TouchableOpacity>
        </Animatable.View>

       </View>

    )
}