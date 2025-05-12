import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import CarnetScreen from '../../screens/CarnetScreen';
import EditScreen from '../../screens/EditScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import NotasScreen from '../../screens/NotasScreen';
import TalleresScreen from '../../screens/TalleresScreen';

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function TopTabs() {
  return (//TopTabs guarda dentro de si
    //Notas y Talleres que se generan aleatoriamente desde DataContext
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#1e1e1e' },
        tabBarActiveTintColor: '#fff',
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#fff' },
      }}
    >
      <TopTab.Screen name="Notas" component={NotasScreen} />
      <TopTab.Screen name="Talleres" component={TalleresScreen} />
    </TopTab.Navigator>
  );
}

export default function Tabs() {
  return (// en bottomtabs se guardan los accesos 
    // mas generales para navegar la app
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1e1e1e', borderTopWidth: 0 },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Carnet':
              iconName = 'card';
              break;
            case 'Editar':
              iconName = 'create';
              break;
            case 'Más':
              iconName = 'apps';
              break;
            case 'Configuración':
              iconName = 'settings';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen name="Carnet" component={CarnetScreen} />
      <BottomTab.Screen name="Editar" component={EditScreen} />
      <BottomTab.Screen name="Más" component={TopTabs} />
      <BottomTab.Screen name="Configuración" component={SettingsScreen} />
    </BottomTab.Navigator>
  );
}
