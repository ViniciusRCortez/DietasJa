import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import axios from 'axios';
import { API_BASE_URL } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({ handleLogin }) {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState("Informe Email e Senha!");
  const [textButton, setTextButton] = useState("Login");
  const [erroLogin, setErroLogin] = useState('');

  // Função que valida entrada depois de receber a confirmação para o Login
  function validationEntrar() {
    if (validateLogin(email, senha)) {
      setMensagem("Login Válido!");
      setSenha("");
      setEmail("");
      setErroLogin("");

      // Enviar a solicitação POST para a API
      enviarSolicitacao();
    } else {
      setErroLogin("Email e/ou senha inválidos");
    }
  }

  // Função para validar entrada, nesse caso está apenas verificando se está vazio
  function validateLogin(email, senha) {
    if (email.trim() === '' || senha.trim() === '') {
      return false; // Login inválido se o email ou senha estiverem vazios
    }
    return true; // Login válido se o email e senha não estiverem vazios
  }

    // Função para enviar a solicitação POST para a API
    async function enviarSolicitacao() {
        try {
            const response = await axios.post(`${API_BASE_URL}/login/`, {
                username: email,
                password: senha
            });

            if (response.status === 200) {
                // Login bem-sucedido

                // Salvar o token de acesso (access) no lado do cliente
                let token = response.data.access;
                await AsyncStorage.setItem('jwt', `Bearer ${token}`)

                // Chamar a função handleLogin se o login for bem-sucedido
                handleLogin();
                console.log("Entrou");
                return;

            }
        } catch (error) {
          if (error.response.status === 401) {
            Alert.alert("Erro", "Usuário e/ou senha incorretos.");
          }
          else{
            console.error(error);
          }
          if (error.response.status === 403) {
                // Erro de autenticação - 403 Forbidden
            
                // Exibir a mensagem de erro retornada pelo servidor
                setErroLogin(error.response.data.detail)
            }
        }
    }


  return (
    <View style={styles.CaixaTotalmente}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerheader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.CaixaTotal}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.estiloinput}
          onChangeText={setEmail}
          value={email}
          placeholder="Digite seu email"
          keyboardType="ascii-capable"
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          style={styles.estiloinput}
          onChangeText={setSenha}
          value={senha}
          placeholder="Digite sua senha"
          keyboardType="numeric"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.estilobotaoLogin}
          onPress={validationEntrar}
        >
          <Text style={styles.textoBotao}>{textButton}</Text>
        </TouchableOpacity>

        {erroLogin !== '' && <Text style={styles.mensagemErro}>{erroLogin}</Text>}

        <TouchableOpacity
          style={styles.estilobotaoCadastro}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.textoBotaoCadastro}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>

      </Animatable.View>
    </View>
  );
}
