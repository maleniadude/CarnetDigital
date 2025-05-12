import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Switch,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

export default function SettingsScreen() {
    //Usamos AuthContext para acceder a la función logout
    const { logout } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // useEffect, se carga el valor guardado de notificaciones al iniciar la pantalla
    useEffect(() => {
        (async () => {
            try {
                const storedValue = await AsyncStorage.getItem('notificationsEnabled');
                if (storedValue !== null) {
                setNotificationsEnabled(JSON.parse(storedValue));
                }
            } catch (err) {
                console.warn('Error al cargar la configuración:', err);
            }
        })();
    }, []);

    // toggleNotifications: para cambiar el estado y guarda el nuevo valor en AsyncStorage.  
    const toggleNotifications = async (value) => {
        try {
            setNotificationsEnabled(value);
            await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(value));
        } catch (err) {
            console.warn('Error al guardar la configuración:', err);
        }
    };

    // confirmLogout: muestra un Alert para confirmar antes de cerrar sesión.
    const confirmLogout = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de que deseas cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Cerrar sesión', style: 'destructive', onPress: logout },
            ]
        );
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.option} onPress={() => setModalVisible(true)}>
          <Text style={styles.optionText}>Notificaciones</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutWrapper}>
        <Button title="Cerrar sesión" onPress={logout} />
      </View>

      {/* Modal de configuración de notificaciones */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Notificaciones</Text>
            <View style={styles.modalContent}>
              <Text style={styles.modalLabel}>Activar notificaciones</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
                trackColor={{ false: '#555', true: '#555' }}
                thumbColor="#fff"
              />
            </View>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 26,
        color: '#fff',
        fontWeight: '700',
        marginBottom: 24,
    },
    card: {
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    option: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#2c2c2c',
    },
    optionText: {
        color: '#ddd',
        fontSize: 16,
    },
    logoutWrapper: {
        marginTop: 40,
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 10,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        padding: 24,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalLabel: {
        color: '#ccc',
        fontSize: 16,
    },
    closeModalButton: {
        backgroundColor: '#333',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeModalText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
    },
});
