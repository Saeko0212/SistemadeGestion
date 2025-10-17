import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import BotonEditarUsuario from './BotonEditarUsuario';  // Crea este
import BotonEliminarUsuario from './BotonEliminarUsuario';  // Crea este

const TablaUsuarios = ({ usuarios, eliminarUsuario, editarUsuario }) => {
  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerText, styles.nameColumn]}>Nombre</Text>
        <Text style={[styles.cell, styles.headerText, styles.emailColumn]}>Correo</Text>
        <Text style={[styles.cell, styles.headerText, styles.phoneColumn]}>Teléfono</Text>
        <Text style={[styles.cell, styles.headerText, styles.ageColumn]}>Edad</Text>
        <Text style={[styles.cell, styles.headerText, styles.actionColumn]}>Acciones</Text>
      </View>

      <ScrollView style={styles.tableBody} showsVerticalScrollIndicator={false}>
        {usuarios.map((usuario, index) => (
          <View style={[styles.row, index % 2 === 0 && styles.evenRow]} key={usuario.id}>
            <Text style={[styles.cell, styles.nameColumn, { color: '#ffffff' }]} numberOfLines={1}>{usuario.nombre}</Text>
            <Text style={[styles.cell, styles.emailColumn, { color: '#ffffff' }]} numberOfLines={1}>{usuario.correo}</Text>
            <Text style={[styles.cell, styles.phoneColumn, { color: '#ffffff' }]} numberOfLines={1}>{usuario.telefono}</Text>
            <View style={[styles.cell, styles.ageColumn]}>
              <Text style={styles.ageText}>{usuario.edad} años</Text>
            </View>
            <View style={[styles.cell, styles.actionColumn]}>
              <BotonEditarUsuario onPress={() => editarUsuario(usuario)} />
              <BotonEliminarUsuario id={usuario.id} eliminarUsuario={eliminarUsuario} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Estilos adaptados (agregué columnas para correo/telefono/edad)
const styles = StyleSheet.create({
  table: { minWidth: 600 },
  headerRow: { flexDirection: 'row', backgroundColor: '#533483', paddingVertical: 10, borderBottomWidth: 2 },
  tableBody: { maxHeight: 300, backgroundColor: '#1a1a2e' },
  row: { flexDirection: 'row', borderBottomWidth: 1.5, borderBottomColor: '#533483', paddingVertical: 10 },
  evenRow: { backgroundColor: '#0f0f23' },
  cell: { paddingHorizontal: 10, paddingVertical: 6, fontSize: 12 },
  headerText: { fontSize: 12, fontWeight: '800', textAlign: 'center', letterSpacing: 0.8, color: '#ffffff' },
  nameColumn: { width: 100 },
  emailColumn: { width: 120 },
  phoneColumn: { width: 100 },
  ageColumn: { width: 80, alignItems: 'center' },
  actionColumn: { width: 120, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' },
  ageText: { fontSize: 10, paddingHorizontal: 8, paddingVertical: 4, color: '#ffffff', backgroundColor: '#ff6b35' },
});

export default TablaUsuarios;