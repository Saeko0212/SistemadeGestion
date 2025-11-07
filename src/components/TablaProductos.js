import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BotonEliminarProducto from './BotonEliminarProducto';
import Paginacion from './Paginacion';

const TablaProductos = ({ 
  productos, 
  eliminarProducto,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
}) => {

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 && styles.evenRow]} key={item.id}>
      <Text style={[styles.cell, styles.nameColumn, { color: '#ffffff' }]} numberOfLines={2}>{item.nombre}</Text>
      <View style={[styles.cell, styles.priceColumn]}>
        <Text style={styles.priceText}>${item.precio}</Text>
      </View>
      <View style={[styles.cell, styles.stockColumn]}>
        <Text style={[styles.stockText, 
          item.stock > 10 ? styles.stockHigh : 
          item.stock > 0 ? styles.stockMedium : styles.stockLow
        ]}>
          {item.stock}
        </Text>
      </View>
      <View style={[styles.cell, styles.actionColumn]}>
        <BotonEliminarProducto id={item.id} eliminarProducto={eliminarProducto} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={[styles.cell, styles.headerText, styles.nameColumn]}>Nombre</Text>
          <Text style={[styles.cell, styles.headerText, styles.priceColumn]}>Precio</Text>
          <Text style={[styles.cell, styles.headerText, styles.stockColumn]}>Stock</Text>
          <Text style={[styles.cell, styles.headerText, styles.actionColumn]}>Acciones</Text>
        </View>
        <FlatList
          style={styles.tableBody}
          data={productos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.textoVacio}>No hay productos para mostrar.</Text>}
        />
      </View>
      <Paginacion
        totalElementos={totalElementos}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  nameColumn: { width: 120, color: '#ffffff' },
  priceColumn: { width: 80, alignItems: 'center' },
  stockColumn: { width: 60, alignItems: 'center' },
  actionColumn: { width: 100, alignItems: 'center' },
nameColumn: {
  width: 120,
  color: '#ffffff', // fuerza el blanco
},
  priceText: { fontSize: 10, paddingHorizontal: 8, paddingVertical: 4, color: '#ffffff', backgroundColor: '#ff6b35' }, 
  stockText: { fontSize: 10, paddingHorizontal: 6, paddingVertical: 4, color: '#ffffff' },
  stockHigh: {
    backgroundColor: '#28a745', // Verde para stock alto
  },
  stockMedium: {
    backgroundColor: '#ffc107', // Amarillo para stock medio
  },
  stockLow: {
    backgroundColor: '#dc3545', // Rojo para stock bajo o agotado
  },
  textoVacio: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});


export default TablaProductos;