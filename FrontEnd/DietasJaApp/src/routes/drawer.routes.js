import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions} from 'react-native';

import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";
import EditarMetas from "../pages/EditarMetas";
import Perfil from "../pages/Perfil";

const Drawer = createDrawerNavigator();

const Nwidth = Dimensions.get('window').width;

const CustomDrawerHeader = ({ navigation, handleLogOut }) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  const ChamarSaida = async () => {
    try {
      // Lógica para realizar o logout com a conexão com o backend
      // Por exemplo, enviar uma solicitação para invalidar o token de autenticação no servidor
      
      // Aguarde a resposta do backend

      // Se a resposta for bem-sucedida, chame a função handleLogOut para atualizar o estado de login
      handleLogOut();
      console.log("Saiu!");
    } catch (error) {
      console.log(error);
      // Lidar com erros de logout aqui
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDrawer}>
        <Feather name="menu" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.textContainer}>
      <Image
          source={require('../assets/outralogo.png')}
          style={styles.imagemestilo}
        />
      <Text style = {styles.textoestilo}>DietasJá</Text>
      </View>
      <View style = {styles.saidaContainer}>
        <TouchableOpacity onPress={ChamarSaida}>
            <SimpleLineIcons name="logout" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function DrawerRoutes({ handleLogOut }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        header: ({ navigation }) => <CustomDrawerHeader navigation={navigation} handleLogOut={handleLogOut} />,
      }}
    >
     <Drawer.Screen
        name="home"
        component={TabRoutes}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          drawerLabel: "Ínicio",
        }}
     ></Drawer.Screen>

      <Drawer.Screen
        name="profile"
        component={Perfil}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          drawerLabel: "Minha Conta"
        }}
      ></Drawer.Screen>

     <Drawer.Screen
        name="metas"
        component={EditarMetas}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="target" color={color} size={size} />
          ),
          drawerLabel: "Editar Metas"
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
}

// Estilo do Cabeçalho das telas
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop:40,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  saidaContainer:{
    paddingLeft: 105,
  },
  textoestilo:{
    fontSize: 32,
    color: "#38a69d",
    left: 36,
    fontWeight: 'bold',
  },
  imagemestilo:{
    width: 80,
    height: 50,
    left: 45,
  },
});