import { React, useState, useEffect } from "react";
import { View, Text, ActivityIndicator} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";
import axios from 'axios';
import { API_BASE_URL } from "../../config";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const VisualisarIndices = () => {

      // Exemplo de valores de IMC e TMB
      const [imc, setImc] = useState(0);
      const [tmb, setTmb] = useState(0);
      const [imcIcon, setImcIcon] = useState('');
      const [imcStyle, setImcStyle] = useState(null);
      const [tmbIcon, setTmbIcon] = useState('');
      const [tmbStyle, setTmbStyle] = useState(null);
      const navigation = useNavigation(); 
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => { // useEffect: executa após a renderização dos componentes
        enviarSolicitacaoGET();
        navigation.addListener('focus', enviarSolicitacaoGET);
        }, [navigation]);

      useEffect(() => {
        // Definir o estilo baseado no valor do IMC
        let newImcStyle = null;
        let newImcIcon = '';

        if (imc < 18.5) {
          newImcStyle = styles.abaixopeso;
          newImcIcon = "warning";
        } else if (imc < 25) {
          newImcStyle = styles.normal;
          newImcIcon = "checkcircleo";
        } else if (imc < 30) {
          newImcStyle = styles.acimapeso;
          newImcIcon = "exclamationcircleo";
        } else {
          newImcStyle = styles.obesidade;
          newImcIcon = "warning";
        }

        setImcStyle(newImcStyle);
        setImcIcon(newImcIcon);

        // Definir o estilo baseado no valor do TMB
        let newTmbStyle = null;
        let newTmbIcon = '';

        if (tmb < 1500) {
          newTmbStyle = styles.baixoTmb;
          newTmbIcon = "exclamationcircleo";
        } else if (tmb < 2000) {
          newTmbStyle = styles.normalTmb;
          newTmbIcon = "checkcircleo";
        } else {
          newTmbStyle = styles.altoTmb;
          newTmbIcon = "warning";
        }

        setTmbStyle(newTmbStyle);
        setTmbIcon(newTmbIcon);
      }, [imc, tmb]);

      // Mensagem indicando o estado do IMC
      let imcMessage = null;
      if (imc < 18.5) {
        imcMessage = "Abaixo do peso";
      } else if (imc < 25) {
        imcMessage = "Peso normal";
      } else if (imc < 30) {
        imcMessage = "Sobrepeso";
      } else {
        imcMessage = "Acima do peso";
      }

      // Mensagem indicando o estado do TMB
      let tmbMessage = null;
      if (tmb < 1500) {
        tmbMessage = "Baixo nível de atividade";
      } else if (tmb < 2000) {
        tmbMessage = "Nível de atividade moderado";
      } else {
        tmbMessage = "Alto nível de atividade";
      }

      async function enviarSolicitacaoGET() {
        try {
          const token_access = await AsyncStorage.getItem("jwt");

          try {
            const respostaimc = await axios.get(`${API_BASE_URL}/user-metrics/`, {
              headers: {
                Authorization: token_access,
              }  
            });
            const imc = parseFloat(respostaimc.data.imc);
            const imcArredondado = imc.toFixed(2);
            setImc(imcArredondado);
            console.log('Executou GET, imc:', imc);
          } catch (error) {
            console.log('Erro na solicitação respostaimc:', error);
            // Lógica de tratamento de erro
          }
          try {
            const respostatmb = await axios.get(`${API_BASE_URL}/user-metrics/`, {
              headers: {
                Authorization: token_access,
              }  
            });
            const tmb = parseFloat(respostatmb.data.tmb);
            const tmbArrendondado = tmb.toFixed(0);
            setTmb(tmbArrendondado);
            console.log('Executou GET, TMB:', tmb);
          } catch (error) {
            console.log('Erro na solicitação respostatmb:', error);
            // Lógica de tratamento de erro
          }
        } catch (error) {
          console.log('Erro ao executar GET:', error);
        }
        finally {
          setIsLoading(false);
        }
      }
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
      <View style = {styles.header}>
        <Text style = {styles.headerText}>Visualizar Indíces</Text>
      </View>
      <Text style={styles.messagemtitulo}>
        Monitore sua saúde com os índices de TMB e IMC.
      </Text>
      <View style={[styles.infoContainer, { marginBottom: 22 }]}>
        <Text style={styles.messagemdesc}>Índice de Massa Corporal</Text>
        <View style={[styles.infoItem, imcStyle]}>
          <Text style={styles.infoLabel}>IMC</Text>
          <Text style={styles.infoValue}>{imc}</Text>
        </View>
          <Text style={styles.messagem}><AntDesign name={imcIcon} size={24} /> {imcMessage}</Text>
  
        </View>
        <View style={[styles.infoContainer]}>
        <Text style={styles.messagemdesc}>Taxa de Metabolismo Basal</Text>
        <View style={[styles.infoItem, tmbStyle]}>
          <Text style={styles.infoLabel}>TMB</Text>
          <Text style={styles.infoValue}>{tmb}</Text>
        </View>
          <Text style={styles.messagem}><AntDesign name={tmbIcon} size={24} /> {tmbMessage}</Text>
      </View>
      <View style = {styles.messagemcontainer}>
      <Text style={styles.messagembottom}><AntDesign name={"exclamationcircle"} size={21} /> Mantenha seus dados atualizados para obter resultados atuais!</Text>
      </View>
    </View>
    
  );
};

export default VisualisarIndices;