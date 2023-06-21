import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
    {
        containerheader:{
            marginTop:"20%",
            marginBottom:"9%",
            paddingStart: "6%",
        },
        message:{
            fontSize: 28,
            fontWeight: "bold",
            color: "#fff"
        },
        CaixaTotalmente:{
            flex:1,
            backgroundColor:"#38a69d",
        },
        CaixaTotal:{
            flex:1,
            backgroundColor:"#fff",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingStart: "6%",
            paddingEnd: "6%",
        },
        title:{
            fontSize: 20,
            marginTop:28,
        },
        estiloinput:{
            borderBottomWidth: 1,
            height: 40,
            marginBottom:12,
            fontSize: 16,
        },
        form:{
            width:"100%",
            height:"auto", 
            marginTop:50,
            padding:10, 
        },
        estilobotaoLogin:{
            borderRadius:4,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor:"#38a69d",
            paddingVertical: 8,
            marginTop: 25,
            },

        estilobotaoCadastro:{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            },

        textoBotao:{
            fontSize: 18,
            color:"#ffffff",
            fontWeight: "bold"
        },
        textoBotaoCadastro:{
            color:"#a1a1a1",
            fontSize: 15,
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