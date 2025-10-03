import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Productos from './src/views/Productos';  // Vista original con lógica de productos (Firebase CRUD)
import Promedio from './src/views/Promedio';    // Nueva vista con lógica similar (Firebase CRUD + fetch a AWS para promedio)

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Productos">  
        <Stack.Screen 
          name="Productos" 
          component={Productos} 
          options={{ title: 'Gestión de Productos' }} 
        />
        <Stack.Screen 
          name="Promedio" 
          component={Promedio} 
          options={{ title: 'Gestión de Promedios (Edades)' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}