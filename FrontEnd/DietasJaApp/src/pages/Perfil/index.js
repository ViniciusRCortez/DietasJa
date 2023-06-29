import {React, useState, useEffect} from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import EditarPerfil from "../EditarPerfil";
import EditarLogin from "../EditarLogin";

import axios from 'axios';
import { API_BASE_URL } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil(){

    const [nome, setNome] = useState('')
    const [sexo, setSexo] = useState('') 
    const [idade, setIdade] = useState('')
    const [altura, setAltura] = useState('')
    const [peso, setPeso] = useState('')

    const navigation = useNavigation();

    useEffect(() => {
        getUserInfo();
      }, [])
    
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
            setAltura(altura)
            setPeso(peso)
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
      
    return(

        <View style = {styles.CaixaTotalmente}>

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

                    <TouchableOpacity style = {styles.estilobotao} onPress={handleAlterarCadastro}>
                        <Text style = {styles.textoBotao}>Alterar E-mail e Senha</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.estilobotaoVoltar} onPress={handleVoltar}>
                        <Text style = {styles.textoBotaoVolta}>Voltar</Text>
                        
                    </TouchableOpacity>
            </View>
        </View>
    );
}