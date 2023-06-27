import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  greetingText: {
    paddingTop: height * 0.02, 
    fontSize: width * 0.065, 
    fontWeight: 'bold', 
  },
  containerTexto:{
    width: width * 0.87,
    marginBottom: height * 0.03,
  },
  rectangle: {
    width: width * 0.8, 
    height: height * 0.162, 
    backgroundColor: '#20A50B',
    borderRadius: width * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.03, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: height * 0.01, 
    },
    shadowOpacity: 0.4,
    shadowRadius: width * 0.03,
    elevation: 8,
  },
  redrectangle: {
    width: width * 0.8, 
    height: height * 0.162, 
    borderRadius: width * 0.04, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.03, 
    backgroundColor: '#DA0909',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: height * 0.01, 
    },
    shadowOpacity: 0.4,
    shadowRadius: width * 0.03, 
    elevation: 8,
  },
  separator: {
    height: height * 0.002, 
    width: width * 0.8, 
    backgroundColor: '#fff',
    marginVertical: height * 0.008, 
  },
  infoTitle: {
    fontSize: width * 0.05, 
    color: '#fff',
    marginBottom: height * 0.01, 
  },
  infoValue: {
    fontSize: width * 0.06, 
    color: '#fff',
    fontWeight: 'bold',
  },
  macronutrientsRectangle: {
    width: width * 0.8, 
    backgroundColor: '#DA7A09',
    borderRadius: width * 0.04,
    textAlign: 'left',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: height * 0.02, 
    marginBottom: height * 0.02, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: height * 0.01, 
    },
    shadowOpacity: 0.4,
    shadowRadius: width * 0.03, 
    elevation: 8,
  },
  divider: {
    height: height * 0.002, 
    width: width * 0.95,
    backgroundColor: '#fff',
    marginVertical: height * 0.008, 
  },
  macronutrientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.006, 
  },
  macronutrientValue: {
    fontSize: width * 0.05, 
    color: '#fff',
    paddingLeft: width * 0.3, 
  },
  macronutrientValueCarb: {
    fontSize: width * 0.05, 
    color: '#fff',
    paddingLeft: width * 0.23, 
  },
  macronutrientTitle: {
    fontSize: width * 0.05,
    color: '#fff',
    marginLeft: width * 0.09, 
  },
  remainingCaloriesContainer: {
    marginTop: height * 0.02, 
  },
  remainingCaloriesText: {
    fontSize: width * 0.049, 
    fontWeight: 'bold',
  },
});

export default styles;
