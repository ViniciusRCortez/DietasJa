import React from "react-native"
import {View, StyleSheet} from "react-native"

const style = StyleSheet.create(
    {
        CaixaTotal:{
            width:"100%",
            height:"auto",
            bottom:0,
            backgroundColor: "#ffffff",
            marginTop:0,
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
        },

        CaixaTitulo:{
            width:"100%",
            height:"auto",
            paddingBottom: 20,
            justifyContent: "center",
            alignItems: "center",
        },

        CaixaForm:{
            width:"100%",
            height:"auto", 
            marginTop: 20,
            padding:15, 
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

        estiloTexto:{
            fontSize: 20,
            paddingTop: 17,
            
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

        mensagemErro:{
            fontSize: 16,
            color: "red",
            textAlign: "center",
            marginTop: 10,
        }

    }
)

export default style