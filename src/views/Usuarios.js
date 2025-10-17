import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Alert } from 'react-native';
import { db } from '../database/firebaseconfig.js';
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import FormularioUsuarios from '../components/FormularioUsuarios';  // Crea este componente
import TablaUsuarios from '../components/TablaUsuarios';  // Crea este componente

const Usuarios = () => {
  // --- Lógica reintegrada desde el hook ---
  const [usuarios, setUsuarios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', correo: '', telefono: '', edad: '' });

  const cargarDatos = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'usuarios'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      Alert.alert('Error', 'No se pudieron cargar los usuarios.');
    }
  }, []);

  const validarDatos = async (datos) => {
    try {
      const response = await fetch("https://8j8r1phxyi.execute-api.us-east-2.amazonaws.com/validarusuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const resultado = await response.json();

      if (resultado.success) {
        return resultado.data;
      } else {
        Alert.alert("Errores en los datos", resultado.errors.join("\n"));
        return null;
      }
    } catch (error) {
      console.error("Error al validar con Lambda:", error);
      Alert.alert("Error", "No se pudo validar la información con el servidor.");
      return null;
    }
  };

  const guardarUsuario = async () => {
    const datosValidados = await validarDatos(nuevoUsuario);
    if (datosValidados) {
      try {
        await addDoc(collection(db, "usuarios"), {
          nombre: datosValidados.nombre,
          correo: datosValidados.correo,
          telefono: datosValidados.telefono,
          edad: parseInt(datosValidados.edad),
        });
        cargarDatos();
        setNuevoUsuario({ nombre: "", correo: "", telefono: "", edad: "" });
        Alert.alert("Éxito", "Usuario registrado correctamente.");
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        Alert.alert("Error", "No se pudo registrar.");
      }
    }
  };

  const actualizarUsuario = async () => {
    const datosValidados = await validarDatos(nuevoUsuario);
    if (datosValidados) {
      try {
        await updateDoc(doc(db, "usuarios", usuarioId), {
          nombre: datosValidados.nombre,
          correo: datosValidados.correo,
          telefono: datosValidados.telefono,
          edad: parseInt(datosValidados.edad),
        });
        setNuevoUsuario({ nombre: "", correo: "", telefono: "", edad: "" });
        setModoEdicion(false);
        setUsuarioId(null);
        cargarDatos();
        Alert.alert("Éxito", "Usuario actualizado correctamente.");
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        Alert.alert("Error", "No se pudo actualizar.");
      }
    }
  };

  const eliminarUsuario = (id) => {
    Alert.alert('Confirmar', '¿Eliminar este usuario?', [
      { text: 'Cancelar' },
      { text: 'Eliminar', onPress: async () => {
        try {
          await deleteDoc(doc(db, 'usuarios', id));
          cargarDatos();
        } catch (error) {
          console.error('Error al eliminar:', error);
          Alert.alert('Error', 'No se pudo eliminar');
        }
      }}
    ]);
  };

  const editarUsuario = (usuario) => {
    setNuevoUsuario({ ...usuario, edad: usuario.edad.toString() });
    setModoEdicion(true);
    setUsuarioId(usuario.id);
  };

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);
  // --- Fin de la lógica reintegrada ---

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>Sistema de Gestión</Text>
          <Text style={styles.subtitle}>Usuarios</Text>
        </View>
        
        <FormularioUsuarios 
          nuevoUsuario={nuevoUsuario} 
          setNuevoUsuario={setNuevoUsuario} 
          guardarUsuario={guardarUsuario}
          actualizarUsuario={actualizarUsuario}
          modoEdicion={modoEdicion}
          cargarDatos={cargarDatos}
        />
        <TablaUsuarios 
          usuarios={usuarios} 
          eliminarUsuario={eliminarUsuario}
          editarUsuario={editarUsuario}
        />
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

export default Usuarios;