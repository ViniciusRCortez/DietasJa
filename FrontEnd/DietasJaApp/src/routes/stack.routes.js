import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabRoutes from "./tab.routes";
import InformConsumo from "../pages/InformConsumo";
import Login from "../pages/Login";
import Welcome from "../pages/Welcome";
import Perfil from "../pages/Perfil";
import EditarMetas from "../pages/EditarMetas";
import TelaInicial from "../pages/TelaInicial";
import EditarPerfil from "../pages/EditarPerfil";
import EditarLogin from "../pages/EditarLogin";

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator screenOptions={{headerShown : false}}>
            <Stack.Screen
            name = "home"
            component = {TelaInicial}>
            </Stack.Screen>

            <Stack.Screen
             name="Login" 
             component={Login} />

            <Stack.Screen
             name="Welcome" 
             component={Welcome} />

            <Stack.Screen
            name="EditarPerfil"
            component={EditarPerfil}
            ></Stack.Screen>

            <Stack.Screen 
            name="EditarLogin" 
            component={EditarLogin} />   

        </Stack.Navigator>
    )
}