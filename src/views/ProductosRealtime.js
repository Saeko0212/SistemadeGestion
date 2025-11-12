import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from "react-native";
import { ref, set, push, onValue } from "firebase/database";
import { realtimeDB } from "../database/firebaseconfig"; // Ajusta la ruta si es necesario

const ProductosRealtime = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [productosRT, setProductosRT] = useState([]);

  useEffect(() => {
    const referencia = ref(realtimeDB, "productos_rt");
    
    onValue(referencia, (snapshot) => {
      if (snapshot.exists()) {
        const dataObj = snapshot.val();
        const lista = Object.entries(dataObj).map(([id, datos]) => ({
          id,
          ...datos,
        }));
        setProductosRT(lista);
      } else {
        setProductosRT([]);
      }
    });
  }, []);

  const guardarEnRT = async () => {
    if (!nombre || !precio) {
      Alert.alert("Error", "Rellena ambos campos");
      return;
    }

    try {
      const referencia = ref(realtimeDB, "productos_rt");
      const nuevoRef = push(referencia); 

      await set(nuevoRef, {
        nombre,
        precio: Number(precio),
      });

      setNombre("");
      setPrecio("");
      Alert.alert("Éxito", "Producto guardado en Realtime");
    } catch (error) {
      console.log("Error al guardar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Prueba Realtime Database</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre producto"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <Button title="Guardar en Realtime" onPress={guardarEnRT} />

      <Text style={styles.subtitulo}>Productos en RT:</Text>

      {productosRT.length === 0 ? (
        <Text>No hay productos</Text>
      ) : (
        <FlatList 
          data={productosRT}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.itemTexto}>• {item.nombre} - ${item.precio}</Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  subtitulo: { fontSize: 18, marginTop: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#aaa", padding: 8, marginBottom: 10, borderRadius: 5 },
  itemTexto: { fontSize: 16, marginVertical: 2 }
});

export default ProductosRealtime;