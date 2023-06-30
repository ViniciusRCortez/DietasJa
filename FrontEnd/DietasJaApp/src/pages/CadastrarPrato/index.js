import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function CadastrarPrato() {
  const [nome, setNome] = useState("");
  const [gorduras, setGorduras] = useState("");
  const [proteinas, setProteinas] = useState("");
  const [carboidratos, setCarboidratos] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [listaPratos, setListaPratos] = useState([]);

  const adicionarPrato = () => {
    if (
      nome.trim() !== "" &&
      gorduras.trim() !== "" &&
      proteinas.trim() !== "" &&
      carboidratos.trim() !== ""
    ) {
      const novoPrato = {
        nome,
        quantidade: parseInt(quantidade),
        gorduras: parseInt(gorduras),
        proteinas: parseInt(proteinas),
        carboidratos: parseInt(carboidratos),
      };
      Alert.alert("Sucesso", "Alimento cadastrado com sucesso!");
      setListaPratos([...listaPratos, novoPrato]);
      setNome("");
      setGorduras("");
      setProteinas("");
      setCarboidratos("");
      setQuantidade("");
    } else {
      Alert.alert("Erro", "Preencha todos os campos.");
    }
  };

  const handleDeleteItem = (item) => {
    const updatedList = listaPratos.filter((prato) => prato !== item);
    setListaPratos(updatedList);
    Alert.alert("Sucesso", "Alimento excluído com sucesso!");
  };
  
  const navigation = useNavigation();
    
  const handleVoltar = () => {
    navigation.goBack();
  };

  return (
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
        <Text style={styles.estiloTexto}>Gorduras:        </Text>
        <TextInput
          style={styles.CaixaInfoMenorInput}
          value={gorduras}
          onChangeText={setGorduras}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.CaixaInfoMenorContainer}>
        <Text style={styles.estiloTexto}>Proteinas:       </Text>
        <TextInput
          style={styles.CaixaInfoMenorInput}
          value={proteinas}
          onChangeText={setProteinas}
          keyboardType="numeric"
        />
      </View> 

      
      <View style={styles.listaContainer}>
      <Text style = {styles.itemNome}>Alimentos Cadastrados:</Text>
        <FlatList
          style={styles.flatList}
          data={listaPratos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemNome}>{item.nome}</Text>
              <Text style={styles.itemDescricao}>
                Qtde: {item.quantidade}g, Gord: {item.gorduras}g, Carb: {item.carboidratos}g, Prot: {item.proteinas}g
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteItem(item)}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
    </View>

      <TouchableOpacity style={styles.estilobotao} onPress={adicionarPrato}>
        <Text style={styles.textoBotao}>Adicionar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.estilobotaoVoltar} onPress={handleVoltar}>
        <Text style={styles.textoBotaoVolta}>Voltar</Text>
      </TouchableOpacity>

      
    </View>

  );
}