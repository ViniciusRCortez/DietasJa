import {React, useState, useEffect}  from "react";
import {Text, TextInput, View, TouchableOpacity, Image, Alert} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import Login from "../Login"

import axios from 'axios';
import { API_BASE_URL } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarPerfil({handleLogOut}){

const [reload, setReload] = useState(false); // Estado para recarregar a página

const [nome, setNome] = useState('');
const [peso, setPeso] = useState('');
const [altura, setAltura] = useState('');
const [idade, setIdade] = useState('');
const [isOpen, setIsOpen] = useState(false);
const [valoratual, setValorAtual] = useState();
const navigation = useNavigation();

// Funcoo que vai checar as informcaoes recebidas
function ValidarInformacoes(nome, peso, altura, idade, valoratual) {
    if (nome.trim() === "") {
      Alert.alert("Erro", "Por favor, informe o nome.");
      return;
    }
    if (valoratual === null) {
      Alert.alert("Erro","Por favor, escolha o sexo.");
      return;
    }
    if (idade.trim() === "") {
        Alert.alert("Erro","Por favor, informe a idade.");
        return;
    }
    if (altura.trim() === "") {
        Alert.alert("Erro","Por favor, informe a altura.");
        return;
    }
    if (peso.trim() === "") {
        Alert.alert("Erro","Por favor, informe o peso.");
        return;
      }
      handleVoltar();
}

const items = [
    {label: 'Masculino', value: 'masculino'},
    {label: 'Feminino', value: 'feminino'},
]

  async function PatchInfos(nome, peso, altura, idade, valoratual){
    ValidarInformacoes(nome, peso, altura, idade, valoratual)

    try {
        const token = await AsyncStorage.getItem('jwt')

        if (valoratual == "masculino"){
            var genero = "M"
        } else if (valoratual == "feminino"){
            var genero = "F"
        }

        const response = await axios.patch(`${API_BASE_URL}/user-metrics/`,
        {
            nome: nome,
            genero: genero,
            altura: altura/100,
            peso: peso/1000,
            idade: idade,
        },
        {
        headers: {
            Authorization: token,
        },
        })
      if (response.status == 200){
        console.log(response.data)
        setReload(true)
      } else{
        console.log(response.data)
      }
    } catch (error) {
      if(error.response.status == 401){
        navigation.navigate(Login)
    }
      console.log(error)
    }
}

useEffect(() => {
    if (reload) {
      // Recarrega a página
      setReload(false); // Reseta o estado de recarregar
      getUserInfo(); // Chama a função para obter as informações atualizadas
    }
  }, [reload]);


const handleVoltar = () => {
    navigation.goBack();
};

    return(
        <View style = {styles.CaixaTotal}>
            
            <View style = {styles.CaixaTitulo}>
            <Image source = {require("../../assets/outralogo.png")}
                   style = {styles.imagemEstilo}></Image>
            <Text style = {styles.textoTitulo}>DietasJá! </Text>
            </View>

            <Text style = {styles.textoSub}>Editar Perfil</Text>

            <View style = {styles.CaixaForm}>
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
                <Text style = {styles.estiloTexto}>Peso(g):   </Text> 
                <TextInput style = {styles.estiloInputaolado}
                 value={peso}
                 onChangeText={setPeso}
                 placeholder = "Ex: 10000g = 10Kg"
                 keyboardType="numeric"
                 ></TextInput> 
                </View>

                <TouchableOpacity
                style = {styles.estilobotaoSalvar}
                onPress = {() => {
                    PatchInfos(nome, peso, altura, idade, valoratual)}}
                >
                <Text style = {styles.textoBotao}>Salvar Alterações</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.estilobotaoVoltar}
                >
                    <Text style = {styles.textoBotaoVolta} onPress ={handleVoltar}>Voltar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}