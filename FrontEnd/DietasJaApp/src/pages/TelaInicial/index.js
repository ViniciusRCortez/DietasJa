import {React, useState, useEffect} from 'react';
import { View, Text, ActivityIndicator, Alert} from 'react-native';
import styles from "./styles"
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { API_BASE_URL } from "../../config";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TelaInicial() {

      const [nome, setNome] = useState('');
      const [meta, setMeta] = useState(0);
      const [consumo, setConsumo] = useState(0);
      const [carb, setCarb] = useState(0);
      const [proteina, setProteina] = useState(0);
      const [gordura, setGordura] = useState(0);
      const [resto, setResto] = useState(0);
      const navigation = useNavigation();
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => { // useEffect: executa após a renderização dos componentes
          enviarSolicitacaoGET();
          navigation.addListener('focus', enviarSolicitacaoGET);
          }, [navigation]);

    async function enviarSolicitacaoGET() {
      try {
        const token_access = await AsyncStorage.getItem("jwt");
        
        try {
          const respostanome = await axios.get(`${API_BASE_URL}/user-metrics/`, {
            headers: {
              Authorization: token_access,
            }  
          });
          const nome = respostanome.data.nome;
          setNome(nome);
          console.log('Executou GET, nome:', nome);
        } catch (error) {
          console.log('Erro na solicitação respostanome:', error);
          // Lógica de tratamento de erro
        } 
    
        try {
          const respostameta = await axios.get(`${API_BASE_URL}/meta/`, {
            headers: {
              Authorization: token_access,
            }
          });
          const qtdCalorias = ((respostameta.data[0]['qtd_calorias'])/1000);
          setMeta(qtdCalorias);
          console.log('Executou GET, meta:', qtdCalorias);
          
        } catch (error) {
          console.log("print")
          if (error.response?.status == undefined){
            console.log("Usuario nao tem meta");
            Alert.alert("Bem vindo(a)!", "Você ainda não possui uma meta cadastrada!\nCadastre-a em editar Meta no menu lateral. ");
          } 
          else{
            console.log("usuario ja tem meta");
          }
          console.log('Erro na solicitação respostameta:', error);
          // Lógica de tratamento de erro
        }
    
        try {
          const respostaconsumo = await axios.get(`${API_BASE_URL}/meta-gamificada/dia`, {
            headers: {
              Authorization: token_access,
            }
          });
          
          const qtdConsumo = (respostaconsumo.data.calorias_consumidas)/1000;
          const qtdCarboidratos = parseFloat(respostaconsumo.data.qtd_carboidratos); 
          const qtdProteinas = parseFloat(respostaconsumo.data.qtd_proteinas);
          const qtdGorduras = parseFloat(respostaconsumo.data.qtd_gorduras);
        
          setConsumo(qtdConsumo);
          setCarb(qtdCarboidratos);  
          setProteina(qtdProteinas);
          setGordura(qtdGorduras); 

          console.log('Executou GET, consumo:', qtdConsumo);
          console.log('Executou GET, carboidratos:', qtdCarboidratos);
          console.log('Executou GET, proteinas:', qtdProteinas);
          console.log('Executou GET, gorduras:', qtdGorduras);

          
        } catch (error) {
          // Lógica de tratamento de erro específica para respostaconsumo
          console.log('Erro na solicitação respostaconsumo:', error);
          
        }
      } catch (error) {
        console.log('Erro ao executar GET:', error);
      }
       finally {
       setIsLoading(false);
       }
    }
    
    // Altera o valor do resto entre consumo e meta
    useEffect(() => {
      const novoResto = meta - consumo;
      setResto(novoResto);
      console.log('Executou useEffect, resto:', novoResto);
    }, [meta, consumo]);

      // Chamar o carregamento da tela
      if (isLoading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#38acbe" />
          </View>
        );
      }
    

  return (
    <View style={styles.container}>
      <View style = {styles.containerTexto}>
      <Text style={styles.greetingText}>Olá, {nome}</Text>
      </View>
      <Animatable.View animation= "fadeInLeft" delay={500} style={styles.rectangle}>
        <Text style={styles.infoTitle}>Meta de Calorias Diárias</Text>
        <View style={styles.separator} />
        <Text style={styles.infoValue}>{meta} Kcal</Text>
      </Animatable.View>

      <Animatable.View animation= "fadeInLeft" delay={600} style={styles.redrectangle}>
        <Text style={styles.infoTitle}>Calorias Consumidas</Text>
        <View style={styles.separator} />
        <Text style={styles.infoValue}>{consumo} Kcal</Text>
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

        {resto > 0 &&(
        <View style={styles.remainingCaloriesContainer}>
        <Text style={styles.remainingCaloriesText}>
          Faltam {resto} calorias para consumir hoje
        </Text>
      </View>
        )}

    </View>
  );
}