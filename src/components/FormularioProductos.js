import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { db } from '../database/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';

const FormularioProductos = ({ cargarDatos }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stock, setStock] = useState('');

  const guardarProducto = async () => {
    try {
      await addDoc(collection(db, 'productos'), {
        nombre: nombre,
        precio: parseFloat(precio),
        descripcion: descripcion,
        stock: parseInt(stock),
      });
      alert('Producto agregado con éxito');
      setNombre('');
      setPrecio('');
      setDescripcion('');
      setStock('');
      cargarDatos();
    } catch (error) {
      alert('Error al registrar el producto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agregar Nuevo Producto</Text>
      </View>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="🏷️ Nombre del producto"
          placeholderTextColor="#8892b0"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="💰 Precio"
          placeholderTextColor="#8892b0"
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="📦 Stock"
          placeholderTextColor="#8892b0"
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <Button title="💾 GUARDAR PRODUCTO" onPress={guardarProducto} color="#e94560" />
        </View>
      </View>
    </View>
  );
};

// Reducimos paddings, fonts y margenes
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    margin: 8,
    borderWidth: 2,
    borderColor: '#16213e',
    shadowColor: '#0f3460',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
  header: {
    backgroundColor: '#667eea',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#e94560',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  formContainer: {
    padding: 15,
    backgroundColor: '#16213e',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#e94560',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
});


export default FormularioProductos;