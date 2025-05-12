import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';

export default function EditScreen() {
  // useContext(AuthContext)
  // Obtiene el usuario actual (user) y la función updateProfile desde el contexto de autenticación.
  const { user, updateProfile } = useContext(AuthContext);

  const [form, setForm] = useState({
    nombre: '',
    carrera: '',
    correo: '',
    password: '',
    foto: '',
  });

  const [loading, setLoading] = useState(false);

  // useEffect(() => { ... }, [user])
  // Carga los datos del usuario al iniciar la pantalla y los coloca en el estado form.
  useEffect(() => {
    if (user) {
      setForm({
        nombre: user.nombre || '',
        carrera: user.carrera || '',
        correo: user.correo || user.email || '',
        password: user.password || '',
        foto: user.foto || '',
      });
    }
  }, [user]);

  // handleChange(name, value)
  // Actualiza dinámicamente los campos del formulario (nombre, carrera, etc.) al escribir.
  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  // pickImage()
  // Solicita permisos para acceder a la galería. 
  // Si el usuario selecciona una imagen, actualiza el campo foto en el formulario 
  // y llama a updateProfile para guardar la nueva foto.
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
      setForm((prev) => ({ ...prev, foto: selectedUri }));
      updateProfile({ ...user, foto: selectedUri });
    }
  };

  // handleSave()
  // Verifica que los campos obligatorios estén completos, y si es así,
  // llama a updateProfile para guardar los cambios. Muestra un Alert si hay error o éxito.
  const handleSave = async () => {
    if (!form.nombre || !form.correo || !form.carrera) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    try {
      setLoading(true);
      await updateProfile(form);
      Alert.alert('Perfil actualizado correctamente');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar el perfil. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      {form.foto ? (
        <Image source={{ uri: form.foto }} style={styles.profileImage} />
      ) : null}

      <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
            <Text style={styles.photoButtonText}>Seleccionar Foto de Perfil</Text>
      </TouchableOpacity>

      <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
            style={styles.input}
            value={form.nombre}
            onChangeText={(text) => handleChange('nombre', text)}
            placeholder="Nombre completo"
            placeholderTextColor="#777"
            />
      </View>

      <View style={styles.formGroup}>
            <Text style={styles.label}>Carrera</Text>
            <TextInput
            style={styles.input}
            value={form.carrera}
            onChangeText={(text) => handleChange('carrera', text)}
            placeholder="Carrera universitaria"
            placeholderTextColor="#777"
            />
      </View>

      <View style={styles.formGroup}>
            <Text style={styles.label}>Correo</Text>
            <TextInput
            style={styles.input}
            value={form.correo}
            onChangeText={(text) => handleChange('correo', text)}
            placeholder="ejemplo@correo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#777"
            />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
            <Text style={styles.buttonText}>
            {loading ? 'Guardando...' : 'Guardar cambios'}
            </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 24,
    flexGrow: 1,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2c2c2c',
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
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
