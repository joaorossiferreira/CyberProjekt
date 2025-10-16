// app/(tabs)/explore.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import MapComponent from '../../components/MapComponent';
import MissionScreen from '../../components/MissionScreen';
import MenuModal from '../../components/MenuModal';
import OptionModal from '../../components/OptionModal';
import { getUserLocation } from '../../services/location';
import { generateRandomItems, saveItems, loadItems } from '../../services/map';
import { Coords, Item } from '../../types';
import { useAudio } from '../../components/AudioManager';

export default function Explore() {
  const [userLocation, setUserLocation] = useState<Coords | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [missionScreenVisible, setMissionScreenVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { playUISound, playBackgroundMusic, stopBackgroundMusic } = useAudio();

  useEffect(() => {
    async function fetchLocationAndPlayMusic() {
      console.log('explore.tsx: Montando tela e tocando música...');
      const location = await getUserLocation();
      setUserLocation(location);
      if (location) {
        const generatedItems = generateRandomItems(location, 5, items);
        setItems(generatedItems);
        await saveItems(generatedItems);
      } else {
        const cachedItems = await loadItems();
        setItems(cachedItems);
      }

      try {
        await stopBackgroundMusic();
        await playBackgroundMusic(require('../../assets/songs/map-theme.mp3'));
        console.log('explore.tsx: Música do mapa iniciada');
      } catch (error) {
        console.error('Erro ao tocar música do mapa:', error);
      }
    }
    fetchLocationAndPlayMusic();

    return () => {
      console.log('explore.tsx: Desmontando tela, resetando estado...');
      stopBackgroundMusic();
      setOptionModalVisible(false);
      setSelectedOption(null);
    };
  }, []);

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
    console.log('Removendo item:', itemId);
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      console.log('Itens antes:', prevItems.length, 'depois:', updatedItems.length);
      saveItems(updatedItems);
      return updatedItems;
    });
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

  const handleResetModal = () => {
    setOptionModalVisible(false);
    setSelectedOption(null);
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
        onReset={handleResetModal} // PASSAR FUNÇÃO DE RESET
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
});