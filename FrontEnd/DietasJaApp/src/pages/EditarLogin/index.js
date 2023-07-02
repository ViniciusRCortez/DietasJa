import React, {useState} from "react";
import {View, Text, Image, TouchableOpacity, TextInput, Alert, ScrollView, SafeAreaView} from "react-native";
import styles from "./style";
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import { API_BASE_URL } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarLogin(){

    const navigation = useNavigation();

    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = useState('');
    const [novasenha, setNSenha] = useState('');
    const [validarsenha, setValiSenha] = useState('');

function ValidationSenha(){
    if (ValidationInformacao(email,senha,novasenha,validarsenha)){
        PatchInfos(email,senha)
        return;
    }
    else{
        Alert.alert("Erro", "Informações Invalídas")
    }
}
const handleVoltar = () => {
    navigation.goBack();
};

function ValidationInformacao(email,senha,novasenha, validarsenha){
    if (email.trim() === '' || senha.trim() === '' || (novasenha.trim() != validarsenha.trim()) ){
       return false;
    }
    return true;
    
}

async function PatchInfos(email,senha){

    try {
        const token = await AsyncStorage.getItem('jwt')

        const response = await axios.patch(`${API_BASE_URL}/update-user/`,
        {
            username: email,
            password: senha
        },
        {
        headers: {
            Authorization: token,
        },
        })
      if (response.status == 200){
        console.log(response.data)
        Alert.alert("Sucesso", "Informações alteradas com sucesso!")
        handleVoltar()
      } else{
        console.log(response.data)
      }
    } catch (error) {
        console.log(error)
    }
}
    return(
        <SafeAreaView style = {styles.CaixaTotal}>

            <View style = {styles.CaixaTitulo}>
            <Image source = {require("../../assets/outralogo.png")}
                   style = {styles.imagemEstilo}></Image>
            <Text style = {styles.textoTitulo}>DietasJá</Text>
            </View>
            <Text style = {styles.textoSub}>Editar Cadastro</Text>
            <ScrollView style = {styles.CaixaForm}>

            <Text style = {styles.estiloTexto}> Novo Email:</Text>
            <TextInput 
                style = {styles.estiloinput}
                onChangeText = {setEmail}
                value = {email}
                keyboardType = "ascii-capable">
            </TextInput>
            
            <Text style = {styles.estiloTexto}> Senha:</Text>
            <TextInput style = 
                {styles.estiloinput}
                onChangeText = {setSenha}
                value = {senha}
                keyboardType = "numeric"
                secureTextEntry></TextInput>
                
            <Text style = {styles.estiloTexto} > Nova Senha:</Text>
            <TextInput style = 
                {styles.estiloinput}
                onChangeText = {setNSenha}
                value = {novasenha}
                keyboardType = "numeric"
                secureTextEntry></TextInput>
                
            <Text style = {styles.estiloTexto} >Confirme a nova senha:</Text>
            <TextInput style = 
                {styles.estiloinput}
                onChangeText = {setValiSenha}
                value = {validarsenha}
                keyboardType = "numeric"
                secureTextEntry></TextInput>

            <TouchableOpacity
                style = {styles.estilobotaoSalvar}
                onPress={ValidationSenha}
                >
                <Text style = {styles.textoBotao}>Salvar Alterações</Text>
                </TouchableOpacity>

            <TouchableOpacity
                style = {styles.estilobotaoVoltar} onPress={handleVoltar}
            >
                <Text style = {styles.textoBotaoVolta}>Voltar</Text>
            </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}