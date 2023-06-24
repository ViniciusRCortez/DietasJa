import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
    {
      container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      greetingText: {
        paddingTop: 20,
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 25,
        paddingRight: 189,
      },
      rectangle: {
        width: 330,
        height: 130,
        backgroundColor: '#20A50B',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4, // Aumente o valor para aumentar a profundidade da sombra verticalmente
        },
        shadowOpacity: 0.4, // Aumente o valor para aumentar a intensidade da sombra
        shadowRadius: 6, // Aumente o valor para aumentar o desfoque da sombra
        elevation: 8,
      },
      redrectangle: {
        width: 330,
        height: 130,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: "#DA0909",
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4, // Aumente o valor para aumentar a profundidade da sombra verticalmente
        },
        shadowOpacity: 0.4, // Aumente o valor para aumentar a intensidade da sombra
        shadowRadius: 6, // Aumente o valor para aumentar o desfoque da sombra
        elevation: 8,
      },
      separator: {
        height: 2,
        width: '80%',
        backgroundColor: '#fff',
        marginVertical: 8,
      },
      infoTitle: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 5,
      },
      infoValue: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
      },
      macronutrientsRectangle: {
        width: 330,
        backgroundColor: '#DA7A09',
        borderRadius: 15,
        textAlign: "left",
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
      },
      divider: {
        height: 2,
        width: '100%',
        backgroundColor: '#fff',
        marginVertical: 8,
      },
      macronutrientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
      },
      macronutrientValue: {
        fontSize: 19,
        color: '#fff',
        paddingLeft: 100,
      },
      macronutrientValueCarb: {
        fontSize: 19,
        color: '#fff',
        paddingLeft: 70,
      },
      macronutrientTitle: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 30,
      },
      remainingCaloriesContainer: {
        marginTop: 20,
      },
      remainingCaloriesText: {
        fontSize: 20,
        marginTop:5,
        fontWeight: 'bold',
      },

})

export default styles