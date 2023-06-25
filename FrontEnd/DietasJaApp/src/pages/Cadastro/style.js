import { StyleSheet, Dimensions} from 'react-native'

//Pegando os valores da tela
const telaLargura = Dimensions.get('window').width;
const telaAltura = Dimensions.get('window').height;


const styles = StyleSheet.create(
    {
        CaixaTotalmente:{
            backgroundColor:"#38a69d",
            flexDirection:"column",
        },
        containerheader:{
            marginTop:"20%",
            marginBottom:"9%",
            paddingStart:"6%",
        },
        TextoExemplo:{
            color:'black',
            fontSize:30,
          },
        TextoInicial:{
            fontSize:28,
            fontWeight:"bold",
            color:"#FFFFFF",
        },
        CaixaCadastro:{
            backgroundColor:"#FFFFFF",
            borderTopLeftRadius:25,
            borderTopRightRadius:25,
            paddingStart:"6%",
            paddingEnd:"6%",
        },
        Title:{
            fontSize:20,
            marginTop:28,
        },
        Input:{
            borderBottomWidth:1,
            height:40,
            marginBottom:12,
            fontSize:16,
        },
        botao:{
            borderRadius:4,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor:"#38a69d",
            paddingVertical: 8,
            marginTop: 25,
            
        },
        textoBotao:{
            fontSize:18,
            color:"#FFFFFF",
            fontWeight:"bold",
        },
    }
)
export default styles