import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ListaProductos = ({ productos }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.nombre}</Text>
        <Text style={styles.productPrice}>${item.precio}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Productos</Text>
      </View>
      
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
    margin: 8,
    borderWidth: 1.5,
    borderColor: '#533483',
    shadowColor: '#533483',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  header: {
    backgroundColor: '#533483',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1.5,
    borderBottomColor: '#ff6b35',
  },
  title: { fontSize: 16, fontWeight: '800', color: '#fff', textAlign: 'center', letterSpacing: 1 },
  listContent: { padding: 12 },
  item: {
    backgroundColor: '#1a1a2e',
    padding: 12,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#ff6b35',
    borderBottomWidth: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: { fontSize: 14, fontWeight: '700', color: '#fff', textTransform: 'uppercase' },
  productPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f0f23',
    backgroundColor: '#ff6b35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
});


export default ListaProductos;