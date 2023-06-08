import { createNativeStackNavigator } from "@react-navigation/native-stack";


import TabRoutes from "./tab.routes";
import EditarPerfil from "../pages/EditarPerfil";

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator screenOptions={{headerShown : false}}>
            <Stack.Screen
            name = "home"
            component = {EditarPerfil}>
            
            </Stack.Screen>
        </Stack.Navigator>
    )
}
