import { StyleSheet, Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window');
const widthc = width * 0.06;
const styles = StyleSheet.create(
    {
        CaixaTotalmente:{
            flex:1,
            backgroundColor:"#fff",
        },

        CaixaTotal:{
            flex:1,
            backgroundColor:"#fff",
            paddingStart: "6%",
            paddingEnd: "6%",
            alignItems: 'center',
            paddingTop: height * 0.03

        },

        form:{
            width:"100%",
            height:"auto", 
            marginTop:50,
            padding:10, 
        },

        CaixaInfoMenor: {
            flex: 1,
            width: width * 0.6,
            height: height * 0.065,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            backgroundColor: "#f6f6f6",
            paddingLeft: 'auto',
            paddingTop: 0,
            marginTop: 5,
            alignSelf: 'flex-end',
          },

          CaixaInfoMenorInput: {
            flex: 1,
            width: width * 0.6,
            height: height * 0.065,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            backgroundColor: "#f6f6f6",
            paddingBottom: 0,
            paddingTop: 0,
            marginTop: 5,
            alignSelf: 'flex-end',
            paddingLeft: widthc /0.3,
            fontSize: 20,
          },
          
        textoTitulo:{
            fontSize: 37,
            color: "#329C20",
            marginTop: 0,
            left: 22,
            height: 50,

        },

        estiloTexto: {
            fontSize: 22,
            paddingTop: 17,
            marginLeft: 20,
            marginBottom: 1,
          },

        textoInfo: {
            fontSize: 20,
            paddingTop: 5,
            marginLeft: 10,
        },
          
        estilobotao:{
            borderRadius:30,
            alignItems: "center",
            justifyContent: "center",
            width: width * 0.7,
            backgroundColor:"#38a69d",
            paddingVertical: 8,
            marginTop: 40,
        },

        estilobotaoVoltar:{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
        },

        textoBotao:{
            fontSize: 18,
            color:"#ffffff",
        },

        textoBotaoVolta:{
            fontSize: 18,
            textDecorationLine: 'underline'
        },

        CaixaInfoMenorContainer: {
            flexDirection: "row", 
            marginBottom: 0,
            marginLeft: width * 0,
            marginTop: height * 0.02,
            paddingRight: 10,
            paddingBottom: 5,

        },

        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        listaContainer: {
          flex: 1,
          maxHeight: 165,
          minHeight: 0.20 * height,
          minWidth: 0.8 * width,
        },
        flatList: {
          flex: 1,
          height: height * 0.02,
        },
        itemContainer: {
          padding: 5,
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
        },
        itemNome: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        tituloLista: {
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 15,
        },
        itemDescricao: {
          fontSize: 14,
          color: 'gray',
        },

        deleteButton: {
          backgroundColor: "red",
          padding: 8,
          borderRadius: 4,
          marginTop: 8,
          minWidth: 0.25 * width,
          alignSelf: "center"
        },
        deleteButtonText: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
        },
        
   
})
export default styles