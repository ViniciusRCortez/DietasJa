import { StyleSheet, Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create(
    {
      CaixaTotal:{
        backgroundColor: "#38a69d",
        flex: 1,
    },

      CaixaTitulo:{
        width:"100%",
        height:"auto",
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
     textoTitulo:{
      fontSize: 37,
      marginTop: 0,
      left: 22,
      height: 50,
      fontWeight: "bold",
    },
    textoSub:{
      fontSize: 30,
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
      marginTop: 10,
      height: 35,
      
  },

        imagemEstilo:{
          width: 90,
          height: 50,
          top: 49,
          right: 89,
        },

        CaixaForm:{
           flexGrow: 1,
          marginTop: 20,
          padding:15,
          backgroundColor: "#fff",
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
      },

        estiloinput:{
            width: "100%",
            borderRadius: 50,
            height: 45,
            marginBottom:15,
            marginTop: 10,
            paddingLeft:10,
            backgroundColor: "#f6f6f6",
            alignItems: "center",
        },

        estiloTexto:{
            fontSize: 21,
            paddingTop: 17,
            
        },

        sexoContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          },
        
          dropDownPickerContainer: {
            flex: 1,
            marginLeft: 10,
            marginRight: 95,
            paddingTop: 10,
          },
        
          dropDownPicker: {
            borderColor: "#ccc",
            borderRadius: 50,
            backgroundColor: "#f6f6f6",
            paddingLeft: 15,
          },
        
          dropDownPickerText: {
            fontSize: 17,
          },
        
          dropDownPickerArrow: {
            color: "#777",
            fontSize: 20,
          },

          ContainerInputaolado: {
            flexDirection: "row",
            marginBottom: 20,
          },

          estiloInputaolado: {
            width: "60%",
            height: 45,
            marginTop:10,
            borderColor: "#ccc",
            borderRadius: 50,
            backgroundColor: "#f6f6f6",
            paddingLeft: 10,
            alignItems: "center",
          },

          estilobotaoSalvar:{
            borderRadius:30,
            alignItems: "center",
            justifyContent: "center",
            width: "65%",
            backgroundColor:"#38a69d",
            paddingTop: height * 0.013,
            paddingBottom: 14,
            marginLeft: "auto",
            marginRight:"auto",
            marginTop: 30,
        },

        estilobotaoVoltar:{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: height * 0.02,
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

        
    }
)
export default styles