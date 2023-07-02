import React, {useState} from "react";
import {Text, TextInput, View, TouchableOpacity, Image, Alert, ScrollView, SafeAreaView} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";

import axios from 'axios';
import { API_BASE_URL } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from "../Login"

export default function PrimeiroAcesso(){

    const [nome, setNome] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [idade, setIdade] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [meta, setMeta] = useState('');
    const [valoratual, setValorAtual] = useState();

    const navigation = useNavigation();

function ValidarInformacoes(nome, valoratual, idade, altura, peso) {
    if (nome.trim() === "") {
      Alert.alert("Erro", "Por favor, informe o nome.");
      return;
    }
    if (valoratual === null) {
      Alert.alert("Erro", "Por favor, escolha o sexo.");
      return;
    }
    if (idade.trim() === "") {
        Alert.alert("Erro", "Por favor, informe a idade.");
        return;
    }
    if (altura.trim() === "") {
        Alert.alert("Erro", "Por favor, informe a altura.");
        return;
    }
    if (peso.trim() === "") {
        Alert.alert("Erro", "Por favor, informe o peso.");
        return;
    }

    cadastro(nome, valoratual, idade,altura, peso)
    navigation.navigate(Login)
}

const items = [
    {label: 'Masculino', value: 'masculino'},
    {label: 'Feminino', value: 'feminino'},
]

async function cadastro(nome, valoratual, idade, altura, peso){
    try {

      const userId = await AsyncStorage.getItem('userId')

      if (valoratual === 'masculino') {
        var genero = 'M';
      } else if (valoratual === 'feminino') {
        var genero = 'F';
      }

      const response = await axios.post(`${API_BASE_URL}/new-user-metrics/`, {
        nome: nome,
        genero: genero,
        altura: altura/100,
        peso: peso,
        idade: idade,
        usuario: userId
      })
      if (response.status == 201){
        Alert.alert("Bem-vindo","Usuário criado com sucesso");
        console.log(response.data)
        return
      } else{
        console.log(response.data)
        return
      }
    } catch (error) {
      Alert.alert("Erro","Não foi possivel criar o usuário, tente novamente mais tarde");
      console.log(error)
      return
    }
}

    return(
        <SafeAreaView style = {styles.CaixaTotal}>

            <View style = {styles.CaixaTitulo}>
            <Image source = {require("../../assets/outralogo.png")}
                   style = {styles.imagemEstilo}></Image>
            <Text style = {styles.textoTitulo}>Dietas Já!</Text>
            </View>

            <Text style = {styles.textoSub}>Primeiro Acesso</Text>

            <ScrollView style = {styles.CaixaForm}>
                <Text style = {styles.estiloTexto}> Nome:</Text>
                <TextInput 
                 style = {styles.estiloinput}
                 value = {nome}
                 onChangeText={setNome}></TextInput>

                <View style={styles.sexoContainer}>
                <Text style={styles.estiloTexto}>Sexo:   </Text>
                
                <DropDownPicker
                    items={items}
                    open={isOpen}
                    setOpen={() => setIsOpen(!isOpen)}
                    value={valoratual}
                    setValue={(val) => setValorAtual(val)}
                    placeholder="Escolha seu Sexo"
                    showTickIcon={true}
                    disableBorderRadius={false}
                    style={styles.dropDownPicker}
                    maxHeight = {500}
                    autoScroll
                    containerStyle={styles.dropDownPickerContainer}
                    textStyle={styles.dropDownPickerText}
                    arrowColor={styles.dropDownPickerArrow.color}
                    arrowSize={styles.dropDownPickerArrow.fontSize}
                    listMode="SCROLLVIEW"
                />
                </View>

                <View style = {styles.ContainerInputaolado}>
                <Text style = {styles.estiloTexto}>Idade:  </Text> 
                <TextInput 
                style = {styles.estiloInputaolado}
                value={idade}
                onChangeText={setIdade}
                keyboardType="numeric"
                ></TextInput> 
                </View>

                <View style = {styles.ContainerInputaolado}>
                <Text style = {styles.estiloTexto}>Altura(cm): </Text> 
                <TextInput style = {styles.estiloInputaolado}
                 value={altura}
                 onChangeText={setAltura}
                 placeholder = "Ex: 180cm = 1.80m"
                 keyboardType="numeric"
                 ></TextInput> 
                </View>

                <View style = {styles.ContainerInputaolado}>
                <Text style = {styles.estiloTexto}>Peso(Kg):   </Text> 
                <TextInput style = {styles.estiloInputaolado}
                 value={peso}
                 onChangeText={setPeso}
                 placeholder = "Ex: 60Kg"
                 keyboardType="numeric"
                 ></TextInput> 
                </View>

                <TouchableOpacity
                style = {styles.estilobotaoAvançar}
                onPress = {() => {
                    ValidarInformacoes(nome, valoratual, idade, altura, peso)}}
                >
                <Text style = {styles.textoBotao}>Avançar</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}