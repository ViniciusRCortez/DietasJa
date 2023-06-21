import React, {useState} from "react";
import {Text, TextInput, View, TouchableOpacity} from "react-native";
import styles from "./styles"
import { useNavigation } from '@react-navigation/native';
import Title from "../../components/Title"
import * as Animatable from 'react-native-animatable';

export default function Login({ handleLogin }) {

const navigation = useNavigation();
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
        handleLogin();
        console.log("Entrou");
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
        <View style = {styles.CaixaTotalmente}>
        <Animatable.View animation= "fadeInLeft" delay={500} style={styles.containerheader}>
            <Text style = {styles.message}>Bem-vindo(a)</Text>
        </Animatable.View>

        <Animatable.View animation= "fadeInUp" style = {styles.CaixaTotal}>
                <Text style = {styles.title}>Email</Text>
                <TextInput 
                style = {styles.estiloinput}
                onChangeText = {setEmail}
                value = {email}
                placeholder = "Digite seu email"
                keyboardType = "ascii-capable"></TextInput>

                <Text style = {styles.title}>Senha</Text>
                <TextInput 
                style = {styles.estiloinput}
                onChangeText = {setSenha}
                value = {senha}
                placeholder = "Digite sua senha"
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
                onPress={() => navigation.navigate('EditarLogin')}
                >
                    <Text style = {styles.textoBotaoCadastro}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>

        </Animatable.View>
    </View>
    );
}