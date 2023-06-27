import React from "react-native"
import {View, StyleSheet} from "react-native"

const style = StyleSheet.create(
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

        CaixaForm:{
            flex:2, 
            marginTop: 20,
            padding: 15,
            backgroundColor: "#fff",
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
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
            right: 89,
        },
        textoSub:{
            fontSize: 30,
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 10,
            height: 35,
            
        },

        estiloinput:{
            width: "100%",
            borderRadius: 50,
            height: 45,
            marginBottom:10,
            marginTop: 10,
            paddingLeft:10,
            backgroundColor: "#f6f6f6",
            alignItems: "center",
        },

        estiloTexto:{
            fontSize: 20,
            paddingTop: 17,
            
        },
        estilobotaoSalvar:{
            borderRadius:50,
            alignItems: "center",
            justifyContent: "center",
            width: "60%",
            backgroundColor:"#38a69d",
            paddingTop: 14,
            paddingBottom: 14,
            marginLeft: "auto",
            marginRight:"auto",
            marginTop: 15,
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
  
        mensagemErro:{
            fontSize: 16,
            color: "red",
            textAlign: "center",
            marginTop: 10,
        }

    }
)

export default style