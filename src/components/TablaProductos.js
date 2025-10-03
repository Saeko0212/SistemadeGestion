import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import BotonEliminarProducto from './BotonEliminarProducto';

const TablaProductos = ({ productos, eliminarProducto }) => {
  return (
<View style={styles.table}>
  <View style={styles.headerRow}>
    <Text style={[styles.cell, styles.headerText, styles.nameColumn]}>Nombre</Text>
    <Text style={[styles.cell, styles.headerText, styles.priceColumn]}>Precio</Text>
    <Text style={[styles.cell, styles.headerText, styles.stockColumn]}>Stock</Text>
    <Text style={[styles.cell, styles.headerText, styles.actionColumn]}>Acciones</Text>
  </View>

  <ScrollView style={styles.tableBody} showsVerticalScrollIndicator={false}>
    {productos.map((producto, index) => (
      <View style={[styles.row, index % 2 === 0 && styles.evenRow]} key={producto.id}>
        <Text style={[styles.cell, styles.nameColumn, { color: '#ffffff' }]} numberOfLines={2}>{producto.nombre}</Text>
        <View style={[styles.cell, styles.priceColumn]}>
          <Text style={styles.priceText}>${producto.precio}</Text>
        </View>
        <View style={[styles.cell, styles.stockColumn]}>
          <Text style={[styles.stockText, 
            producto.stock > 10 ? styles.stockHigh : 
            producto.stock > 0 ? styles.stockMedium : styles.stockLow
          ]}>
            {producto.stock}
          </Text>
        </View>
        <View style={[styles.cell, styles.actionColumn]}>
          <BotonEliminarProducto id={producto.id} eliminarProducto={eliminarProducto} />
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
  priceColumn: { width: 80, alignItems: 'center' },
  stockColumn: { width: 60, alignItems: 'center' },
  actionColumn: { width: 100, alignItems: 'center' },
nameColumn: {
  width: 120,
  color: '#ffffff', // fuerza el blanco
},

priceText: { fontSize: 10, paddingHorizontal: 8, paddingVertical: 4, color: '#ffffff', backgroundColor: '#ff6b35' }, // blanco
  stockText: { fontSize: 10, paddingHorizontal: 6, paddingVertical: 4, color: '#ffffff' }, // blanco
});


export default TablaProductos;