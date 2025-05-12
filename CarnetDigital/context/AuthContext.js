import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // useEffect para cargar usuario:
    // al iniciar la app, intenta cargar un usuario guardado en AsyncStorage
    // y lo establece en el estado user.

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                setUser(JSON.parse(storedUser)); // Aquí es donde usamos setUser
                }
            } catch (error) {
                console.error('Error al cargar usuario:', error);
            }
        };

        loadUser();
    }, []);

    // register:
    // guarda el nuevo usuario en la lista de usuarios (users).
    // inicia sesión automáticamente guardándolo como user actual.

    const register = async (newUser) => {
        try {
            const storedUsers = await AsyncStorage.getItem('users');
            const users = storedUsers ? JSON.parse(storedUsers) : [];

            const updatedUsers = [...users, newUser];
            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            await AsyncStorage.setItem('user', JSON.stringify(newUser)); // para mantener la sesión activa
            setUser(newUser);
        } catch (error) {
            Alert.alert('Error al registrar usuario');
        }
    };

    // login:
    // verifica si el usuario con esa matrícula y contraseña existe.
    // si es correcto, guarda ese usuario como sesión activa (user).

    const login = async ({ matricula, password }) => {
        try {
            const storedUsers = await AsyncStorage.getItem('users');
            if (!storedUsers) {
                throw new Error('No hay usuarios registrados');
            }

            const users = JSON.parse(storedUsers);
            const foundUser = users.find(
                (u) => u.matricula === matricula && u.password === password
            );

            if (foundUser) {
                await AsyncStorage.setItem('user', JSON.stringify(foundUser));
                setUser(foundUser);
                return true;
            } else {
                throw new Error('Matrícula o contraseña incorrecta');
            }
        } catch (error) {
            throw error; // Lanza el error
        }
    };

    // logout():
    // elimina el usuario actual de AsyncStorage y limpia el estado user.

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
            console.log('Sesión cerrada');
        } catch (error) {
            Alert.alert('Error al cerrar sesión');
        }
    };

    // updateProfile(updatedData):
    // actualiza los datos del usuario tanto en la lista de usuarios 
    // como en la sesión activa.

    const updateProfile = async (updatedData) => {
        try {
            const storedUsers = await AsyncStorage.getItem('users');
            let users = storedUsers ? JSON.parse(storedUsers) : [];

            const updatedUsers = users.map((u) =>
                u.matricula === user.matricula ? { ...u, ...updatedData } : u
            );

            const updatedUser = { ...user, ...updatedData };

            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (error) {
            Alert.alert('Error al actualizar perfil');
            console.error('updateProfile error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
