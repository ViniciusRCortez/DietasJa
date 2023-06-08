import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
    {
        CaixaTotal:{
            width:"100%",
            height:"auto",
            bottom:0,
            backgroundColor: "#ffffff",
            alignItems: "center",
            marginTop:0,
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
        },
        estiloinput:{
            width: "100%",
            borderRadius: 50,
            height: 55,
            marginBottom:10,
            marginTop: 10,
            paddingLeft:10,
            backgroundColor: "#f6f6f6",
            alignItems: "center",

        },
        form:{
            width:"100%",
            height:"auto", 
            marginTop:50,
            padding:10, 
        },
        estilobotaoLogin:{
            borderRadius:50,
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
            backgroundColor:"#207E9C",
            paddingTop: 14,
            paddingBottom: 14,
            marginLeft: "auto",
            marginRight:"auto",
            marginTop: 30,
            },

        estilobotaoCadastro:{
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            backgroundColor:"#329C20",
            paddingTop: 10,
            paddingBottom: 10,
            marginLeft: "auto",
            marginRight:"auto",
            marginTop: 30,
                },

        textoBotao:{
            fontSize: 20,
            color:"#ffffff",

        },
        estiloErro:{
            paddingLeft: "auto",
            paddingRight: "auto",
            alignItems: "center",
        },
        mensagemErro:{
            fontSize: 16,
            color: "red",
            textAlign: "center",
            marginTop: 15,
        }
    }
)
export default styles