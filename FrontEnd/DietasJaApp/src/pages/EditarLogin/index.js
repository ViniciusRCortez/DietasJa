import React, {useState} from "react";
import {View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import styles from "./style"

export default function EditarLogin(){

const [email, setEmail] = React.useState('');
const [senha, setSenha] = useState('');
const [novasenha, setNSenha] = useState('');
const [validarsenha, setValiSenha] = useState('');
const [Erromsg, SetErromsg] = useState('');

function ValidationSenha(){
    if (ValidationInformacao(email,senha,novasenha,validarsenha)){
        setEmail('');
        setSenha('');
        setValiSenha('');
        setNSenha('');
        SetErromsg('');
        return;
    }
    else{
        SetErromsg("Informações Inválidas!");
    }
}

function ValidationInformacao(email,senha,novasenha, validarsenha){
    if (email.trim() === '' || senha.trim() === '' || (novasenha.trim() != validarsenha.trim()) ){
       return false;
    }
    return true;
    
}
    return(
        <View style = {styles.CaixaTotal}>

            <View style = {styles.CaixaTitulo}>
            <Image source = {require("../../assets/logomenor.png")}
                   style = {styles.imagemEstilo}></Image>
            <Text style = {styles.textoTitulo}>Dietas Já!</Text>
            </View>

            <View style = {styles.CaixaForm}>

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
                onPress = {() => {
                    ValidationSenha()}}
                >
                <Text style = {styles.textoBotao}>Salvar Alterações</Text>
                </TouchableOpacity>

            {Erromsg !== '' && <Text style={styles.mensagemErro}>{Erromsg}</Text>}

            <TouchableOpacity
                style = {styles.estilobotaoVoltar}
            >
                <Text style = {styles.textoBotao}>Voltar</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}