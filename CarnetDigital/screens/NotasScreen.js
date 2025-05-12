import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useData } from '../context/DataContext';

const { width } = Dimensions.get('window');

export default function NotasScreen() {
  const { notas } = useData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Notas del Estudiante</Text>

        {notas.map((nota, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{nota.materia}</Text>
            <Text style={styles.cardSubtitle}>Nota: {nota.nota}</Text>
            <Text style={styles.cardSubtitle}>Estado: {nota.estado}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121212',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        maxWidth: '90%',
    },
    card: {
        backgroundColor: '#1e1e1e',
        padding: width < 360 ? 12 : 16,
        borderRadius: 12,
        marginBottom: 16,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    cardSubtitle: {
        color: '#aaa',
        fontSize: 14,
        marginTop: 4,
    },
});
