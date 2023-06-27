import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions} from 'react-native';

import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";
import EditarMetas from "../pages/EditarMetas";
import PerfilScreen from "../pages/Perfil";
import CadastrarPrato from "../pages/CadastrarPrato";

const Drawer = createDrawerNavigator();

const { width, height } = Dimensions.get('window');

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
      drawerContent={CustomDrawerContent}
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
        component={PerfilScreen}
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
            <AntDesign name="edit" color={color} size={size} />
          ),
          drawerLabel: "Editar Metas"
        }}
      ></Drawer.Screen>

      <Drawer.Screen
        name="cadprato"
        component={CadastrarPrato}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bowl-mix" color={color} size={size} />
          ),
          drawerLabel: "Cadastrar Alimento"
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {

  return (
    <DrawerContentScrollView {...props}>
       <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Menu</Text>
      </View>
      <DrawerItemList {...props} />

    </DrawerContentScrollView>
  );
}

// Estilo do Cabeçalho das telas
const styles = StyleSheet.create({
  
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
    paddingTop: height * 0.035,
    justifyContent: "center",
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.02,
    justifyContent: "center",
  },
  saidaContainer: {
    paddingLeft: width * 0.23,
  },
  textoestilo: {
    fontSize: width * 0.075,
    color: '#38a69d',
    left: width * 0.07,
    fontWeight: 'bold',
    bottom: width * 0.005,
  },
  imagemestilo: {
    width: width * 0.185,
    height: height * 0.051,
    left: width * 0.11,
    bottom: width * 0.008,
  },
  drawerHeader: {
    backgroundColor: '#fff',
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
    justifyContent: 'center',
  },
  drawerHeaderText: {
    fontSize: width * 0.065,
    fontWeight: 'bold',
    color: 'black',
  },
});