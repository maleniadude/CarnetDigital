import React, { useContext } from 'react';
// AuthProvider: Provee acceso global al usuario actual 
// y funciones de autenticación (login, registro, logout).
import { AuthProvider, AuthContext } from './context/AuthContext';
// DataProvider: Provee acceso a datos simulados como notas y talleres.
import { DataProvider } from './context/DataContext';
// Navigation: Componente que gestiona 
// las pantallas de la app (por ejemplo, login, perfil, etc.).
import Navigation from './components/Navigation';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Navigation />
      </DataProvider>
    </AuthProvider>
  );
}