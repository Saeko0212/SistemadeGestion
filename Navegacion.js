import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from '@expo/vector-icons/AntDesign';

import 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

import { auth } from "./src/database/firebaseconfig.js";
import { signOut } from "firebase/auth";

import Productos from './src/views/Productos.js';
import Promedio from './src/views/Promedio.js';
import Usuarios from './src/views/Usuarios.js';

const Tab = createBottomTabNavigator();
function Mytabs() {
    return (
        <Tab.Navigator
        initialRouteName= 'Usuarios'
            screenOptions={{
                tabBarActiveTintColor: 'purple',
            }}>
            
            <Tab.Screen name="Usuarios" component={Usuarios} 
            options={{
                tabBarLabel:'Usuarios',
                tabBarIcon: ({color, size})=>(
                    <AntDesign name="users" size={30}  color={color}/>

                )
            }}
            />
            <Tab.Screen name="Productos" component={Productos} 
            options={{
                tabBarLabel:'Productos',
                tabBarIcon:({color, size})=>(
                    <FontAwesome name="th-list" size={30} color={color} />
                )
            }}
            />
            <Tab.Screen name="Promedio" component={Promedio} 
            options={{
                tabBarLabel:'Promedio',
                tabBarIcon:({color, size})=>(
                    <FontAwesome name="line-chart" size={30} color={color} />
                )
            }}
            />
            <Tab.Screen 
                name="Logout"
                // No renderiza un componente, solo ejecuta una acción
                component={() => null} 
                options={{
                    tabBarLabel: 'Cerrar Sesión',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="logout" size={24} color={color} />
                    ),
                }}
                listeners={{
                    // Al presionar la pestaña, cerramos la sesión
                    tabPress: (e) => {
                        e.preventDefault(); // Prevenimos la navegación
                        signOut(auth);
                    },
                }}
            />

        </Tab.Navigator>
    );
}

export default function Navegacion() {
  return (
    <NavigationContainer>
      <Mytabs />
    </NavigationContainer>
  );
}