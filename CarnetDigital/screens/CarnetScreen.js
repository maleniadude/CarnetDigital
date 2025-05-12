import React, { useContext, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 360;

const CarnetScreen = () => {
  const { user } = useContext(AuthContext);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const flipToBack = () => {
    Animated.timing(flipAnim, {
      toValue: 180,
      duration: 600,
      useNativeDriver: true,
    }).start(() => setFlipped(true));
  };

  const flipToFront = () => {
    Animated.timing(flipAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start(() => setFlipped(false));
  };

  const handleFlip = () => {
    flipped ? flipToFront() : flipToBack();
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  if (!user || Object.keys(user).length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'white' }}>No hay datos del usuario.</Text>
      </SafeAreaView>
    );
  }

  const qrValue = `Nombre: ${user.nombre}\nMatrícula: ${user.matricula}\nCorreo: ${user.email}`;

  return (
    <TouchableWithoutFeedback onPress={handleFlip} accessible accessibilityLabel="Flip card">
      <SafeAreaView style={styles.container}>
        <View style={styles.flipCardWrapper}>
          <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]}>
            <Text style={styles.institution}>Universidad Soledad</Text>
            <Image source={{ uri: user.foto || user.photo }} style={styles.photo} />
            <Text style={styles.name}>{user.nombre}</Text>
            <Text style={styles.subText}>Matrícula: {user.matricula}</Text>
            <Text style={styles.subText}>{user.carrera}</Text>
          </Animated.View>

          <Animated.View
            style={[styles.card, styles.cardBack, backAnimatedStyle, { position: 'absolute', top: 0 }]}>
            <Text style={styles.qrTitle}>Código QR</Text>
            <QRCode value={qrValue} size={100} />
            <Text style={styles.subText}>Correo: {user.email}</Text>
            <Text style={styles.subText}>Ingreso: {user.fechaIngreso}</Text>
            <Text style={styles.subText}>Este carnet es personal e intransferible</Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipCardWrapper: {
    width: width * 0.9,
    height: height * 0.5,
    perspective: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#1e1e1e',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: isSmallDevice ? 10 : 20,
  },
  cardFront: {
    zIndex: 2,
  },
  cardBack: {
    backfaceVisibility: 'hidden',
  },
  institution: {
    fontSize: isSmallDevice ? 16 : 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  photo: {
    width: isSmallDevice ? 70 : 90,
    height: isSmallDevice ? 70 : 90,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  subText: {
    color: '#aaa',
    fontSize: isSmallDevice ? 12 : 14,
    textAlign: 'center',
    marginVertical: 2,
  },
  qrTitle: {
    color: '#fff',
    fontSize: isSmallDevice ? 14 : 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
});

export default CarnetScreen;
