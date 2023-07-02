import React, {useState} from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert} from "react-native";
import styles from "./style"
import * as Animatable from 'react-native-animatable';
import {} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import { API_BASE_URL } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaCadastro(){
    const [textButton, setTextButton] = useState("Login");

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation();


    function ValidationCadastro(){
        if (ValidationInformacao(email,senha)){
            cadastro(email, senha)
            //handleVoltar();
            return;
        }
        else{
            Alert.alert("Erro", "Preencha todas as informações!")
        }
    }
    const handleVoltar = () => {
        navigation.goBack();
    };
    
    function ValidationInformacao(email,senha){
        if (email.length === 0 || senha.length === 0) {
           return false;
        }
        return true;
        
    }

    async function cadastro(email,senha){
        try {
          const response = await axios.post(`${API_BASE_URL}/sign-in/`, {
            username: email,
            password: senha
          })
          if (response.status == 201){
            let userId = response.data.id;
            await AsyncStorage.setItem('userId', `${userId}`)
            
            navigation.navigate('PrimeiroAcesso');
          } else{
            console.log(response.data)
          }
        } catch (error) {
          console.log(error)
          if (error.response.status == 400){
            Alert.alert("Erro", "Nome de usuário já cadastrado.")
          }
        }
    }

    return <>
    <View style = {styles.CaixaTotalmente}>
        <Animatable.View animation="fadeInLeft" delay={500} style = {styles.containerheader}>
            <Text style={styles.TextoInicial}>Cadastro</Text>
        </Animatable.View> 

        <Animatable.View animation="fadeInUp" style={styles.CaixaCadastro}>

            <Text style = {styles.Title}>Nome de Usuário </Text>
            <TextInput style={styles.Input}
             placeholder="Digite seu nome de usuário" 
             keyboardType = "ascii-capable"
             value = {email}
             onChangeText={setEmail}>
            </TextInput>

            <Text style = {styles.Title}>Senha </Text>
            <TextInput style={styles.Input}
             placeholder="Digite sua senha"
             keyboardType = "numeric"
             value = {senha}
             onChangeText={setSenha}
             secureTextEntry>
            </TextInput>

            <TouchableOpacity style = {styles.botao}
            onPress={ValidationCadastro}
            ><Text style = {styles.textoBotao}>{textButton}</Text>
            </TouchableOpacity>
        </Animatable.View>
    </View>
        </>
    
}