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
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingStart: "6%",
            paddingEnd: "6%",
            marginTop: height * 0.05,
            alignItems: 'center',

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
            paddingBottom: 0,
            paddingTop: 0,
            marginTop: 5,
            alignSelf: 'flex-end',
          },

          CaixaInfoMenorInput: {
            flex: 1,
            width: width * 0.6,
            height: height * 0.065,
            justifyContent: "center",
            borderRadius: 50,
            backgroundColor: "#f6f6f6",
            paddingBottom: 0,
            paddingTop: 0,
            marginTop: 5,
            alignSelf: 'flex-end',
            fontSize: 20,
            textAlign: "center",
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
            marginBottom: 20,
            marginLeft: width * 0,
            marginTop: height * 0.03,
            paddingRight: 10,
          },

        
    }
)
export default styles