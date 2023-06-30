import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import { Button, List, Title, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import styles from './styles';

import axios from 'axios';
import { API_BASE_URL } from "../../config";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

    const InformarConsumoScreen = () => {
      const [alimentos, setAlimentos] = useState([]);

      const [load, setLoad] = useState(true);
      const navigation = useNavigation();


      useEffect(() => { // useEffect: executa após a renderização dos componentes
        enviarSolicitacaoGET();
        navigation.addListener('focus', ()=>setLoad(!load));
      }, [load, navigation])
      
      const [filtroAlimentos, setFiltroAlimentos] = useState('');
      const [alimentosSelecionados, setAlimentosSelecionados] = useState([]);
      const [alimentoSelecionado, setAlimentoSelecionado] = useState(null);
      const [quantidadeAlimentoSelecionado, setQuantidadeAlimentoSelecionado] = useState(0);
      const [isKeyboardActive, setIsKeyboardActive] = useState(false);
      const [nomeRefeicao, setNomeRefeicao] = useState('');
      const [quantidadeAdicionar, setQuantidadeAdicionar] = useState(0);
      const [total, setTotal] = useState(0);
      const [mostrarCampoRefeicao, setMostrarCampoRefeicao] = useState(true);

      async function enviarSolicitacaoGET() {
        try {
          const token_access = await AsyncStorage.getItem("jwt");
          
          try {
            const resposta = await axios.get(`${API_BASE_URL}/alimentos/`, {
              headers: {
                Authorization: token_access,
              }  
            });
            setAlimentos(resposta.data);
            console.log(alimentos);
      
          } catch (error) {
            console.log('Erro na solicitação resposta:', error);
            // Lógica de tratamento de erro
          }
        } catch (error) {
            console.log('Erro ao executar GET:', error);
          }
        }
      // Função chamada ao pressionar o botão "Concluir Refeição"
      const enviarRefeicao = () => {
        if (alimentosSelecionados.length === 0) {
          Alert.alert('Erro', 'Nenhum alimento foi selecionado.');
          return;
        }

        // Lógica para lidar com os alimentos selecionados
        console.log(alimentosSelecionados);
        limparSelecao();

        Alert.alert('Sucesso', 'Refeição enviada com sucesso!');
      };

      // Função para filtrar os alimentos com base no filtro de alimentos
      const filtrarAlimentos = () => {
        if (filtroAlimentos === '') {
          return [];
        } else {
          return alimentos.filter((alimento) =>
            alimento.nome.toLowerCase().includes(filtroAlimentos.toLowerCase())
          );
        }
      };

      // Função chamada ao pressionar um alimento na lista
      const toggleSelecaoAlimento = (id) => {
        setAlimentos((prevAlimentos) => {
          const alimentosAtualizados = prevAlimentos.map((alimento) =>
            alimento.id === id ? { ...alimento, selecionado: !alimento.selecionado } : alimento
          );
      
          const alimentoSelecionado = alimentosAtualizados.find((alimento) => alimento.id === id);
          setAlimentoSelecionado(alimentoSelecionado);
          
          // Verifica se mostrarCampoRefeicao é verdadeiro e atualiza somente se for
          if (mostrarCampoRefeicao) {
            setNomeRefeicao(nomeRefeicao);
            setMostrarCampoRefeicao(false);
          }
          
          setAlimentoSelecionado(alimentoSelecionado);
          setFiltroAlimentos(alimentoSelecionado.nome);
      
          return alimentosAtualizados;
        });
      };
      
      // Função chamada ao pressionar o botão "Adicionar"
      const adicionarAlimento = () => {
        if (alimentoSelecionado && quantidadeAlimentoSelecionado > 0) {
          const quantidade = parseInt(quantidadeAlimentoSelecionado);

          for (let i = 0; i < quantidade; i++) {
            const alimentoComQuantidade = {
              ...alimentoSelecionado,
            };

            setAlimentosSelecionados((prevSelecionados) => [...prevSelecionados, alimentoComQuantidade]);
            setTotal((prevTotal) => prevTotal + 1);
          }

          setAlimentoSelecionado(null);
          setFiltroAlimentos('');
          setQuantidadeAlimentoSelecionado('');
        }
      };

      // Função chamada ao pressionar o botão "Limpar Consumo"
      const limparSelecao = () => {
        setAlimentosSelecionados([]);
        setAlimentoSelecionado(null);
        setQuantidadeAlimentoSelecionado(0);
        setFiltroAlimentos('');
        setNomeRefeicao('');
        setMostrarCampoRefeicao(true);
      };

      return (
        <PaperProvider theme={theme}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -12}
            style={styles.container}
          >
            <View style={styles.header}>
            <Title style={styles.title}>Informar Consumo</Title>
            </View>
            {mostrarCampoRefeicao && (
            <View>
              <Text style={styles.titleRefeicao}> Nome da Refeição</Text>
              <View style={styles.buscaContainer}>
                <TextInput
                  style={styles.inputBusca}
                  label="Digite para filtrar"
                  value={nomeRefeicao}
                  placeholder="Digite o nome da Refeição"
                  onChangeText={setNomeRefeicao}
                />
              </View>
            </View>
            )}
            <View>
              <Text style={styles.titleRefeicao}> Selecione os alimentos consumidos</Text>
              <View style={styles.buscaContainer}>
                <TextInput
                  style={styles.inputBusca}
                  label="Digite para filtrar"
                  value={filtroAlimentos}
                  placeholder="Digite o nome do alimento"
                  onChangeText={setFiltroAlimentos}
                />
              </View>
            </View>

            <FlatList
              style={styles.alimentosList}
              contentContainerStyle={styles.alimentosListContent}
              data={filtrarAlimentos()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <List.Item
                  title={item.nome}
                  description={`${item.quantidade}g - ${item.calorias} cal`}
                  style={[
                    styles.listItem,
                    item.selecionado && styles.listItemSelecionado, // Adiciona um estilo diferente se o alimento estiver selecionado
                  ]}
                  titleStyle={styles.listItemTitle}
                  descriptionStyle={styles.listItemDescription}
                  onPress={() => toggleSelecaoAlimento(item.id)}
                />
              )}
            />

            {alimentoSelecionado && (
              <>
                <TextInput
                  style={styles.inputQuantidade}
                  value={quantidadeAlimentoSelecionado}
                  onChangeText={setQuantidadeAlimentoSelecionado}
                  keyboardType="numeric"
                  placeholder="Digite a quantidade"
                />

                <Button
                  mode="contained"
                  onPress={adicionarAlimento}
                  disabled={quantidadeAlimentoSelecionado === 0}
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                >
                  Adicionar
                </Button>
              </>
            )}

            {alimentosSelecionados.length > 0 && (
              <>
                <Text style={styles.listaAlimentosTitulo}>Alimentos Selecionados</Text>
                <Text style={styles.listaAlimentosTitulo}>{nomeRefeicao}</Text>
                <FlatList
                  style={styles.alimentosSelecionadosList}
                  contentContainerStyle={styles.alimentosSelecionadosListContent}
                  data={alimentosSelecionados}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <List.Item
                      title={item.nome}
                      description={`${item.porcao}g - ${item.qtd_calorias} cal`}
                      style={[styles.listItem, styles.listItemSelecionado]}
                      titleStyle={styles.listItemTitle}
                      descriptionStyle={styles.listItemDescription}
                    />
                  )}
                />
              </>
            )}

            <Button
              mode="outlined"
              onPress={limparSelecao}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              Limpar Consumo
            </Button>

            <Button
              mode="contained"
              onPress={enviarRefeicao}
              disabled={alimentosSelecionados.length === 0}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              
            >
              Concluir Refeição
            </Button>
          </KeyboardAvoidingView>
        </PaperProvider>
      );
    };

    const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: '#6200EE',
      },
    };

    export default InformarConsumoScreen;
