import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import styles from "./styles"

export default function WeeklyCountScreen() {
  // Dados de exemplo - calorias consumidas por dia
  const weeklyData = [
    { day: 'Segunda', calories: 1800, goal: 2000 },
    { day: 'Terça', calories: 2200, goal: 2000 },
    { day: 'Quarta', calories: 1800, goal: 2000 },
    { day: 'Quinta', calories: 1, goal: 2000 },
    { day: 'Sexta', calories: 2300, goal: 2000 },
    { day: 'Sábado', calories: 1900, goal: 2000 },
    { day: 'Domingo', calories: 2100, goal: 2000 },
  ];

  // Função para determinar a cor do elemento com base na meta alcançada
  const getCaloriesColor = (calories, goal) => {
    if (calories <= goal) {
      return '#20A50B'; // Verde se a meta for alcançada
    } else {
      return '#DA0909'; // Vermelho se a meta não for alcançada
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.textoContainer}>
      <Text style={styles.textoemcima}>Você está cumprindo a meta 4 dias!</Text>
      </View>
      {weeklyData.map((data, index) => (
        <View
          key={index}
          style={[
            styles.dayContainer,
            { backgroundColor: getCaloriesColor(data.calories, data.goal) },
          ]}
        > 
          <Text style={styles.dayText}>{data.day}</Text>
          <Text style={styles.caloriesText}>{data.calories} Kcal</Text>
          <Text style={styles.goalText}>{data.goal} Kcal</Text>
        </View>
      ))}
    </ScrollView>
  );
}
