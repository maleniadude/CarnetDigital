import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';  // Importamos ImagePicker
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { register } = useContext(AuthContext);

  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [foto, setFoto] = useState(null); // Nuevo estado para la foto

  const generateMatricula = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso denegado para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setFoto(selectedUri);  // Actualizamos el estado de la foto
    }
  };

  const handleRegister = () => {
    if (!nombre || !carrera || !email || !direccion || !password) {
      Alert.alert('Todos los campos son obligatorios.');
      return;
    }

    if (!isEmailValid(email)) {
      Alert.alert('Correo electrónico no válido.');
      return;
    }

    const matricula = generateMatricula();
    const fechaIngreso = new Date().toLocaleDateString();

    const newUser = {
      nombre,
      carrera,
      email,
      direccion,
      password,
      fechaIngreso,
      matricula,
      photo: foto || 'https://i.pravatar.cc/150?img=13', // Usamos la foto seleccionada o la predeterminada
    };

    register(newUser);
  };

  const isDisabled = !nombre || !carrera || !email || !direccion || !password;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>

      {/* Imagen de perfil */}
      {foto && <Image source={{ uri: foto }} style={styles.profileImage} />}
      
      <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
        <Text style={styles.photoButtonText}>Seleccionar Foto de Perfil</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Nombre completo"
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Carrera"
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={setCarrera}
      />
      <TextInput
        placeholder="Correo"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Dirección"
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={setDireccion}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, isDisabled && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 12,
  },
  photoButton: {
    alignSelf: 'center',
    marginBottom: 24,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  photoButtonText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#3d3d3d',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#4DB8FF',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
});
