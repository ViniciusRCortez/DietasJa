import { StyleSheet, Dimensions} from 'react-native'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create(
    {
        CaixaTotal:{
            width:"100%",
            height:"auto",
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
        imagemEstilo:{
          width: 90,
          height: 50,
          top: 49,
          right: 76,
        },
        textoSub:{
            fontSize: 30,
            color: "#fff",
            fontWeight: "bold",
            marginTop: 15,
            textAlign: "center"
        },
        CaixaForm:{
            flex:2, 
            marginTop: 20,
            padding: 15,
            backgroundColor: "#fff",
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
        },
        estiloinput:{
            width: "100%",
            borderRadius: 50,
            height: 45,
            marginBottom:5,
            marginTop: 5,
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
            width: "60%",
            height: 45,
            marginTop:10,
            borderColor: "#ccc",
            borderRadius: 50,
            backgroundColor: "#f6f6f6",
            paddingLeft: 10,
            alignItems: "center",
          },

          estilobotaoAvançar:{
            borderRadius:50,
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            backgroundColor:"#38a69d",
            paddingTop: 14,
            paddingBottom: 14,
            marginLeft: "auto",
            marginRight:"auto",
            marginTop: 15,
            marginBottom: height * 0.05,
        },

        textoBotao:{
            fontSize: 15,
            color:"#ffffff",
        },

        
    }
)
export default styles