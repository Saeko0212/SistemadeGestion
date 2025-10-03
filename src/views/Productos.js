import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { db } from '../database/firebaseconfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import FormularioProductos from '../components/FormularioProductos';
import TablaProductos from '../components/TablaProductos';

const Productos = () => {
  const [productos, setProductos] = useState([]);

  const cargarDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener documentos:', error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, 'productos', id));
      cargarDatos(); // Recargar la lista después de eliminar
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
          <Text style={styles.subtitle}>Productos</Text>
        </View>
        
        <FormularioProductos cargarDatos={cargarDatos} />
        <TablaProductos productos={productos} eliminarProducto={eliminarProducto} />
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
  paddingTop: 20, // más espacio arriba
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
  fontSize: 22, // más pequeño
  fontWeight: '900',
  color: '#ffffff',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: 1.5, // un poco más compacto
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

export default Productos;