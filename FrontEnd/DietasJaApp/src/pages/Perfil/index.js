import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import EditarPerfil from "../EditarPerfil";
import EditarLogin from "../EditarLogin";

export default function Perfil(){

    const user = 'Jose gausto da '
    const sexo = 'Masculino' 
    const idade = 21
    const altura = 170
    const peso = 80

    const navigation = useNavigation();

    const handleAlterarInformacoes = () => {
        navigation.navigate("EditarPerfil");
      };
    
    const handleVoltar = () => {
        navigation.goBack();
    };

    const handleAlterarCadastro = () => {
        navigation.navigate('EditarLogin')
    }
      
    return(

        <View style = {styles.CaixaTotalmente}>

            <View style = {styles.CaixaTotal}>
                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style = {styles.estiloTexto}>Nome:     </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{user}</Text>
                    </View>
                </View>
            
                <View style={styles.CaixaInfoMenorContainer}>
                    <Text style={styles.estiloTexto}>Sexo:       </Text>
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{sexo}</Text>
                    </View>
                </View>

                <View style = {styles.CaixaInfoMenorContainer}> 
                    <Text style = {styles.estiloTexto}>Idade:      </Text> 
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{idade}</Text>
                    </View>
                </View>

                <View style = {styles.CaixaInfoMenorContainer}> 
                    <Text style = {styles.estiloTexto}>Altura:     </Text> 
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{altura} cm</Text>
                    </View>
                </View>

                <View style = {styles.CaixaInfoMenorContainer}> 
                    <Text style = {styles.estiloTexto}>Peso:       </Text> 
                    <View style={styles.CaixaInfoMenor}>
                        <Text style={styles.textoInfo}>{peso} Kg</Text>
                </View>

                </View>

                <TouchableOpacity style={styles.estilobotao} onPress= {handleAlterarInformacoes}>
                        <Text style = {styles.textoBotao}>Alterar Informações</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.estilobotao} onPress={handleAlterarCadastro}>
                        <Text style = {styles.textoBotao}>Alterar E-mail e Senha</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.estilobotaoVoltar} onPress={handleVoltar}>
                        <Text style = {styles.textoBotaoVolta}>Voltar</Text>
                        
                    </TouchableOpacity>
            </View>
        </View>
    );
}