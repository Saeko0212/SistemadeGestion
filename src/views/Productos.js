import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Button, Alert } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';  
import { db } from '../database/firebaseconfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import FormularioProductos from '../components/FormularioProductos';
import TablaProductos from '../components/TablaProductos';
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import * as Clipboard from "expo-clipboard";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const navigation = useNavigation();  

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 3;

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
      cargarDatos();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const exportarYCopiarDatos = async () => {
    if (productos.length === 0) {
      Alert.alert("Sin datos", "No hay productos para exportar o copiar.");
      return;
    }

    try {
      const jsonString = JSON.stringify(productos, null, 2);
      const baseFileName = "productos.txt";

      await Clipboard.setStringAsync(jsonString);
      console.log("Datos copiados al portapapeles.");

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("No disponible", "La función de compartir no está disponible en tu dispositivo, pero los datos han sido copiados al portapapeles.");
        return;
      }

      const fileUri = FileSystem.cacheDirectory + baseFileName;
      await FileSystem.writeAsStringAsync(fileUri, jsonString);

      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/plain',
        dialogTitle: 'Compartir datos de Productos (JSON)'
      });

      Alert.alert("Éxito", "Datos copiados al portapapeles y listos para compartir.");
      
    } catch (error) {
      console.error("Error al exportar y compartir:", error);
      Alert.alert("Error", "Ocurrió un error al exportar o compartir: " + error.message);
    }
  };
  const indiceDelUltimoElemento = paginaActual * elementosPorPagina;
  const indiceDelPrimerElemento = indiceDelUltimoElemento - elementosPorPagina;
  const productosPaginados = productos.slice(
    indiceDelPrimerElemento,
    indiceDelUltimoElemento
  );

  return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.mainTitle}>Sistema de Gestión</Text>
        <Text style={styles.subtitle}>Productos</Text>
      </View>
      
      {}
      <View style={styles.exportButtonContainer}>
        <Button 
          title="Exportar Datos .txt"
          onPress={exportarYCopiarDatos}
          color="#ff6b35"
        />
      </View>

      <FormularioProductos cargarDatos={cargarDatos} />
      {}
      <TablaProductos 
        productos={productosPaginados} 
        eliminarProducto={eliminarProducto}
        totalElementos={productos.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={setPaginaActual} />
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
  exportButtonContainer: {
    marginHorizontal: 8,
    marginBottom: 15,
  },
});

export default Productos;