import React, { useState, useEffect } from "react";
import {Text, View, TextInput, TouchableOpacity, Alert} from "react-native";
import styles from "./styles"
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios'
import {API_BASE_URL} from '../../config.js'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditarMetas(){
    useEffect(() => { // useEffect: executa após a renderização dos componentes
        enviarSolicitacaoGET();
    }, [])

    const [meta, setMeta] = useState(0);
    const margem  = Math.ceil(0.02 * meta);
    const [novaMeta, setNovaMeta] = useState("");

    const handleConcluir = () => {
        if (Number.isInteger(parseInt(novaMeta, 10))) {
            var novaMetaInt = parseInt(novaMeta, 10);
            // CONVERSÃO: nova meta é recebida em kcal, mas back trata como cal (multiplica por 1000)
            novaMetaInt = novaMetaInt * 1000;
            if (novaMetaInt > 0) {
                enviarSolicitacaoPATCH(novaMetaInt) // Salva alteração no banco
            } else {
                Alert.alert("Erro!", "O campo nova meta deve ser positivo.")
            }
        } else {
            Alert.alert("Erro!", "O campo nova meta deve ser numérico.")
        }
    };

    // Função retorna o token do usuário logado
    const getToken = async () => {
        try {
            // const token_access = await AsyncStorage.getItem("auth-token-access");
            const token_access = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg3OTk1ODgzLCJpYXQiOjE2ODc5ODQ3ODMsImp0aSI6IjFiZmM5Y2JlZTlhODRkYWE5MmZkNDg1Y2U1NzkyZDA1IiwidXNlcl9pZCI6MTUsInVzZXIiOiJ1c3VcdTAwZTFyaW8xIiwiZGF0ZSI6IjIwMjMtMDYtMjgiLCJpc0FkbWluIjpmYWxzZX0.iFOkt8E5BnQhHPehxcO-FmASBR9HGbvKlNlIwj_atts";
            if (token_access !== null) {
                return token_access;
            }
        } catch (error) {
            console.log('Erro ao obter token: ', error);
        }
    };

    async function enviarSolicitacaoGET() {
        const token_access = await getToken()
        axios.get(`${API_BASE_URL}/meta/`,
        {
            headers: {'Authorization' : "Bearer " + token_access,
                      'Content-Type'  : 'application/json',
                      'Accept'        : 'application/json',
                     }
        })
        .then((resposta) => {
            var qtdCalorias = parseFloat(resposta.data[0]['qtd_calorias']); // Meta recebida pelo método GET (em cal)
            qtdCalorias = qtdCalorias/1000;  // Convertendo para kcal (unidade do front)
            setMeta(qtdCalorias) // Caixa de meta atual recebe o valor recebido da requisição GET
            console.log('Executou GET, qtd_calorias: ', qtdCalorias)
        })
        .catch(function (erro) {
            console.log('Erro ao executar GET: ', erro)
        })
    }
    
    async function enviarSolicitacaoPATCH(novaMeta) {
        const token_access = await getToken()
        axios.patch(`${API_BASE_URL}/meta/`,
        { qtd_calorias: novaMeta },
        {
            headers: {'Authorization' : "Bearer " + token_access,
                      'Content-Type'  : 'application/json',
                      'Accept'        : 'application/json',
                     }
        }
        )
        .then(() => {
            setMeta(novaMeta/1000) // Atualiza a caixa da meta atual (divide por 100, pois front considera kcal e back considera cal)
            setNovaMeta('')       // Limpa caixa de meta antiga
            console.log('PATCH executado com sucesso')
            Alert.alert("Sucesso!", "Sua meta diária foi atualizada com sucesso.");
        })
        .catch((erro) => {
            console.log('Erro ao executar PATCH: ', erro)
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
                        <Text style={styles.textoInfo}>{meta}</Text>
                    </View>
                </View>

                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style={styles.estiloTexto}>Margem:       </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{margem}</Text>
                    </View>
                </View>

                <View style = {styles.CaixaInfoMenorContainer}>
                    <Text style = {styles.estiloTexto}>Nova Meta:   </Text> 
                    <TextInput style={styles.CaixaInfoMenorInput} value={novaMeta} keyboardType="numeric"  onChangeText={setNovaMeta} />

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