import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Animated, Easing, Text } from 'react-native';
import MapComponent from '../../components/MapComponent';
import MissionScreen from '../../components/MissionScreen';
import MenuModal from '../../components/MenuModal';
import OptionModal from '../../components/OptionModal';
import { getUserLocation } from '../../services/location';
import { generateRandomItems, saveItems, loadItems } from '../../services/map';
import { Coords, Item } from '../../types';
import { useAudio } from '../../components/AudioManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';

const BASE_URL = 'https://backend-psi-fawn-77.vercel.app';

export default function Explore() {
  const { openMenu } = useLocalSearchParams();
  const [userLocation, setUserLocation] = useState<Coords | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [missionScreenVisible, setMissionScreenVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastAnim = useRef(new Animated.Value(0)).current;
  const musicInitialized = useRef(false);
  const { playUISound, playBackgroundMusic, stopBackgroundMusic } = useAudio();

  useEffect(() => {
    async function fetchLocationAndPlayMusic() {
      try {
        console.log('explore.tsx: Montando tela e tocando música...');
        const location = await getUserLocation();
        setUserLocation(location);
        if (location) {
          const generatedItems = generateRandomItems(location, 5, items);
          console.log('explore.tsx: Items gerados:', generatedItems.length);
          setItems(generatedItems);
          await saveItems(generatedItems);
        } else {
          const cachedItems = await loadItems();
          console.log('explore.tsx: Items do cache:', cachedItems.length);
          setItems(cachedItems);
        }

        // Só toca a música se não foi inicializada ainda
        if (!musicInitialized.current) {
          try {
            await stopBackgroundMusic();
            await playBackgroundMusic(require('../../assets/songs/map-theme.mp3'));
            console.log('explore.tsx: Música do mapa iniciada');
            musicInitialized.current = true;
          } catch (error) {
            console.error('Erro ao tocar música do mapa:', error);
          }
        }

        const token = await AsyncStorage.getItem('userToken');
        console.log('explore.tsx: Token inicial:', token);
      } catch (error) {
        console.error('❌ ERRO NO EXPLORE:', error);
      }
    }
    fetchLocationAndPlayMusic();

    return () => {
      console.log('explore.tsx: Desmontando tela, resetando estado...');
      // NÃO para a música no unmount, deixa tocando
      setOptionModalVisible(false);
      setSelectedOption(null);
    };
  }, []);

  useEffect(() => {
    if (openMenu) {
      setMenuVisible(true);
    }
  }, [openMenu]);

  useEffect(() => {
    if (!userLocation) return;
    const interval = setInterval(async () => {
      if (items.length < 6) {
        const newItems = generateRandomItems(userLocation, 1, items);
        setItems((prev) => [...prev, ...newItems]);
        await saveItems([...items, ...newItems]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [userLocation, items]);

  const handleItemClick = async (item: Item) => {
    await playUISound();
    setSelectedItem(item);
    setMissionScreenVisible(true);
  };

  const handleMissionComplete = async (itemId: string) => {
    await playUISound(require('../../assets/sounds/success.mp3'));
    console.log('explore.tsx: Removendo item:', itemId);
    const completedItem = items.find(item => item.id === itemId);
    if (completedItem && completedItem.mission) {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('explore.tsx: Token para update-progress:', token);
        if (!token) {
          console.warn('explore.tsx: Usuário não logado, progresso não enviado');
          showToastNotification('Missão concluída, mas conecte-se para salvar progresso!');
        } else {
          const boostedXP = completedItem.mission.xp * 2; // Dobrar XP para nivelamento mais rápido
          console.log(`explore.tsx: Enviando ${boostedXP} XP e ${completedItem.mission.gold} gold`);
          const response = await fetch(`${BASE_URL}/update-progress`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              exp: boostedXP,
              gold: completedItem.mission.gold,
            }),
          });
          if (response.ok) {
            const data = await response.json();
            console.log('explore.tsx: Progresso atualizado:', data);
            showToastNotification(`+${boostedXP} XP! Nível: ${data.level} • +${completedItem.mission.gold} ₵! Total: ${data.gold}`);
          } else {
            console.error('explore.tsx: Erro ao enviar progresso:', response.status);
            showToastNotification('Erro ao salvar progresso. Tente novamente.');
          }
        }
      } catch (err) {
        console.error('explore.tsx: Erro de rede:', err);
        showToastNotification('Erro de conexão com o servidor.');
      }
    }

    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      console.log('explore.tsx: Itens antes:', prevItems.length, 'depois:', updatedItems.length);
      saveItems(updatedItems);
      return updatedItems;
    });
  };

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    Animated.sequence([
      Animated.timing(toastAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(toastAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => setShowToast(false));
  };

  const handleCloseMissionScreen = async () => {
    await playUISound();
    setMissionScreenVisible(false);
    setSelectedItem(null);
  };

  const handleOptionSelect = async (option: string) => {
    await playUISound();
    setMenuVisible(false);
    setSelectedOption(option);
    setOptionModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <MapComponent
        userLocation={userLocation}
        items={items}
        onItemClick={handleItemClick}
      />
      {missionScreenVisible && selectedItem && (
        <MissionScreen
          missionId={selectedItem.mission?.id || ''}
          itemId={selectedItem.id}
          onClose={handleCloseMissionScreen}
          onMissionComplete={handleMissionComplete}
        />
      )}
      <MenuModal 
        visible={menuVisible} 
        onClose={async () => {
          await playUISound();
          setMenuVisible(false);
        }} 
        onOptionSelect={handleOptionSelect} 
      />
      <OptionModal 
        visible={optionModalVisible} 
        option={selectedOption} 
        onClose={async () => {
          await playUISound();
          setOptionModalVisible(false);
        }} 
        onReset={() => {
          setOptionModalVisible(false);
          setSelectedOption(null);
        }} 
      />
      <TouchableOpacity 
        style={styles.fabButton} 
        onPress={async () => {
          await playUISound();
          setMenuVisible(true);
        }}
      >
        <Image source={require('../../assets/images/edgerunners.png')} style={styles.fabImage} />
      </TouchableOpacity>
      {showToast && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              opacity: toastAnim,
            },
          ]}
        >
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fabImage: {
    width: 70,
    height: 70,
  },
  toastContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: '#1a1a1a',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fcee09',
    zIndex: 1000,
  },
  toastText: {
    color: '#fcee09',
    fontSize: 14,
    textAlign: 'center',
  },
});