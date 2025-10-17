import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

const FormularioUsuarios = ({ nuevoUsuario, setNuevoUsuario, guardarUsuario, actualizarUsuario, modoEdicion, cargarDatos }) => {
  const handleGuardar = modoEdicion ? actualizarUsuario : guardarUsuario;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{modoEdicion ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</Text>
      </View>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="🏷️ Nombre"
          placeholderTextColor="#8892b0"
          value={nuevoUsuario.nombre}
          onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, nombre: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="📧 Correo"
          placeholderTextColor="#8892b0"
          value={nuevoUsuario.correo}
          onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, correo: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="📞 Teléfono"
          placeholderTextColor="#8892b0"
          value={nuevoUsuario.telefono}
          onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, telefono: text })}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="👤 Edad"
          placeholderTextColor="#8892b0"
          value={nuevoUsuario.edad}
          onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, edad: text })}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleGuardar}>
            <Text style={styles.buttonText}>{modoEdicion ? 'Actualizar' : 'Guardar Usuario'}</Text>
          </TouchableOpacity>
          {modoEdicion && (
            <TouchableOpacity style={styles.cancelButton} onPress={() => {
              setNuevoUsuario({ nombre: '', correo: '', telefono: '', edad: '' });
              modoEdicion(false);  // Cancela edición
            }}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

// Estilos iguales a FormularioProductos
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
  },
  button: {
    backgroundColor: '#e94560',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  cancelButton: {
    backgroundColor: '#ff6b35',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },
});

export default FormularioUsuarios;