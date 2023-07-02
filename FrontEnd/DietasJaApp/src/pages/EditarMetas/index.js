import React, { useState, useEffect } from "react";
import {Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import styles from "./styles"
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import {API_BASE_URL} from '../../config.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditarMetas(){

    const [isLoading, setIsLoading] = useState(true);
    const [meta, setMeta] = useState(500);
    const margem  = Math.ceil(0.02 * meta);
    const [novaMeta, setNovaMeta] = useState("");

    // Chamar o carregamento da tela
    useEffect(() => { // useEffect: executa após a renderização dos componentes
        enviarSolicitacaoGET();
    }, [])

    if (isLoading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#38acbe" />
          </View>
    );}

    const handleConcluir = () => {
        if (Number.isInteger(parseInt(novaMeta, 10))) {
            var novaMetaInt = parseInt(novaMeta, 10);
            // CONVERSÃO: nova meta é recebida em kcal, mas back trata como cal (multiplica por 1000)
            novaMetaInt = novaMetaInt * 1000;
            if (novaMetaInt > 0) {
                enviarSolicitacaoPATCH(novaMetaInt); // Salva alteração no banco
            } else {
                Alert.alert("Erro", "O campo nova meta deve ser positivo.");
            }
        } else {
            Alert.alert("Erro", "O campo nova meta deve ser numérico.");
        }
    };

    async function enviarSolicitacaoGET() {
        const token_access = await AsyncStorage.getItem("jwt");
        axios.get(`${API_BASE_URL}/meta/`, {headers: {Authorization: token_access}})
        .then((resposta) => {
            const qtdCalorias = parseFloat(resposta.data[0]['qtd_calorias'])/1000; // Meta recebida pelo método GET (em cal), converte para kcal
            setMeta(qtdCalorias); // Caixa de meta atual recebe o valor recebido da requisição GET
            console.log('Executou GET, qtd_calorias: ', qtdCalorias);
        }, {validateStatus: () => true},)
        .catch(function (erro) {
            setMeta(0);
            if (erro.response?.status == undefined) { // Erro 204 = undefined
                Alert.alert("Atenção", "Você não possui uma meta diária cadastrada.\nInforme uma nova meta e pressione Concluir para cadastrá-la.");
            } else {
                console.error(erro);
            }            
            console.log('Erro ao executar GET: ', erro);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    async function enviarSolicitacaoPOST(meta){
        const token_access = await AsyncStorage.getItem("jwt");
        axios.post(`${API_BASE_URL}/meta/`, {qtd_calorias: meta}, {headers: {Authorization: token_access,}})
        .then((resposta) => {
            setMeta(meta/1000) // Atualiza a caixa da meta atual (divide por 100, pois front considera kcal e back considera cal)
            setNovaMeta('');       // Limpa caixa de meta antiga
            console.log('POST de meta diária executado com sucesso');
            Alert.alert("Sucesso", "Sua meta diária foi cadastrada com sucesso!");
        }, {validateStatus: () => true},)
        .catch((erro) => {
            setMeta(0);
            console.error(erro);
            console.log('Erro ao executar POST de meta diária: ', erro);
        })
    }    
    
    async function enviarSolicitacaoPATCH(novaMeta) {
        const token_access = await AsyncStorage.getItem("jwt");
        axios.patch(`${API_BASE_URL}/meta/`, {qtd_calorias: novaMeta}, {headers: {Authorization: token_access,}})
        .then(() => {
            setMeta(novaMeta/1000) // Atualiza a caixa da meta atual (divide por 100, pois front considera kcal e back considera cal)
            setNovaMeta('');       // Limpa caixa de meta antiga
            console.log('PATCH executado com sucesso');
            Alert.alert("Sucesso", "Sua meta diária foi atualizada com sucesso!");
        }, {validateStatus: () => true},)
        .catch((erro) => {
            setMeta(0);
            if (erro.response?.status == 400) { // Erro 400 = bad request gerada por patch em meta que não existe
                // Chama a função POST para cadastrar a meta definida pelo usuário
                enviarSolicitacaoPOST(novaMeta);
            } else {
                console.error(erro);
            }
            console.log('Erro ao executar PATCH: ', erro);
        })
    }

    const navigation = useNavigation();

    const handleVoltar = () => {
        navigation.goBack();
    };

    return(
        <View style = {styles.CaixaTotalmente}>
            <View style = {styles.CaixaTotalmente}>

            <View style = {styles.CaixaTotal}>
                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style = {styles.estiloTexto}>Meta Atual:   </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{meta} kcal</Text>
                    </View>
                </View>

                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style={styles.estiloTexto}>Margem:       </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{margem} kcal</Text>
                    </View>
                </View>

                <View style = {styles.CaixaInfoMenorContainer}>
                    <Text style = {styles.estiloTexto}>Nova Meta:   </Text> 
                    <TextInput style={styles.CaixaInfoMenorInput} value={novaMeta} keyboardType="numeric" onChangeText={setNovaMeta}/>
                </View>

                
                <View>
                    <TouchableOpacity style = {styles.estilobotao } onPress={handleConcluir}>
                        <Text style = {styles.textoBotao}>Concluir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.estilobotaoVoltar} onPress={handleVoltar}>
                        <Text style = {styles.textoBotaoVolta}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            
        </View>
    );
}