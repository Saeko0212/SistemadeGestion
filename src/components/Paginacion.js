import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Paginacion = ({
  paginaActual,
  establecerPaginaActual,
  totalElementos,
  elementosPorPagina,
}) => {
  // Calculamos el número total de páginas
  const totalPaginas = Math.ceil(totalElementos / elementosPorPagina);

  // Si no hay suficientes elementos para paginar, no mostramos nada
  if (totalPaginas <= 1) {
    return null;
  }

  // Funciones para navegar entre páginas
  const irPaginaAnterior = () => {
    if (paginaActual > 1) {
      establecerPaginaActual(paginaActual - 1);
    }
  };

  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      establecerPaginaActual(paginaActual + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={irPaginaAnterior}
        disabled={paginaActual === 1}
        style={[styles.boton, paginaActual === 1 && styles.botonDeshabilitado]}>
        <Text style={styles.textoBoton}>Anterior</Text>
      </Pressable>

      <Text style={styles.textoPagina}>
        Página {paginaActual} de {totalPaginas}
      </Text>

      <Pressable
        onPress={irPaginaSiguiente}
        disabled={paginaActual === totalPaginas}
        style={[
          styles.boton,
          paginaActual === totalPaginas && styles.botonDeshabilitado,
        ]}>
        <Text style={styles.textoBoton}>Siguiente</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa', // Un color de fondo sutil
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  boton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 5,
  },
  botonDeshabilitado: {
    backgroundColor: '#9e9e9e',
    opacity: 0.7,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textoPagina: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default Paginacion;
