import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#fff",
      paddingHorizontal: 20,
    },
    messagemtitulo: {
      fontSize: 23,
      fontWeight: "bold",
      paddingTop: 70,
      marginBottom: 80,
      textAlign: "center",
    },
    messagembottom: {
        fontSize: 19,
        fontWeight: "bold",
        paddingTop: 0,
        marginBottom: 10,
        textAlign: "center",
      },
    messagem: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 25,
      textAlign: "center",
    },
    messagemdesc: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    infoContainer: {
      width: "80%",
    },
    infoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 25,
      paddingHorizontal: 20,
      borderRadius: 15,
      marginBottom: 20,
    },
    infoLabel: {
      fontSize: 20,
      fontWeight: "bold",
    },
    infoValue: {
      fontSize: 20,
    },
    messageContainer: {
      paddingHorizontal: 18,
      paddingBottom: 20,
    },
    abaixopeso: {
      backgroundColor: "#FFCCCC",
    },
    normal: {
      backgroundColor: "#CCFFCC",
    },
    acimapeso: {
      backgroundColor: "#FFFFCC",
    },
    obesidade: {
      backgroundColor: "#FFCCCC",
    },
    baixoTmb: {
      backgroundColor: "#FFCCCC",
    },
    normalTmb: {
      backgroundColor: "#CCFFCC",
    },
    altoTmb: {
      backgroundColor: "#FFFFCC",
    },
  });

export default styles