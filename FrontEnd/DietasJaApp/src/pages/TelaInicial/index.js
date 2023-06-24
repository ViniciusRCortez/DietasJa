import {React, useState} from 'react';
import { View, Text,  } from 'react-native';
import styles from "./styles"
import * as Animatable from 'react-native-animatable';

export default function TelaInicial() {

  const nome = "Marcus";
  const meta = 2510;
  const consumo = 2000;
  const carb = 500;
  const proteina = 400;
  const gordura = 1000;
  const resto = (meta - consumo);

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