// src/database/firebaseconfig.js

import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database"; // 1. Importar getDatabase
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence, browserLocalPersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL, // 2. Añade la URL de Realtime Database
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- INICIO DE LA CORRECCIÓN ---

// Inicializar Auth con persistencia condicional
// Esto soluciona el error en la web
const auth = initializeAuth(app, {
  persistence: Platform.OS === 'web'
    ? browserLocalPersistence  // Usar persistencia del navegador para la web
    : getReactNativePersistence(AsyncStorage) // Usar AsyncStorage para nativo
});

// 3. Inicializar y exportar Realtime Database
const realtimeDB = getDatabase(app);

// --- FIN DE LA CORRECCIÓN ---

export { db, auth, realtimeDB };
