import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
    {
        CaixaTotal:{
            width:"100%",
            height:"auto",
            bottom:0,
            backgroundColor: "#ffffff",
            marginTop:0,
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
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
            color: "#329C20",
            marginTop: 0,
            left: 22,
            height: 50,

        },

        imagemEstilo:{
            top: 49,
            left: -88,
        },

        CaixaForm:{
            width:"100%",
            height:"auto", 
            marginTop: 20,
            padding:15, 
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
            flex: 1,
            marginLeft: 10,
            marginRight: 95,
            marginTop: 10,
            paddingTop: 15,
            borderColor: "#ccc",
            borderRadius: 50,
            backgroundColor: "#f6f6f6",
            paddingLeft: 10,
            alignItems: "center",
          },

          estilobotaoSalvar:{
            borderRadius:50,
            alignItems: "center",
            justifyContent: "center",
            width: "65%",
            backgroundColor:"#329C20",
            paddingTop: 14,
            paddingBottom: 14,
            marginLeft: "auto",
            marginRight:"auto",
            marginTop: 30,
        },

        estilobotaoVoltar:{
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            backgroundColor:"#207E9C",
            paddingTop: 14,
            paddingBottom: 14,
            marginLeft: "auto",
            marginRight:"auto",
            marginTop: 15,
        },

        textoBotao:{
            fontSize: 18,
            color:"#ffffff",
        },

        
    }
)
export default styles