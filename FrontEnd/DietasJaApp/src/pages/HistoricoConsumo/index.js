import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Modal, TouchableOpacity, Animated, Alert, ActivityIndicator } from 'react-native';
import styles from "./styles";
import * as Animatable from 'react-native-animatable';
import Particulas from "../../components/ParticulasEfeito";
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WeeklyCountScreen() {

    const navigation = useNavigation();
	const [load, setLoad] = useState(true);
	const [weeklyData, setWeeklyData] = useState([]);
	const [seqDias, setSeqDias] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	var metaDiaria = 0;
	var diasDentroMeta = 0;

	useEffect(()=>{ // Executa sempre que tela recebe o foco
		console.log("Abriu tela de histórico de metas");
		enviarSolicitacaoGETMetaDiaria();
		navigation.addListener('focus', ()=>setLoad(!load));
	}, [load, navigation])

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

	async function enviarSolicitacaoGETMetaDiaria() {
		const token_access = await AsyncStorage.getItem("jwt");
		axios.get(`${API_BASE_URL}/meta/`,
		{
            headers: {Authorization : token_access}
		}, {validateStatus: () => true},)
		.then((resposta) => {
			diasDentroMeta = resposta.data[0]['seq_dias_atual'];
			metaDiaria = resposta.data[0]['qtd_calorias']/1000;  // Converte para kcal
			setSeqDias(diasDentroMeta);
			enviarSolicitacaoGETMetaGamificada();

			console.log('Executou GET de meta diária: dias_dentro_meta = ', diasDentroMeta);
		})
		.catch((erro) => {
            setSeqDias(0);
            setWeeklyData([]);
			if(erro.response?.status == undefined) { // Erro 204 = undefined
				Alert.alert("Erro", "Você não possui uma meta diária cadastrada. Cadastre-a e tente novamente.");
			} else {
				console.error(erro);
			}
			console.log("Erro ao executar GET da meta diária: ", erro);
		})
    .finally(() => {
      setIsLoading(false);
    })
	}

	async function enviarSolicitacaoGETMetaGamificada() {
		const token_access = await AsyncStorage.getItem("jwt");
		axios.get(`${API_BASE_URL}/meta-gamificada/semana`,
		{
            headers: {Authorization: token_access}
		}, {validateStatus: () => true},)
		.then((resposta) => {
			var historico = [];		
			for (var i=0; i<resposta.data.length; i++) {
				var dataFormatada = tratarData(resposta.data[i]["data"]);
				// Insere no final do array
				historico.push({day: dataFormatada, calories: resposta.data[i]["calorias_consumidas"]/1000, goal: metaDiaria});
			}
			setWeeklyData(historico);
			console.log("Executou GET de meta gamificada");
		})
		.catch((erro) => {
			console.log("Erro ao executar GET: ", erro);
		})
    .finally(() => {
      setIsLoading(false);
    })}

	// Função recebe uma data no formato "YYYY-MM-DD" (string) e retorna data no formato DD/MM/AAAA (dia da semana) (string)
	function tratarData(data) {
		const diasSemana = {0: "domingo", 1: "segunda-feira", 2: "terça-feira", 3: "quarta-feira", 4: "quinta-feira", 5: "sexta-feira", 6: "sábado"};
		var dataSplit = data.split("-");
		var dataDMA = dataSplit[2] + "/" + dataSplit[1] + "/" + dataSplit[0];
		var dataMDA = dataSplit[1] + "/" + dataSplit[2] + "/" + dataSplit[0];  // MM/DD/AAAA: Formato aceito para instanciar uma data usando new Date()
		var data = new Date(dataMDA);
		var diaSemana = diasSemana[data.getDay()];
		var dataFormatada = dataDMA + " (" + diaSemana + ")";
		return dataFormatada;
	}

    // Chamar o carregamento da tela
    if (isLoading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#38acbe" />
          </View>
    );}	

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Resumo Semanal</Text>
        </View>
        <View style={styles.mensagem}>
          <Text style={styles.mensagemText}>Você está cumprindo a meta há {seqDias} {seqDias > 1 ? "dias": "dia"}!</Text>
        </View>

        {seqDias != 0 && seqDias % 7 === 0 &&(
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
            <Text style={styles.caloriesText}>{data.calories} kcal</Text>
            <View style={styles.separator} />
            <Text style={styles.goalText}>Meta: {data.goal} kcal</Text>
          </View>
        ))}
        </View>
      </ScrollView>
    
  );
}
