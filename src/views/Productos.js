import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';  // ← Import único: todo en uno, sin duplicados
import { useNavigation } from '@react-navigation/native';  // Para navegar a Promedio
import { db } from '../database/firebaseconfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import FormularioProductos from '../components/FormularioProductos';
import TablaProductos from '../components/TablaProductos';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const navigation = useNavigation();  // Hook para navegar

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
          {/* Botón para navegar a Promedio (práctica: integra fetch a AWS) */}
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigation.navigate('Promedio')}
          >
            <Text style={styles.navButtonText}>Ir a Promedios (Edades)</Text>
          </TouchableOpacity>
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
  // Estilos nuevos para el botón de navegación
  navButton: {
    backgroundColor: '#ff6b35',  // Naranja para resaltar
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#e94560',
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  navButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});

export default Productos;