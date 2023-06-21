import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import styles from "./styles"
export default function WeeklyCountScreen() {
  const weeklyData = [
    { day: 'Dia 1', calories: 1800, goal: 2000 },
    { day: 'Dia 2', calories: 2200, goal: 2000 },
    { day: 'Dia 3', calories: 1800, goal: 2000 },
    { day: 'Dia 4', calories: 2000, goal: 2000 },
    { day: 'Dia 5', calories: 2300, goal: 2000 },
    { day: 'Dia 6', calories: 1900, goal: 2000 },
    { day: 'Dia 7', calories: 2100, goal: 2000 },
  ];

  const x = 4;

  const getCaloriesColor = (calories, goal) => {
    return calories <= goal ? '#01C099' : '#CB4D4E';
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Resumo Semanal</Text>
        </View>
        <View style={styles.mensagem}>
          <Text style={styles.mensagemText}>Você está cumprindo a meta a {x} dias!</Text>
        </View>
        <View >
        {weeklyData.map((data, index) => (
          <View
            key={index}
            style={[
              styles.dayContainer,
              { backgroundColor: getCaloriesColor(data.calories, data.goal) }
            ]}
          >
            <Text style={styles.dayText}>{data.day}</Text>
            <Text style={styles.caloriesText}>{data.calories} Cal</Text>
            <View style={styles.separator} />
            <Text style={styles.goalText}>Meta: {data.goal} Cal</Text>
          </View>
        ))}
        </View>
      </ScrollView>
    
  );
}
