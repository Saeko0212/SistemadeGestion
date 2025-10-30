import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  FlatList,
} from 'react-native';
import { db } from '../database/firebaseconfig'; 
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';

const ciudadesRef = collection(db, 'ciudades');



const getActividad1 = async () => {
  console.log('Ejecutando Actividad 1...');
  try {
    const q = query(
      ciudadesRef,
      where('pais', '==', 'Guatemala'),
      orderBy('poblacion', 'desc'),
      limit(2)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('Act 1: No se encontraron documentos.');
      return [];
    }

    const ciudades = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      ciudades.push({ id: doc.id, ...data });
      console.log(`Act 1: ${doc.id} => ${data.nombre}, Población: ${data.poblacion}`);
    });
    return ciudades;

  } catch (error) {
    console.error('Error en Actividad 1: ', error);
    Alert.alert('Error', 'Error en Actividad 1: ' + error.message);
    return [];
  }
};

const getActividad2 = async () => {
  console.log('Ejecutando Actividad 2...');
  try {
    const q = query(
      ciudadesRef,
      where('pais', '==', 'Honduras'),
      where('poblacion', '>', 700),
      orderBy('nombre', 'asc'),
      limit(3)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('Act 2: No se encontraron documentos.');
      return [];
    }
    const ciudades = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      ciudades.push({ id: doc.id, ...data });
      console.log(`Act 2: ${doc.id} => ${data.nombre}, País: ${data.pais}`);
    });
    return ciudades;

  } catch (error) {
    console.error('Error en Actividad 2: ', error);
    Alert.alert('Error', 'Error en Actividad 2: ' + error.message);
    return [];
  }
};

const getActividad3 = async () => {
  console.log('Ejecutando Actividad 3...');
  try {
    const q = query(
      ciudadesRef,
      where('pais', '==', 'El Salvador'),
      orderBy('poblacion', 'asc'),
      limit(2)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('Act 3: No se encontraron documentos.');
      return [];
    }
    const ciudades = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      ciudades.push({ id: doc.id, ...data });
      console.log(`Act 3: ${doc.id} => ${data.nombre}, Población: ${data.poblacion}`);
    });
    return ciudades;

  } catch (error) {
    console.error('Error en Actividad 3: ', error);
    Alert.alert('Error', 'Error en Actividad 3: ' + error.message);
    return [];
  }
};

const getActividad4 = async () => {
  console.log('Ejecutando Actividad 4...');
  try {
    const q = query(
      ciudadesRef,
      where('poblacion', '<=', 300),
      orderBy('pais', 'desc'),
      limit(4)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('Act 4: No se encontraron documentos.');
      return [];
    }
    const ciudades = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      ciudades.push({ id: doc.id, ...data });
      console.log(`Act 4: ${doc.id} => ${data.nombre}, País: ${data.pais}`);
    });
    return ciudades;

  } catch (error) {
    console.error('Error en Actividad 4: ', error);
    Alert.alert('Error', 'Error en Actividad 4: ' + error.message);
    return [];
  }
};

const getActividad5 = async () => {
  console.log('Ejecutando Actividad 5...');
  try {
    const q = query(
      ciudadesRef,
      where('poblacion', '>', 900),
      orderBy('nombre'), 
      limit(3)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('Act 5: No se encontraron documentos.');
      return [];
    }
    const ciudades = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      ciudades.push({ id: doc.id, ...data });
      console.log(`Act 5: ${doc.id} => ${data.nombre}, Población: ${data.poblacion}`);
    });
    return ciudades;

  } catch (error) {
    console.error('Error en Actividad 5: ', error);
    Alert.alert('Error', 'Error en Actividad 5: ' + error.message);
    return [];
  }
};

const getActividad6 = async () => {
  console.log('Ejecutando Actividad 6...');
  try {
    const q = query(
      ciudadesRef,
      where('pais', '==', 'Guatemala'),
      orderBy('poblacion', 'desc'),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('Act 6: No se encontraron documentos.');
      return [];
    }
    const ciudades = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      ciudades.push({ id: doc.id, ...data });
      console.log(`Act 6: ${doc.id} => ${data.nombre}, Población: ${data.poblacion}`);
    });
    return ciudades;

  } catch (error) {
    console.error('Error en Actividad 6: ', error);
    Alert.alert('Error', 'Error en Actividad 6: ' + error.message);
    return [];
  }
};

