import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.01, 
    width: "100%",
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: height * 0.026, 
    paddingHorizontal: width * 0.2, 
    marginBottom: height * 0.02, 
    borderRadius: width * 0.08, 
    alignItems: "center",
  },
  headerText: {
    fontSize: height * 0.030, 
    fontWeight: 'bold',
  },
  messagemtitulo: {
    fontSize: height * 0.025, 
    fontWeight: "bold",
    marginBottom: height * 0.05, 
    textAlign: "center",
  },
  messagembottom: {
    fontSize: height * 0.023, 
    fontWeight: "bold",
    textAlign: "center",
  },
  messagem: {
    fontSize: height * 0.025, 
    fontWeight: "bold",
    textAlign: "center",
  },
  messagemdesc: {
    fontSize: height * 0.027, 
    fontWeight: "bold",
    margin: height * 0.01, 
    textAlign: "center",
  },
  infoContainer: {
    width: width * 0.93, 
    backgroundColor: '#38a69d',
    borderRadius: width * 0.04,
    height: height * 0.22, 
  },
  messagemcontainer:{
    backgroundColor: "#F17163",
    marginTop: height * 0.035,
    borderRadius: width * 0.02,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.025, 
    paddingHorizontal: width * 0.03, 
    marginBottom: height * 0.024, 
  },
  infoLabel: {
    fontSize: height * 0.023, 
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: height * 0.023, 
  },
  abaixopeso: {
    backgroundColor: "#FFCCCC",
  },
  normal: {
    backgroundColor: "#04C84E",
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
    backgroundColor: "#04C84E",
  },
  altoTmb: {
    backgroundColor: "#FFFFCC",
  },
});

export default styles;
