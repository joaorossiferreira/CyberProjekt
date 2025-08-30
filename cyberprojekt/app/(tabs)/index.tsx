import React, { useEffect } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';

export default function Home() {
  const [fontsLoaded] = useFonts({
    Cyberpunk: require('../../assets/fonts/Cyberpunk.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>cyberprojekt</Text>
      <Link href="/explore" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontFamily: 'Cyberpunk',
    fontSize: 48,
    color: '#FFEB3B',
    textShadowColor: '#FF5722',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFEB3B',
  },
  buttonText: {
    fontFamily: 'Cyberpunk',
    color: '#000',
    fontSize: 24,
  },
});