import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes(){
    return(
        <Drawer.Navigator screenOptions={{title : ''}}>
            <Drawer.Screen
            name = "home"
            component = {TabRoutes}
            options = {{drawerIcon: ({color, size}) => <MaterialCommunityIcons name="home" color ={color} size = {size}/>, drawerLabel : "Ínicio"}}>
            
            </Drawer.Screen>

            <Drawer.Screen
            name = "profile"
            component = {StackRoutes}
            options = {{drawerIcon: ({color, size}) => <Feather name="user" color ={color} size = {size}/>, drawerLabel : "Editar Perfil"}}>
            
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}
