import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BotonEliminarProducto = ({ id, eliminarProducto }) => {
  const handleDelete = () => eliminarProducto(id);

  return (
    <TouchableOpacity style={styles.boton} onPress={handleDelete}>
      <Text style={styles.texto}>Eliminar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#ff6b35',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ff4500',
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  texto: {
    color: 'white',
    fontWeight: '700',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
});

export default BotonEliminarProducto;
