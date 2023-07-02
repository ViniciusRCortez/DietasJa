import {React, useState, useEffect} from 'react';
import { View, Text,  } from 'react-native';
import styles from "./styles"
import * as Animatable from 'react-native-animatable';

import axios from 'axios';
import { API_BASE_URL } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Login from "../Login"

export default function TelaInicial() {
  
  const [nome, setNome] = useState('')
  const meta = 2510;
  const consumo = 2000;
  const carb = 500;
  const proteina = 400;
  const gordura = 1000;
  const resto = (meta - consumo);

  const navigation = useNavigation();

  useEffect(() => {
    getUserInfo();
  }, [])

  async function getUserInfo(){
    try {
      const token = await AsyncStorage.getItem('jwt')
      const response = await axios.get(`${API_BASE_URL}/user-metrics/`, {
        headers: {
          Authorization: token,
        },
      })
      if (response.status == 200){
        const nome = response.data.nome
        setNome(nome)
      } else{
        console.log(response.data)
      }
    } catch (error) {
      if(error.response.status == 401){
        navigation.navigate(Login)
    }
      console.log(error)
    }
  }
  return (
    <View style={styles.container}>
      <View style = {styles.containerTexto}>
      <Text style={styles.greetingText}>Olá, {nome}</Text>
      </View>
      <Animatable.View animation= "fadeInLeft" delay={500} style={styles.rectangle}>
        <Text style={styles.infoTitle}>Meta de Calorias Diárias</Text>
        <View style={styles.separator} />
        <Text style={styles.infoValue}>{meta} cal</Text>
      </Animatable.View>

      <Animatable.View animation= "fadeInLeft" delay={600} style={styles.redrectangle}>
        <Text style={styles.infoTitle}>Calorias Consumidas</Text>
        <View style={styles.separator} />
        <Text style={styles.infoValue}>{consumo} cal</Text>
      </Animatable.View>

      <Animatable.View animation= "fadeInLeft" delay={700} style={styles.macronutrientsRectangle}>
        <View />
            <View style={styles.macronutrientContainer}>
            <Text style={styles.macronutrientTitle}>Carboidratos</Text>
            <Text style={styles.macronutrientValueCarb}>{carb}g</Text>
        </View>
            <View style={styles.divider} />
            <View style={styles.macronutrientContainer}>
            <Text style={styles.macronutrientTitle}>Proteínas</Text>
                <Text style={styles.macronutrientValue}>{proteina}g</Text>   
        </View>
        <View style={styles.divider} />
        <View style={styles.macronutrientContainer}>
          <Text style={styles.macronutrientTitle}>Gorduras </Text>
          <Text style={styles.macronutrientValue}>{gordura}g</Text>
        </View>
        </Animatable.View>
        <View style={styles.remainingCaloriesContainer}>
        <Text style={styles.remainingCaloriesText}>
          Faltam {resto} calorias para consumir hoje
        </Text>
      </View>

    </View>
  );
}