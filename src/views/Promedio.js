import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../database/firebaseconfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import FormularioPromedio from '../components/FormularioPromedio'; 
import TablaPromedio from '../components/TablaPromedio';  
import TituloPromedio from '../components/TituloPromedio';  

const Promedio = () => {
  const [edades, setEdades] = useState([]);  
  const [promedio, setPromedio] = useState(null);  
  const navigation = useNavigation();

  const cargarDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'edades')); 
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEdades(data);

     
      if (data.length > 0) {
        const edadesArray = data.map((item) => item.edad);
        await calcularPromedioAPI(edadesArray);
      } else {
        setPromedio(null);
      }
    } catch (error) {
      console.error('Error al obtener documentos:', error);
    }
  };

 
  const calcularPromedioAPI = async (listaEdades) => {
    try {
      const response = await fetch('https://q4ws8tftq3.execute-api.us-east-2.amazonaws.com/calcularpromedio', {  // Reemplaza con tu URL real
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ edades: listaEdades }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();  
      setPromedio(data.promedio);  
    } catch (error) {
      console.error('Error al calcular promedio en API:', error);
      setPromedio(null);  
    }
  };

  const eliminarEdad = async (id) => {
    try {
      await deleteDoc(doc(db, 'edades', id));
      cargarDatos();  
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.mainTitle}>Sistema de Gestión</Text>
        <Text style={styles.subtitle}>Promedios (Edades)</Text>
        {/* Tu TituloPromedio sigue aquí */}
        <TituloPromedio promedio={promedio} />
      </View>
      
      <FormularioPromedio cargarDatos={cargarDatos} />
      <TablaPromedio edades={edades} eliminarEdad={eliminarEdad} />
    </View>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 20,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 25,
    marginBottom: 10,
    backgroundColor: '#1a1a2e',
    marginHorizontal: 12,
    borderWidth: 3,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 20,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textShadowColor: '#e94560',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ff6b35',
    textAlign: 'center',
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
});

export default Promedio;