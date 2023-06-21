import { createNativeStackNavigator } from "@react-navigation/native-stack";


import TabRoutes from "./tab.routes";
import EditarPerfil from "../pages/EditarPerfil";
import InformConsumo from "../pages/InformConsumo";
import Login from "../pages/Login";
import Welcome from "../pages/Welcome";

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator screenOptions={{headerShown : false}}>
            <Stack.Screen
            name = "home"
            component = {EditarPerfil}>
            </Stack.Screen>

            <Stack.Screen
            name = "metas"
            component = {InformConsumo}>
            </Stack.Screen>

            <Stack.Screen
             name="Login" 
             component={Login} />

            <Stack.Screen
             name="Welcome" 
             component={Welcome} />
             
        </Stack.Navigator>
    )
}