const getActividad7 = async () => {
  console.log('Ejecutando Actividad 7...');
  try {
    const q = query(
      ciudadesRef,
      where('poblacion', '>=', 200),
      where('poblacion', '<=', 600),
      orderBy('poblacion'), 
      orderBy('pais', 'asc'),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('Act 7: No se encontraron documentos.');
      return [];
    }
    const ciudades = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      ciudades.push({ id: doc.id, ...data });
      console.log(`Act 7: ${doc.id} => ${data.nombre}, País: ${data.pais}, Población: ${data.poblacion}`);
    });
    return ciudades;

  } catch (error) {
    console.error('Error en Actividad 7: ', error);
    Alert.alert('Error', 'Error en Actividad 7: ' + error.message);
    return [];
  }
};

// 8. 5 ciudades con mayor población, ordenadas por región desc.
const getActividad8 = async () => {
  console.log('Ejecutando Actividad 8...');
  try {
    const q = query(
      ciudadesRef,
      orderBy('poblacion', 'desc'),
      orderBy('region', 'desc'),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('Act 8: No se encontraron documentos.');
      return [];
    }
    const ciudades = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      ciudades.push({ id: doc.id, ...data });
      console.log(`Act 8: ${doc.id} => ${data.nombre}, Población: ${data.poblacion}`);
    });
    return ciudades;

  } catch (error) {
    console.error('Error en Actividad 8: ', error);
    Alert.alert('Error', 'Error en Actividad 8: ' + error.message);
    return [];
  }
};


const ActividadesFirestoreScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('');

  const handleQueryPress = async (title, queryFunction) => {
    setCurrentTitle(title);
    setResults([]);
    setModalVisible(true); 
    const data = await queryFunction(); 
    setResults(data); 
  };

  const renderResultItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultTextBold}>{item.nombre} (ID: {item.id})</Text>
      <Text style={styles.resultText}>País: {item.pais}</Text>
      <Text style={styles.resultText}>Población: {item.poblacion}k</Text>
      <Text style={styles.resultText}>Región: {item.region}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Actividades Firestore</Text>
        <Text style={styles.subHeader}>Consultas</Text>

        {}
        <View style={styles.buttonWrapper}>
          <Button title="Ciudades mas pobladas de Guatemala" onPress={() => handleQueryPress('1. 2 ciudades más pobladas de Guatemala', getActividad1)} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Ciudades de hondura poblacion 700k+" onPress={() => handleQueryPress('2.  ciudades de Honduras con población mayor a 700k,', getActividad2)} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Poblacion del salvador" onPress={() => handleQueryPress('3. 2 ciudades salvadoreñas, ordenadas por población ascendente.', getActividad3)} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="ciudades centroamericanas con población menor o igual a 300k" onPress={() => handleQueryPress('4. ciudades centroamericanas con población menor o igual a 300k ordenadas por país descendente limitadas a 4', getActividad4)} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="3 ciudades con población mayor a 900k," onPress={() => handleQueryPress('5. 3 ciudades con población mayor a 900k,', getActividad5)} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="ciudades guatemaltecas" onPress={() => handleQueryPress('6. ciudades guatemaltecas, ordenadas por población descendente,', getActividad6)} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="ciudades con población entre 200 y 600k" onPress={() => handleQueryPress('7. ciudades con población entre 200 y 600k, ordenadas por país ascendente', getActividad7)} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="5 ciudades con mayor población en general," onPress={() => handleQueryPress('8. 5 ciudades con mayor población en general,', getActividad8)} />
        </View>
      </ScrollView>

      {}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{currentTitle}</Text>
            <FlatList
              data={results}
              renderItem={renderResultItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<Text style={styles.resultText}>Cargando o no hay resultados...</Text>}
              style={styles.resultsList}
            />
            <Button
              title="Cerrar"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subHeader: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  buttonWrapper: {
    marginBottom: 12,
    marginHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  resultsList: {
    width: '100%',
  },
  resultItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  resultText: {
    fontSize: 14,
    color: '#444',
  },
  resultTextBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ActividadesFirestoreScreen;