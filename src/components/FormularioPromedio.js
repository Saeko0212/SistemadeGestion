import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { db } from '../database/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';

const FormularioPromedio = ({ cargarDatos }) => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');

  const guardarEdad = async () => {
    try {
      await addDoc(collection(db, 'edades'), {  // Colección 'edades' para la práctica
        nombre: nombre,
        edad: parseInt(edad),
      });
      alert('Edad agregada con éxito');
      setNombre('');
      setEdad('');
      cargarDatos();  // Recarga datos y recalcula promedio vía AWS (flujo fetch del PDF)
    } catch (error) {
      alert('Error al registrar la edad:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agregar Nueva Edad</Text>
      </View>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="🏷️ Nombre"
          placeholderTextColor="#8892b0"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="👤 Edad"
          placeholderTextColor="#8892b0"
          value={edad}
          onChangeText={setEdad}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <Button title="💾 GUARDAR EDAD" onPress={guardarEdad} color="#e94560" />
        </View>
      </View>
    </View>
  );
};

// Estilos iguales al original (reducidos paddings, fonts y márgenes)
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

export default FormularioPromedio;