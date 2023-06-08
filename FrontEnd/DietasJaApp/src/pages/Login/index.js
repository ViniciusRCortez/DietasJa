import React, {useState} from "react";
import {Text, TextInput, View, TouchableOpacity} from "react-native";
import styles from "./styles"

export default function Login() {

const [email, setEmail] = React.useState('');
const [senha, setSenha] = useState('');
const [mensagem, setMensagem] = useState("Informe Email e Senha!");
const [textButton, setTextButton] = useState("Login");
const [erroLogin, setErroLogin] = useState('');

function validationEntrar(){
    if (validateLogin(email,senha)){
        setMensagem("Login Válido!");
        setSenha("");
        setEmail("");
        setErroLogin("");
        return;
    }
    setErroLogin("Email e/ou senha inválidos");
}

function validateLogin(email, senha) {
    if (email.trim() === '' || senha.trim() === '') {
      return false; // Login inválido se o email ou senha estiverem vazios
    }
    return true; // Login válido se o email e senha não estiverem vazios
  }

    return(

        <View style = {styles.CaixaTotal}>
            <View style = {styles.form}>
                <TextInput 
                style = {styles.estiloinput}
                onChangeText = {setEmail}
                value = {email}
                placeholder = "Email"
                keyboardType = "ascii-capable"></TextInput>

                <TextInput 
                style = {styles.estiloinput}
                onChangeText = {setSenha}
                value = {senha}
                placeholder = "Senha"
                keyboardType = "numeric"
                secureTextEntry>
                </TextInput>

                <TouchableOpacity
                style = {styles.estilobotaoLogin}
                onPress = {() => {
                    validationEntrar()}}
                >
                <Text style = {styles.textoBotao}> {textButton}</Text>
                </TouchableOpacity>

                {erroLogin !== '' && <Text style={styles.mensagemErro}>{erroLogin}</Text>}

                <TouchableOpacity
                style = {styles.estilobotaoCadastro}
                >
                    <Text style = {styles.textoBotao}>Cadastre-se</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}