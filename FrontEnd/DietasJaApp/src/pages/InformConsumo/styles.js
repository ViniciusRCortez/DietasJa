import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  inputQuantidade: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  titleRefeicao: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginBottom: 16,
    backgroundColor: '#01C099',
  },
  buttonLabel: {
    color: '#FFFFFF',
  },
  listSection: {
    marginBottom: 16,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  listItemTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  listItemDescription: {
    fontSize: 14,
  },
  totalCalories: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buscaContainer: {
    marginBottom: 16,
  },
  inputBusca: {
    backgroundColor: '#F6f6f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    borderColor: '#E0E0E0',
    borderWidth: 2,
    borderRadius: 4,
  },
  listaAlimentosContainer: {
    flex: 1,
    marginBottom: 16,
  },
  listItemSelecionado: {
    backgroundColor: '#E0E0E0',
  },
  listaBuscaContainer: {
    marginBottom: 16,
  },
  listaBuscaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listaAlimentosTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  alimentoSelecionadoContainer: {
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },

  alimentoSelecionadoNome: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  alimentoSelecionadoDetalhes: {
    fontSize: 14,
    color: '#888888',
  },
  alimentosList: {
    flex: 1,
    marginBottom: 10,
  },
  alimentosListContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  alimentosSelecionadosList: {
    flex: 1,
    marginBottom: 10,
  },
  alimentosSelecionadosListContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  listItem: {
    backgroundColor: '#F4F4F4',
    marginVertical: 5,
    borderRadius: 8,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItemDescription: {
    fontSize: 14,
    color: '#888888',
  },
  listaAlimentosTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },


});

export default styles;
