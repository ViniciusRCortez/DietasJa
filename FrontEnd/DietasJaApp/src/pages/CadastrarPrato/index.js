import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert, ScrollView, SafeAreaView, ActivityIndicator, Button} from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import {API_BASE_URL} from '../../config.js'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CadastrarPrato() {
    const [nome, setNome] = useState("");
    const [gorduras, setGorduras] = useState(0);
    const [proteinas, setProteinas] = useState(0);
    const [carboidratos, setCarboidratos] = useState(0);
    const [quantidade, setQuantidade] = useState("");
    const [listaPratos, setListaPratos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [load, setLoad] = useState(true);

    useEffect(()=>{ // Executa sempre que tela recebe o foco
        enviarSolicitacaoGET();
        navigation.addListener('focus', ()=>setLoad(!load));
    }, [load, navigation])

  const adicionarPrato = () => {
    if (validarCaixas()) {
        enviarSolicitacaoPOST();
    }
  };

  	function validarCaixas() {
        if (nome.trim() == "") {
            Alert.alert("Erro", "O nome do alimento é um campo obrigatório.");
            return false;
        }
        if (Number.isInteger(parseInt(quantidade, 10))) {
            var quantidadeInt = parseInt(quantidade, 10);
            if (quantidadeInt <= 0) {
                Alert.alert("Erro", "O campo quantidade deve ser positivo.");
				return false;
            }
        } else {
            Alert.alert("Erro", "O campo quantidade deve ser numérico.");
			return false;
        }
        if (Number.isInteger(parseFloat(carboidratos))) {
            var carboidratosFloat = parseFloat(carboidratos);
            if (carboidratosFloat < 0) {
                Alert.alert("Erro", "O campo carboidratos deve ser maior ou igual a zero.");
				return false;
            }
        } else {
            Alert.alert("Erro", "O campo carboidratos deve ser numérico.");
			return false;
		}
        if (Number.isInteger(parseFloat(proteinas))) {
            var proteinasFloat = parseFloat(proteinas);
            if (proteinasFloat < 0) {
                Alert.alert("Erro", "O campo proteínas deve ser maior ou igual a zero.");
				return false;
            }
        } else {
            Alert.alert("Erro", "O campo proteínas deve ser numérico.");
			return false;
        }
		if (Number.isInteger(parseFloat(gorduras))) {
            var gordurasFloat = parseFloat(gorduras);
            if (gordurasFloat < 0) {
                Alert.alert("Erro", "O campo gorduras deve ser positivo.");
				return false;
            }
        } else {
            Alert.alert("Erro", "O campo gorduras deve ser numérico.");
			return false;
        }
		return true;
	}

    async function enviarSolicitacaoGET() {
        const token_access = await AsyncStorage.getItem("jwt");
        axios.get(`${API_BASE_URL}/alimentos/`,
        {headers: {Authorization: token_access}},
        {validateStatus: () => true},
        )
        .then((resposta) => {
            // Insere os dados recebidos da requisição na lista de pratos
            var pratos = [];
            for (var i=0; i<resposta.data.length; i++) {
                pratos.push({id: resposta.data[i]["id"], nome: resposta.data[i]["nome"], quantidade: resposta.data[i]["porcao"], kcal: resposta.data[i]["qtd_calorias"]/1000, proteinas: resposta.data[i]["qtd_proteinas"], carboidratos: resposta.data[i]["qtd_carboidratos"], gorduras: resposta.data[i]["qtd_gorduras"]});
            }
            // Atualiza a lista de pratos
            setListaPratos(pratos);
            console.log('GET de alimento executado com sucesso');
            setIsLoading(false);
        })
        .catch(function (erro) {
            console.log('Erro ao executar GET de alimento: ', erro);
            setListaPratos([]); // Esvazia a lista de pratos
            setIsLoading(false);
        })
    }

    async function enviarSolicitacaoPOST() {
        var calorias = 4000 * (parseFloat(proteinas) + parseFloat(carboidratos)) + 9000*parseFloat(gorduras);
        const token_access = await AsyncStorage.getItem("jwt");
        axios.post(`${API_BASE_URL}/alimentos/`,
        { nome: nome,
          porcao: quantidade,
          qtd_calorias: calorias,
          qtd_carboidratos: carboidratos,
          qtd_proteinas: proteinas,
          qtd_gorduras: gorduras,
          e_padrao: false
        },
        {headers: {Authorization: token_access}},
        {validateStatus: () => true},
        )
        .then((resposta) => {
            const novoPrato = {
                id: resposta.data["id"], // Pega o id do JSON retornado pela requisição que deu certo
                nome: nome,
                quantidade: quantidade,
                kcal: calorias/1000,
                gorduras: gorduras,
                proteinas: proteinas,
                carboidratos: carboidratos,
              };
            setListaPratos([...listaPratos, novoPrato]); // Atualizando a listagem de pratos (alimentos cadastrados)
			setNome("");
			setGorduras("");
			setProteinas("");
			setCarboidratos("");
			setQuantidade("");

            Alert.alert("Sucesso", "Alimento cadastrado com sucesso!");
            console.log('POST de alimento executado com sucesso');
        })
        .catch(function (erro) {
            if (erro.response?.status == 400) { // Erro 440 = alimento com mesmo nom já cadastrado
                Alert.alert("Erro", "Já exsite um alimento com mesmo nome cadastrado.");
            } else {
                console.error(erro);
            }
            console.log('Erro ao executar POST de alimento: ', erro);
        })
    }

    async function enviarSolicitacaoDELETE(idAlimento) {
        const token_access = await AsyncStorage.getItem("jwt");
        axios.delete(`${API_BASE_URL}/alimentos/${idAlimento}`,
        {headers: {Authorization: token_access}},
        {validateStatus: () => true},
        )
        .then((resposta) => {
            // Alimento excluído com sucesso
            // Apagando da lista de pratos
            const updatedList = listaPratos.filter((prato) => prato.id !== idAlimento);
            setListaPratos(updatedList);
            Alert.alert("Sucesso", "Alimento excluído com sucesso!");
            console.log("DELETE de alimento realizado com sucesso");
        })
        .catch(function (erro) {
            if (erro.response?.status == 401) { // Usuário comum tentou excluir alimento da comunidade
                Alert.alert("Erro", "Você não possui permissão para excluir um alimento padrão.");
            } else {
                console.error(erro);
            }
        })
    }    

  const handleDeleteItem = (id) => {
    Alert.alert(
        "Confirmar exclusão",
        `Deseja realmente excluir o alimento com id ${id}?`,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: () => enviarSolicitacaoDELETE(id),
            style: 'confirmar',
          },
        ],
    );
  };
  
  const navigation = useNavigation();
    
  const handleVoltar = () => {
    navigation.goBack();
  };

    // Chamar o carregamento da tela
    if (isLoading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#38acbe" />
          </View>
    );}	

  return (
	<SafeAreaView>
	<ScrollView>
    <View style={styles.CaixaTotal}>
      <Text style={styles.estiloTexto}>Nome do alimento: </Text>
      <View style={styles.CaixaInfoMenorContainer}>
        <TextInput
          style={styles.CaixaInfoMenorInput}
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.CaixaInfoMenorContainer}>
        <Text style={styles.estiloTexto}>Quantidade:   </Text>
        <TextInput
          style={styles.CaixaInfoMenorInput}
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.CaixaInfoMenorContainer}>
        <Text style={styles.estiloTexto}>Carboidratos: </Text>
        <TextInput
          style={styles.CaixaInfoMenorInput}
          value={carboidratos}
          onChangeText={setCarboidratos}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.CaixaInfoMenorContainer}>
        <Text style={styles.estiloTexto}>Proteínas:       </Text>
        <TextInput
          style={styles.CaixaInfoMenorInput}
          value={proteinas}
          onChangeText={setProteinas}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.CaixaInfoMenorContainer}>
        <Text style={styles.estiloTexto}>Gorduras:        </Text>
        <TextInput
          style={styles.CaixaInfoMenorInput}
          value={gorduras}
          onChangeText={setGorduras}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.CaixaInfoMenorContainer}>
        <Text style={styles.estiloTexto}>kCalorias:        </Text>
        <TextInput
          style={styles.CaixaInfoMenorInput}
          editable={false}
          placeholder={
            `${
                (4*(parseFloat(proteinas) + parseFloat(carboidratos)) + 9*parseFloat(gorduras)) >= 0 ? (4*(parseFloat(proteinas) + parseFloat(carboidratos)) + 9*parseFloat(gorduras)) : ""
            }`
            }
        />
      </View>
      <View style={styles.listaContainer}>
      <Text style = {styles.tituloLista} marginTop={20}>Alimentos Cadastrados:</Text>
        <ScrollView horizontal={true}>
        <FlatList nestedScrollEnabled
          style={styles.listaContainer}
          data={listaPratos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemNome}>{item.nome}</Text>
              <Text style={styles.itemDescricao}>
                Qtd: {item.quantidade}g, Gor: {item.gorduras}g, Car: {item.carboidratos}g, Pro: {item.proteinas}g, Kcal: {item.kcal}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteItem(item.id)}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        </ScrollView>
    </View>

      <TouchableOpacity style={styles.estilobotao} onPress={adicionarPrato}>
        <Text style={styles.textoBotao}>Adicionar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.estilobotaoVoltar} onPress={handleVoltar}>
        <Text style={styles.textoBotaoVolta}>Voltar</Text>
      </TouchableOpacity>
    </View>
	</ScrollView>
	</SafeAreaView>
  );
}
