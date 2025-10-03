import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import BotonEliminarPromedio from './BotonEliminarPromedio';  // Usa el botón adaptado para edades

const TablaPromedio = ({ edades, eliminarEdad }) => {
  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerText, styles.nameColumn]}>Nombre</Text>
        <Text style={[styles.cell, styles.headerText, styles.ageColumn]}>Edad</Text>
        <Text style={[styles.cell, styles.headerText, styles.actionColumn]}>Acciones</Text>
      </View>

      <ScrollView style={styles.tableBody} showsVerticalScrollIndicator={false}>
        {edades.map((edad, index) => (
          <View style={[styles.row, index % 2 === 0 && styles.evenRow]} key={edad.id}>
            <Text style={[styles.cell, styles.nameColumn, { color: '#ffffff' }]} numberOfLines={2}>{edad.nombre}</Text>
            <View style={[styles.cell, styles.ageColumn]}>
              <Text style={styles.ageText}>{edad.edad} años</Text>
            </View>
            <View style={[styles.cell, styles.actionColumn]}>
              <BotonEliminarPromedio id={edad.id} eliminarEdad={eliminarEdad} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    margin: 8,
    borderWidth: 2,
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
    flex: 1,
  },
  header: { paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: 2, borderBottomColor: '#e94560' },
  title: { fontSize: 16, fontWeight: '800', color: '#fff', textAlign: 'center', letterSpacing: 1.2 },
  table: { minWidth: 600 },
  headerRow: { flexDirection: 'row', backgroundColor: '#533483', paddingVertical: 10, borderBottomWidth: 2 },
  tableBody: { maxHeight: 300, backgroundColor: '#1a1a2e' },
  row: { flexDirection: 'row', borderBottomWidth: 1.5, borderBottomColor: '#533483', paddingVertical: 10 },
  evenRow: { backgroundColor: '#0f0f23' },
  cell: { paddingHorizontal: 10, paddingVertical: 6, fontSize: 12 },
  headerText: { fontSize: 12, fontWeight: '800', textAlign: 'center', letterSpacing: 0.8 },
  nameColumn: { width: 120 },
  ageColumn: { width: 80, alignItems: 'center' },  // Nueva columna para edad (reemplaza priceColumn)
  actionColumn: { width: 100, alignItems: 'center' },
  nameColumn: {
    width: 120,
    color: '#ffffff', // fuerza el blanco
  },
  ageText: { fontSize: 10, paddingHorizontal: 8, paddingVertical: 4, color: '#ffffff', backgroundColor: '#ff6b35' },  // Adaptado de priceText para edad
});

export default TablaPromedio; 