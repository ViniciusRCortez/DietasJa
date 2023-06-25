import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Modal, TouchableOpacity, Animated } from 'react-native';
import styles from "./styles";
import * as Animatable from 'react-native-animatable';
import Particulas from "../../components/ParticulasEfeito";

export default function WeeklyCountScreen() {

  // Constante que recebe  as calorias diarias
  const weeklyData = [
    { day: 'Dia 1', calories: 1800, goal: 2000 },
    { day: 'Dia 2', calories: 2200, goal: 2000 },
    { day: 'Dia 3', calories: 1800, goal: 2000 },
    { day: 'Dia 4', calories: 2000, goal: 2000 },
    { day: 'Dia 5', calories: 2300, goal: 2000 },
    { day: 'Dia 6', calories: 1900, goal: 2000 },
    { day: 'Dia 7', calories: 2100, goal: 2000 },
  ];
 
  const x = 14;  // constante que recebe a meta
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [message3, setMessage3] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(new Animated.Value(0));

  // CONSTANTE PARA MOSTRAR A COR DO QUADRO DE ACORDO COM O CUMPRIMENTO DA META DE CALORIAS
  const getCaloriesColor = (calories, goal) => {
    return calories <= goal ? '#01C099' : '#CB4D4E';
  };

  // Funcao chamada para o botao de aviso de cumprimento de meta
  const handleButtonPress = () => {
    setMessage('Parabéns por mais uma semana de dedicação e progresso! ');
    setMessage2('Lembre-se sempre de fazer escolhas inteligentes e equilibradas!');
    setMessage3('Mas que tal recompensar todo o seu esforço com aquela comida que você tanto gosta hoje?');
    setModalVisible(true);
  };

  // Funcao para passar animação do Botão de meta
  useEffect(() => {
    const moveUpAnimation = Animated.timing(buttonPosition, {
      toValue: -5,
      duration: 600,
      useNativeDriver: true,
    });
    Animated.loop(Animated.sequence([moveUpAnimation])).start();

    return () => {
      buttonPosition.removeAllListeners();
    };
  }, []);

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Resumo Semanal</Text>
        </View>
        <View style={styles.mensagem}>
          <Text style={styles.mensagemText}>Você está cumprindo a meta a {x} dias!</Text>
        </View>

        {x % 7 === 0 &&(
        <View>
          <TouchableOpacity  style={[styles.button, { transform: [{ translateY: buttonPosition }] }]} onPress={handleButtonPress}>
              <Text style={styles.buttonText}>Clique Aqui</Text>
          </TouchableOpacity>
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Animatable.Text
                  animation="fadeIn" 
                  style={styles.message}
                  duration={4000}
                  >{message}
                </Animatable.Text>
                <Animatable.Text
                  animation="fadeIn" 
                  style={styles.message3}
                  duration={16000}
                  >{message3}
                </Animatable.Text>
                <Button title="Fechar" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </View>
        )}
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
