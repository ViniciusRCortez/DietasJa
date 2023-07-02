import {React, useState, useEffect} from "react";
import { Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

import EditarPerfil from "../EditarPerfil";
import EditarLogin from "../EditarLogin";
import Login from "../Login"

import axios from 'axios';
import { API_BASE_URL } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil(){

    const [nome, setNome] = useState('')
    const [sexo, setSexo] = useState('') 
    const [idade, setIdade] = useState('')
    const [altura, setAltura] = useState('')
    const [peso, setPeso] = useState('')
    const [isLoading, setIsLoading] = useState(true);


    const navigation = useNavigation();

      useEffect(() => { // useEffect: executa após a renderização dos componentes
        getUserInfo();
        navigation.addListener('focus', getUserInfo);
        }, [navigation]);
    
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
            const sexo = response.data.genero
            const idade = response.data.idade
            const altura = response.data.altura
            const peso = response.data.peso
            setNome(nome)
            setSexo(sexo)
            setIdade(idade)
            setAltura(altura*100)
            setPeso(peso)
          } else{
            console.log(response.data)
          }
        } catch (error) {
            if(error.response.status == 401){
                navigation.navigate(Login)
            }
          console.log(error)
        }
        finally {
          setIsLoading(false);
        }
    }

    async function deleteUser(){
        try {
          const token = await AsyncStorage.getItem('jwt')
          const response = await axios.delete(`${API_BASE_URL}/delete-user/`, {
            headers: {
              Authorization: token,
            },
          })
          if (response.status == 200){
            navigation.navigate(Login)
            Alert.alert("Saudades!","Seu usuário foi deletado com sucesso");
            console.log(response.data)
          } else{
            console.log(response.data)
          }
        } catch (error) {
          console.log(error)
        }
    }

    const handleAlterarInformacoes = () => {
        navigation.navigate("EditarPerfil");
      };
    
    const handleVoltar = () => {
        navigation.goBack();
    };

    const handleAlterarCadastro = () => {
        navigation.navigate('EditarLogin')
    }

     // Chamar o carregamento da tela
     if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#38acbe" />
        </View>
      );
    }
      
    return(

        <View style = {styles.CaixaTotalmente}>
          <Text style = {styles.textoSub}>Minha Conta</Text>
            <View style = {styles.CaixaTotal}>
                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style = {styles.estiloTexto}>Nome:     </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{nome}</Text>
                    </View>
                </View>
            
                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style={styles.estiloTexto}>Sexo:       </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{sexo}</Text>
                    </View>
                </View>

                <View style = {styles.CaixaInfoMenorContainer}> 
                    <Text style = {styles.estiloTexto}>Idade:      </Text> 
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{idade}</Text>
                    </View>
                </View>

                <View style = {styles.CaixaInfoMenorContainer}> 
                    <Text style = {styles.estiloTexto}>Altura:     </Text> 
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{altura} cm</Text>
                    </View>
                </View>

                <View style = {styles.CaixaInfoMenorContainer}> 
                    <Text style = {styles.estiloTexto}>Peso:       </Text> 
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{peso} Kg</Text>
                </View>

                </View>

                <TouchableOpacity style={styles.estilobotao} onPress= {handleAlterarInformacoes}>
                    <Text style = {styles.textoBotao}>Alterar Informações</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.estilobotao} onPress={deleteUser}>
                    <Text style = {styles.textoBotao}>Deletar Conta</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.estilobotaoVoltar} onPress={handleVoltar}>
                    <Text style = {styles.textoBotaoVolta}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}