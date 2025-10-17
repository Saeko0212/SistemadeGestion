import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BotonEditarUsuario = ({ onPress }) => (
  <TouchableOpacity style={styles.boton} onPress={onPress}>
    <Text style={styles.texto}>Editar</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#667eea',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e94560',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginRight: 5,
  },
  texto: {
    color: 'white',
    fontWeight: '700',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
});

export default BotonEditarUsuario;