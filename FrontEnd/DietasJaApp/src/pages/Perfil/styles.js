import { StyleSheet, Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create(
    {
        CaixaTotalmente:{
            flex:1,
            backgroundColor:"#38a69d",
            alignItems: "center",
        },

        CaixaTotal:{
            flex:2,
            flex:2,
            backgroundColor:"#fff",
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            paddingStart: "6%",
            paddingEnd: "6%",
            marginTop: height * 0.02,
        },

        form:{
            width:"100%",
            height:"auto", 
            marginTop:50,
            padding:10, 
        },

        CaixaInfoMenor: {
            width: width * 0.6,
            height: 45,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            backgroundColor: "#f6f6f6",
            marginTop: 10,
            alignSelf: 'flex-end',
          },

          textoSub:{
            fontSize: 30,
            color: "#fff",
            fontWeight: "bold",
            marginTop: 15,
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
            borderRadius:410,
            alignItems: "center",
            justifyContent: "center",
            width: width * 0.7,
            backgroundColor:"#38a69d",
            paddingVertical: 8,
            marginTop: 25,
            alignSelf: "center",
        },

        estilobotaoVoltar:{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            alignSelf: "center",
            marginBottom: height * 0.05,
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
            alignItems: "center",
            marginBottom: 20,
            marginLeft: width * 0.01,
            marginTop: height * 0.01
          },

        
    }
)
export default styles