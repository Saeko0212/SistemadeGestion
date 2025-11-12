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
import ActividadesFirestoreScreen from './src/views/ActividadesFirestoreScreen.js';
import ProductosRealtime from './src/views/ProductosRealtime.js';
import CalculoIMC from './src/views/CalculoIMC.js';


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
                name="Actividades" 
                component={ActividadesFirestoreScreen} 
                options={{
                    tabBarLabel: 'Actividades',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="tasks" size={30} color={color} />
                    ),
                }} />
            {}
            <Tab.Screen 
                name="ProductosRT" 
                component={ProductosRealtime} 
                options={{
                    title: "Productos (RT)",
                    tabBarLabel: 'Productos RT',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="database" size={24} color={color} />
                    ),
                }} />
            <Tab.Screen 
                name="CalculoIMC" 
                component={CalculoIMC} 
                options={{
                    title: "Calculadora IMC",
                    tabBarLabel: 'IMC',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="calculator" size={24} color={color} />
                    ),
                }} />
            <Tab.Screen 
                name="Logout"
                component={() => null} 
                options={{
                    tabBarLabel: 'Cerrar Sesión',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="logout" size={24} color={color} />
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault(); 
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