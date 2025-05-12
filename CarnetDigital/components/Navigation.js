import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../context/AuthContext';

import Tabs from './nav/Tabs';
import LoginScreen from '../screens/registration/LoginScreen';
import RegisterScreen from '../screens/registration/RegisterScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
    return ( //aqui guardamos los accesos a login y register,
        //que se mostraran al abrir la app si no hay usuario previamente ingresado
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}

function AppStack() {
    return (//tabs se va a encargar de guardar los accesos 
        //que estan despues de pasar login o register
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Tabs} />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    const { user } = useContext(AuthContext);
    //Navigation se encargara de comprobar
    //si se ha ingresado previamente con un usuario 
    //que haya sido guardado en AsyncStorage
    //sino se manda a register

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
