import React from 'react';
import { CyberpunkEffect } from '../components/CyberpunkEffect';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  const handleStartPress = () => {
    // Navegar para a tela de exploração
    router.push('/(tabs)/explore');
  };

  return <CyberpunkEffect onStartPress={handleStartPress} />;
}