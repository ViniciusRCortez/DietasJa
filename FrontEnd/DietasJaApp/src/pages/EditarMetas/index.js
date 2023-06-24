import React, { useState } from "react";
import {Text, View, TextInput, TouchableOpacity, } from "react-native";
import styles from "./styles"
import { useNavigation } from '@react-navigation/native';

export default function EditarMetas(){

    const [meta, setMeta] = useState(5000);
    const margem  = Math.ceil(0.02 * meta);
    const [novaMeta, setNovaMeta] = useState("");

    const handleConcluir = () => {
        if (Number.isInteger(parseInt(novaMeta, 10))) {
          const novaMetaInt = parseInt(novaMeta, 10);
          setMeta(novaMetaInt);
          setNovaMeta("");
        }
    };

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
                    <TextInput style={styles.CaixaInfoMenorInput} value={novaMeta} onChangeText={setNovaMeta} />

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