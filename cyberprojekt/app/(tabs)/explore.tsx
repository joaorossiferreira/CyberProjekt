import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapComponent from '../../components/MapComponent';
import ModalComponent from '../../components/ModalComponent';
import { getUserLocation } from '../../services/location';
import { generateRandomItems, saveItems, loadItems } from '../../services/map';
import { Coords, Item } from '../../types';

export default function Explore() {
  const [userLocation, setUserLocation] = useState<Coords | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function fetchLocation() {
      const location = await getUserLocation();
      setUserLocation(location);
      if (location) {
        const generatedItems = generateRandomItems(location, 5);
        setItems(generatedItems);
        await saveItems(generatedItems);
      } else {
        const cachedItems = await loadItems();
        setItems(cachedItems);
      }
    }
    fetchLocation();
  }, []);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    if (selectedItem) {
      setItems(items.filter((item) => item.id !== selectedItem.id));
    }
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <View style={styles.container}>
      <MapComponent userLocation={userLocation} items={items} onItemClick={handleItemClick} />
      <ModalComponent visible={modalVisible} item={selectedItem} onClose={handleCloseModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});