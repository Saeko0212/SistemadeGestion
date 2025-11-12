import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from "react-native";
import { ref, set, push, onValue } from "firebase/database";
import { realtimeDB } from "../database/firebaseconfig";

const CalculoIMC = () => {
  const [nombre, setNombre] = useState("");
  const [peso, setPeso] = useState(""); 
  const [altura, setAltura] = useState(""); 
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const referencia = ref(realtimeDB, "registros_imc");
    onValue(referencia, (snapshot) => {
      if (snapshot.exists()) {
        const dataObj = snapshot.val();
        const lista = Object.entries(dataObj).map(([id, datos]) => ({
          id,
          ...datos,
        }));
        setRegistros(lista);
      } else {
        setRegistros([]);
      }
    });
  }, []);

  const calcularYGuardar = async () => {
    if (!nombre || !peso || !altura) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    
    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    const imcRedondeado = imcCalculado.toFixed(2);

    let estado = "";
    if (imcCalculado < 18.5) estado = "Bajo peso";
    else if (imcCalculado < 24.9) estado = "Peso normal";
    else if (imcCalculado < 29.9) estado = "Sobrepeso";
    else estado = "Obesidad";

    try {
      const referencia = ref(realtimeDB, "registros_imc");
      const nuevoRef = push(referencia);

      await set(nuevoRef, {
        nombre,
        peso: pesoNum,
        altura: alturaNum,
        imc: imcRedondeado,
        estado,
        fecha: new Date().toLocaleString()
      });

      setNombre("");
      setPeso("");
      setAltura("");
      Alert.alert("Resultado", `Tu IMC es ${imcRedondeado} (${estado})`);
    } catch (error) {
      console.log("Error al guardar IMC:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora IMC (Realtime)</Text>

      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Peso (kg)" keyboardType="numeric" value={peso} onChangeText={setPeso} />
      <TextInput style={styles.input} placeholder="Altura (m, ej: 1.70)" keyboardType="numeric" value={altura} onChangeText={setAltura} />

      <Button title="Calcular y Registrar" onPress={calcularYGuardar} color="#841584" />

      <Text style={styles.subtitulo}>Historial de Registros:</Text>

      <FlatList 
        data={registros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nombre}</Text>
            <Text>IMC: {item.imc} - {item.estado}</Text>
            <Text style={styles.fecha}>{item.fecha}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" },
  subtitulo: { fontSize: 18, marginTop: 20, fontWeight: "bold", marginBottom: 10 },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", padding: 10, marginBottom: 10, borderRadius: 8 },
  card: { backgroundColor: "#fff", padding: 15, marginVertical: 5, borderRadius: 8, elevation: 2 },
  cardTitle: { fontWeight: "bold", fontSize: 16 },
  fecha: { fontSize: 12, color: "#666", marginTop: 5 }
});

export default CalculoIMC;