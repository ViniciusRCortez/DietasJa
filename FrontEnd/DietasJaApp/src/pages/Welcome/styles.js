import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#38a69d',

    }, containerlogo:{
        flex:2,
        backgroundColor: '#38a69d',
        justifyContent: "center",
        alignItems: "center",
    }, 
    containerForm:{
        flex:1,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 25,
        borderTopRightRadius:25,
        paddingStart:'5%',
        paddingEnd: '5%',
    },
    titulologo:{
        fontSize:40,
        fontWeight: 'bold',
        marginTop:10,
    },
    title:{
        fontSize:24,
        fontWeight: 'bold',
        marginTop:28,
        marginBottom: 12,   
    },
    text:{
        color: "#a1a1a1"
    },
    botao:{
        position:'absolute',
        backgroundColor: "#38a69d",
        borderRadius: 50,
        paddingVertical: 10,
        width: "60%",
        alignSelf: 'center',
        bottom: "25%",
        alignItems:"center",
        justifyContent: "center",

    },
    botaotexto:{
        fontSize: 18,
        color: "#FFF",
        fontWeight: "bold",
    }


})

export default styles;