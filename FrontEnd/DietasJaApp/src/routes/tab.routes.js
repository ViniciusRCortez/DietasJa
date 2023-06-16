import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

import TelaInicial from "../pages/TelaInicial";
import InformConsumo from "../pages/InformConsumo";
import Historico from "../pages/HistoricoConsumo";
import Visualizar from "../pages/VisualizarInd";

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
    return(
        <Tab.Navigator screenOptions= {{headerShown : false}}>
            <Tab.Screen
                name = "Início"
                component = {TelaInicial}
                options = {{tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="home" color ={color} size = {size} />}}>
            </Tab.Screen>
            
            <Tab.Screen
                name = "Informar Consumo"
                component = {InformConsumo}
                options = {{tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="food-variant" color ={color} size = {size}/>}}>
            </Tab.Screen>

            <Tab.Screen
                name = "Histórico Consumo"
                component = {Historico}
                options = {{tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="calendar-search" color ={color} size = {size} />}}>
            </Tab.Screen>

            <Tab.Screen
                name = "Consultar Índices"
                component = {Visualizar}
                options = {{tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="table-search" color ={color} size = {size}/>}}>
            </Tab.Screen>

        </Tab.Navigator>
    )
}

