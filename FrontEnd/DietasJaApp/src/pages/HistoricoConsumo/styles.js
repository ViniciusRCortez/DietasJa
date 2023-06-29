import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
  {
    container: {
      flexGrow: 1,
      backgroundColor: '#fff',
      paddingVertical: 20,
      paddingHorizontal: 16,
    },
    header: {
      backgroundColor: '#fff',
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginBottom: 20,
      borderRadius: 8,
      alignItems: "center",
    },
    mensagem: {
      backgroundColor: '#01C099',
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginBottom: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
    },
    mensagemText:{
      fontSize: 18,
      fontWeight: 'bold',
      color: "black",
      textAlign: 'center',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    dayContainer: {
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
    },
    dayText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#fff',
    },
    caloriesText: {
      fontSize: 20,
      color: '#fff',
      marginBottom: 4,
    },
    separator: {
      height: 1,
      backgroundColor: '#fff',
      marginVertical: 8,
    },
    goalText: {
      fontSize: 16,
      color: '#fff',
      opacity: 0.8,
    },
    button: {
      backgroundColor: '#0198AE',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 50,
      marginBottom: 20,
      alignSelf: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },    
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 8,
    },
    message: {
      fontSize: 19,
      marginBottom: 20,
      padding: 10,
      fontWeight: 'bold',
      backgroundColor: '#F17163',
      textAlign: 'center',
      borderRadius: 10,
      // Estilizações adicionais
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    message2: {
      fontSize: 19,
      fontWeight: 'bold',
      marginBottom: 60,
      padding: 10,
      backgroundColor: '#F2955E',
      textAlign: 'center',
      borderRadius: 10,
      // Estilizações adicionais
      elevation: 2,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
    },
    message3: {
      fontSize: 21,
      marginBottom: 40,
      padding: 10,
      fontWeight: 'bold',
      backgroundColor: '#01C099',
      textAlign: 'center',
      borderRadius: 10,
      // Estilizações adicionais
      borderColor: 'black',
    },
    


  });
export default styles