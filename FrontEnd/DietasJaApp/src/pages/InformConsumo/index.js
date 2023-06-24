import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Alert} from 'react-native';
import { Button, List, Title, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import styles from './styles';

const InformarConsumoScreen = () => {
  const [alimentos, setAlimentos] = useState([
    { id: 0, nome: 'Maçã', quantidade: 100, calorias: 52, selecionado: false },
    { id: 1, nome: 'Banana', quantidade: 120, calorias: 96, selecionado: false },
    { id: 2, nome: 'Laranja', quantidade: 150, calorias: 62, selecionado: false },
    { id: 3, nome: 'Morango', quantidade: 50, calorias: 29, selecionado: false },
    { id: 4, nome: 'Feijão', quantidade: 50, calorias: 29, selecionado: false },
    { id: 5, nome: 'Abacaxi', quantidade: 80, calorias: 50, selecionado: false },
    { id: 6, nome: 'Uva', quantidade: 100, calorias: 70, selecionado: false },
    { id: 7, nome: 'Melancia', quantidade: 200, calorias: 90, selecionado: false },
    { id: 8, nome: 'Pêra', quantidade: 90, calorias: 55, selecionado: false },
    { id: 9, nome: 'Manga', quantidade: 150, calorias: 80, selecionado: false },
    { id: 10, nome: 'Abacate', quantidade: 120, calorias: 160, selecionado: false },
    { id: 11, nome: 'Cenoura', quantidade: 70, calorias: 35, selecionado: false },
    { id: 12, nome: 'Tomate', quantidade: 50, calorias: 20, selecionado: false },
    { id: 13, nome: 'Brócolis', quantidade: 60, calorias: 55, selecionado: false },
    { id: 14, nome: 'Couve', quantidade: 40, calorias: 30, selecionado: false },
    { id: 15, nome: 'Batata', quantidade: 200, calorias: 180, selecionado: false },
    { id: 16, nome: 'Arroz', quantidade: 80, calorias: 150, selecionado: false },
    { id: 17, nome: 'Feijão preto', quantidade: 100, calorias: 70, selecionado: false },
    { id: 18, nome: 'Frango', quantidade: 120, calorias: 200, selecionado: false },
    { id: 19, nome: 'Peixe', quantidade: 90, calorias: 120, selecionado: false },
  ]);
  
  const [filtroAlimentos, setFiltroAlimentos] = useState('');
  const [alimentosSelecionados, setAlimentosSelecionados] = useState([]);
  const [alimentoSelecionado, setAlimentoSelecionado] = useState(null);
  const [quantidadeAlimentoSelecionado, setQuantidadeAlimentoSelecionado] = useState(0);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [nomeRefeicao, setNomeRefeicao] = useState('');
  const [quantidadeAdicionar, setQuantidadeAdicionar] = useState(0);
  const [total, setTotal] = useState(0);
  const [mostrarCampoRefeicao, setMostrarCampoRefeicao] = useState(true);

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
      <View style={styles.container}>
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
                  description={`${item.quantidade}g - ${item.calorias} cal`}
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
      </View>
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
