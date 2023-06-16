import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, List, TextInput, Title, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import styles from './styles';

const InformarConsumoScreen = () => {
  const [alimentos, setAlimentos] = useState([]);
  const [alimentoAtual, setAlimentoAtual] = useState('');
  const [quantidadeAtual, setQuantidadeAtual] = useState('');
  const [caloriasTotais, setCaloriasTotais] = useState(0);

  const adicionarAlimento = () => {
    const alimento = {
      nome: alimentoAtual,
      quantidade: parseInt(quantidadeAtual),
      calorias: calcularCalorias(alimentoAtual, parseInt(quantidadeAtual)),
    };

    setAlimentos([...alimentos, alimento]);
    setCaloriasTotais(caloriasTotais + alimento.calorias);
    setAlimentoAtual('');
    setQuantidadeAtual('');
  };

  const calcularCalorias = (alimento, quantidade) => {
    // Lógica para calcular as calorias do alimento com base na quantidade
    // Você pode adicionar sua própria lógica aqui
    return quantidade * 10; // Exemplo: 10 calorias por grama
  };

  const encerrarCadastro = () => {
    // Lógica para encerrar o cadastro do consumo
    // Você pode adicionar sua própria lógica aqui
    console.log('Cadastro encerrado');
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Title style={styles.title}>Informar Consumo</Title>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            label="Nome do Alimento"
            value={alimentoAtual}
            onChangeText={setAlimentoAtual}
          />
          <TextInput
            style={styles.input}
            label="Quantidade (gramas)"
            value={quantidadeAtual}
            onChangeText={setQuantidadeAtual}
            keyboardType="numeric"
          />
        </View>
        <Button
          mode="contained"
          onPress={adicionarAlimento}
          disabled={!alimentoAtual || !quantidadeAtual}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Adicionar Alimento
        </Button>
        <List.Section style={styles.listSection}>
          <List.Subheader>Alimentos Consumidos</List.Subheader>
          {alimentos.map((item, index) => (
            <List.Item
              key={index}
              title={`${item.nome}: ${item.quantidade}g`}
              description={`${item.calorias} cal`}
              style={styles.listItem}
              titleStyle={styles.listItemTitle}
              descriptionStyle={styles.listItemDescription}
            />
          ))}
        </List.Section>
        <Text style={styles.totalCalories}>
          Total de Calorias: {caloriasTotais} cal
        </Text>
        <Button
          mode="contained"
          onPress={encerrarCadastro}
          disabled={alimentos.length === 0}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Encerrar Cadastro
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