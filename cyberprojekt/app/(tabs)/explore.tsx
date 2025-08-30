import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import MapComponent from '../../components/MapComponent';
import ModalComponent from '../../components/ModalComponent';
import MenuModal from '../../components/MenuModal';
import OptionModal from '../../components/OptionModal';
import { getUserLocation } from '../../services/location';
import { generateRandomItems, saveItems, loadItems } from '../../services/map';
import { Coords, Item } from '../../types';

export default function Explore() {
  const [userLocation, setUserLocation] = useState<Coords | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      const location = await getUserLocation();
      setUserLocation(location);
      if (location) {
        const generatedItems = generateRandomItems(location, 5, items);
        setItems(generatedItems);
        saveItems(generatedItems);
      } else {
        const cachedItems = await loadItems();
        setItems(cachedItems);
      }
    }
    fetchLocation();
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

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    if (selectedItem) {
      setItems(items.filter((item) => item.id !== selectedItem.id));
      saveItems(items.filter((item) => item.id !== selectedItem.id));
    }
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handleOptionSelect = (option: string) => {
    setMenuVisible(false);
    setSelectedOption(option);
    setOptionModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <MapComponent userLocation={userLocation} items={items} onItemClick={handleItemClick} />
      <ModalComponent visible={modalVisible} item={selectedItem} onClose={handleCloseModal} />
      <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} onOptionSelect={handleOptionSelect} />
      <OptionModal visible={optionModalVisible} option={selectedOption} onClose={() => setOptionModalVisible(false)} />
      <TouchableOpacity style={styles.fabButton} onPress={() => setMenuVisible(true)}>
        <Image source={require('../../assets/images/edgerunners.png')} style={styles.fabImage} />
      </TouchableOpacity>
    </View>
  );
};

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