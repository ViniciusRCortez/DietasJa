import React, {useState} from "react";
import {Text, TextInput, View, TouchableOpacity, Image, Alert, SafeAreaView, ScrollView} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';

export default function EditarPerfil(){

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

const handleVoltar = () => {
    navigation.goBack();
};

    return(
        <SafeAreaView style = {styles.CaixaTotal}>
            
            <View style = {styles.CaixaTitulo}>
            <Image source = {require("../../assets/outralogo.png")}
                   style = {styles.imagemEstilo}></Image>
            <Text style = {styles.textoTitulo}>DietasJá! </Text>
            </View>

            <Text style = {styles.textoSub}>Editar Perfil</Text>

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
                <Text style = {styles.estiloTexto}>Altura: </Text> 
                <TextInput style = {styles.estiloInputaolado}
                 value={altura}
                 onChangeText={setAltura}
                 placeholder = "Ex: 1.80"
                 keyboardType="numeric"
                 ></TextInput> 
                </View>

                <View style = {styles.ContainerInputaolado}>
                <Text style = {styles.estiloTexto}>Peso:   </Text> 
                <TextInput style = {styles.estiloInputaolado}
                 value={peso}
                 onChangeText={setPeso}
                 placeholder = "Ex: 84.4"
                 keyboardType="numeric"
                 ></TextInput> 
                </View>

                <TouchableOpacity
                style = {styles.estilobotaoSalvar}
                onPress = {() => {
                    ValidarInformacoes(nome, peso, altura, idade, valoratual)}}
                >
                <Text style = {styles.textoBotao}>Salvar Alterações</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.estilobotaoVoltar}
                >
                    <Text style = {styles.textoBotaoVolta} onPress ={handleVoltar}>Voltar</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
      
    );
}