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
      shadowColor: '#fff',
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 30,
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

  });
export default styles