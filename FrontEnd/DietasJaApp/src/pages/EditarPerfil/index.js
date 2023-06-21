import React, {useState} from "react";
import {Text, TextInput, View, TouchableOpacity, Image} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "./styles";

export default function EditarPerfil(){

const [nome, setNome] = useState('');
const [peso, setPeso] = useState('');
const [altura, setAltura] = useState('');
const [idade, setIdade] = useState('');
const [isOpen, setIsOpen] = useState(false);
const [valoratual, setValorAtual] = useState();

function ValidarInformacoes(nome, peso, altura, idade, valoratual) {
    if (nome.trim() === "") {
      alert("Por favor, informe o nome.");
      return;
    }
    if (valoratual === null) {
      alert("Por favor, escolha o sexo.");
      return;
    }
    if (idade.trim() === "") {
        alert("Por favor, informe a idade.");
        return;
    }
    if (altura.trim() === "") {
        alert("Por favor, informe a altura.");
        return;
    }
    if (peso.trim() === "") {
        alert("Por favor, informe o peso.");
        return;
      }
}

const items = [
    {label: 'Masculino', value: 'masculino'},
    {label: 'Feminino', value: 'feminino'},
]

    return(
        <View style = {styles.CaixaTotal}>
            
            <View style = {styles.CaixaTitulo}>
            <Image source = {require("../../assets/logomenor.png")}
                   style = {styles.imagemEstilo}></Image>
            <Text style = {styles.textoTitulo}>Dietas Já!</Text>
            </View>

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
                    <Text style = {styles.textoBotao}>Voltar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}