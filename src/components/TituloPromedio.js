import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TituloPromedio = ({ promedio = null }) => {
  const promedioNum = promedio != null ? Number(promedio) : null;
  const esNumeroValido = !isNaN(promedioNum) && promedioNum !== null;

  return (
    <Text style={styles.titulo}>
      {esNumeroValido 
        ? `Promedio: ${promedioNum.toFixed(2)}` 
        : 'Sin datos para calcular promedio'
      }
    </Text>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default TituloPromedio;