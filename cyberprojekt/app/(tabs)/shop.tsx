// app/(tabs)/shop.tsx
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAudio } from '../../components/AudioManager';

const BASE_URL = 'https://backend-psi-fawn-77.vercel.app';
const { width } = Dimensions.get('window');

interface ItemStats {
  strength: number;
  speed: number;
  damage: number;
  resistance: number;
}

interface ShopItem {
  itemId: string;
  name: string;
  category: string;
  rarity: string;
  levelRequired: number;
  price: number;
  stats: ItemStats;
  passive: string;
}

interface GachaItem {
  rarity: string;
  price: number;
}

export default function ShopScreen() {
  const [fixedItems, setFixedItems] = useState<ShopItem[]>([]);
  const [rotationItems, setRotationItems] = useState<ShopItem[]>([]);
  const [gachaItems, setGachaItems] = useState<GachaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [selectedGacha, setSelectedGacha] = useState<GachaItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userStats, setUserStats] = useState({ level: 1, gold: 0 });
  const [rotationTimer, setRotationTimer] = useState('');
  const [activeCategory, setActiveCategory] = useState('Arma');
  const { playUISound } = useAudio();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchShop();
    fetchUserStats();
    updateRotationTimer();
    const timerInterval = setInterval(updateRotationTimer, 60000);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    return () => clearInterval(timerInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchShop();
      fetchUserStats();
    }, [])
  );

  const fetchShop = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/shop`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setFixedItems(data.fixedItems || []);
        setRotationItems(data.rotationItems || []);
        setGachaItems(data.gachaItems || []);
      } else {
        console.error('Erro ao buscar loja:', response.status);
      }
    } catch (err) {
      console.error('Erro de rede ao buscar loja:', err);
    }
  };

  const fetchUserStats = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/user-stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUserStats({ level: data.level, gold: data.gold });
      }
    } catch (err) {
      console.error('Erro ao buscar stats:', err);
    }
  };

  const updateRotationTimer = () => {
    const now = new Date();
    const nextRotation = new Date();
    nextRotation.setHours(24, 0, 0, 0);
    if (now.getHours() >= 0) nextRotation.setDate(nextRotation.getDate() + 1);
    const diff = nextRotation.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    setRotationTimer(`${hours}h ${minutes}m`);
  };

  const handleBuy = async (item: ShopItem) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/shop/buy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ itemId: item.itemId }),
      });
      const data = await response.json();
      if (data.message) {
        setFixedItems(fixedItems.filter(i => i.itemId !== item.itemId));
        setRotationItems(rotationItems.filter(i => i.itemId !== item.itemId));
        setUserStats(prev => ({ ...prev, gold: prev.gold - item.price }));
        setModalVisible(false);
        await playUISound();
        alert(`✓ Item comprado: ${item.name}!`);
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.error('Erro ao comprar item:', err);
      alert('Erro ao comprar item.');
    }
  };

  const handleGacha = async (gacha: GachaItem) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/shop/gacha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ rarity: gacha.rarity }),
      });
      const data = await response.json();
      if (data.message) {
        setUserStats(prev => ({ ...prev, gold: prev.gold - gacha.price }));
        setModalVisible(false);
        await playUISound();
        alert(`🎉 Você ganhou: ${data.item.name}!`);
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.error('Erro ao comprar gacha:', err);
      alert('Erro ao comprar gacha.');
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Comum': return '#00ff00';
      case 'Rara': return '#0088ff';
      case 'Épica': return '#aa00ff';
      case 'Lendária': return '#ff8800';
      case 'Mítica': return '#ff0066';
      default: return '#fcee09';
    }
  };

  const categories = ['Arma', 'Implante', 'Cabeça', 'Armadura', 'Espada', 'Sandevistan'];

  const renderItem = ({ item }: { item: ShopItem }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedItem(item);
        setSelectedGacha(null);
        setModalVisible(true);
        playUISound();
      }}
      activeOpacity={0.8}
    >
      <Animated.View 
        style={[
          styles.itemCard, 
          { 
            opacity: fadeAnim,
            borderColor: getRarityColor(item.rarity),
          }
        ]}
      >
        <View
          style={[styles.itemGradient, { borderLeftColor: getRarityColor(item.rarity) }]}
        >
          <View style={styles.itemHeader}>
            <Text style={[styles.itemName, { color: getRarityColor(item.rarity) }]} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={[styles.rarityBadge, { backgroundColor: getRarityColor(item.rarity) }]}>
              {item.rarity}
            </Text>
          </View>
          
          <View style={styles.itemRow}>
            <Text style={styles.itemLabel}>📦 {item.category}</Text>
            <Text style={styles.itemLabel}>⬆️ Nv. {item.levelRequired}</Text>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{item.price} ₵</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  const renderGacha = ({ item }: { item: GachaItem }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedGacha(item);
        setSelectedItem(null);
        setModalVisible(true);
        playUISound();
      }}
      activeOpacity={0.8}
    >
      <Animated.View 
        style={[
          styles.gachaCard, 
          { 
            opacity: fadeAnim,
            borderColor: getRarityColor(item.rarity),
          }
        ]}
      >
        <View
          style={[styles.gachaGradient, { borderLeftColor: getRarityColor(item.rarity) }]}
        >
          <Text style={[styles.gachaTitle, { color: getRarityColor(item.rarity) }]}>
            🎲 GACHA {item.rarity.toUpperCase()}
          </Text>
          <Text style={styles.gachaPrice}>{item.price} ₵</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      <View style={styles.header}>
        <Text style={styles.title}>🛒 LOJA CYBERPUNK 🛒</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statText}>💰 {userStats.gold} ₵</Text>
          <Text style={styles.statText}>⬆️ Nv. {userStats.level}</Text>
        </View>
      </View>
      
      <ScrollView 
        horizontal 
        style={styles.categoryTabs}
        contentContainerStyle={styles.categoryTabsContent}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab, 
              activeCategory === category && styles.activeCategoryTab
            ]}
            onPress={() => {
              setActiveCategory(category);
              playUISound();
            }}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.categoryText,
              activeCategory === category && styles.activeCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ ITENS FIXOS</Text>
          {fixedItems.filter(item => item.category === activeCategory).length === 0 ? (
            <Text style={styles.emptyText}>Nenhum item disponível</Text>
          ) : (
            fixedItems
              .filter(item => item.category === activeCategory)
              .map(item => <View key={item.itemId}>{renderItem({ item })}</View>)
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔄 ROTAÇÃO</Text>
            <Text style={styles.timerText}>⏱️ {rotationTimer}</Text>
          </View>
          {rotationItems.filter(item => item.category === activeCategory).length === 0 ? (
            <Text style={styles.emptyText}>Nenhum item disponível</Text>
          ) : (
            rotationItems
              .filter(item => item.category === activeCategory)
              .map(item => <View key={item.itemId}>{renderItem({ item })}</View>)
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎲 GACHA (ALEATÓRIO)</Text>
          <View style={styles.gachaGrid}>
            {gachaItems.map(item => (
              <View key={item.rarity} style={styles.gachaItem}>
                {renderGacha({ item })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={async () => {
          await playUISound();
          router.push(`/explore?openMenu=${Date.now()}`);
        }}
        activeOpacity={0.8}
      >
        <View style={styles.backButtonGradient}>
          <Text style={styles.backButtonText}>VOLTAR</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => {
              setModalVisible(false);
              playUISound();
            }}
          />
          <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
            <View style={styles.modalGradient}>
              {selectedItem && (
                <>
                  <Text style={[styles.modalTitle, { color: getRarityColor(selectedItem.rarity) }]}>
                    {selectedItem.name}
                  </Text>
                  
                  <View style={styles.modalBadges}>
                    <Text style={[styles.modalBadge, { backgroundColor: getRarityColor(selectedItem.rarity) }]}>
                      {selectedItem.rarity}
                    </Text>
                    <Text style={styles.modalBadge}>{selectedItem.category}</Text>
                  </View>

                  <View style={styles.modalStats}>
                    <View style={styles.modalStatRow}>
                      <Text style={styles.modalStatLabel}>💪 Força:</Text>
                      <Text style={styles.modalStatValue}>{selectedItem.stats.strength}</Text>
                    </View>
                    <View style={styles.modalStatRow}>
                      <Text style={styles.modalStatLabel}>⚡ Velocidade:</Text>
                      <Text style={styles.modalStatValue}>{selectedItem.stats.speed}</Text>
                    </View>
                    <View style={styles.modalStatRow}>
                      <Text style={styles.modalStatLabel}>🧠 Inteligência:</Text>
                      <Text style={styles.modalStatValue}>{selectedItem.stats.damage}</Text>
                    </View>
                    <View style={styles.modalStatRow}>
                      <Text style={styles.modalStatLabel}>🛡️ Resistência:</Text>
                      <Text style={styles.modalStatValue}>{selectedItem.stats.resistance}</Text>
                    </View>
                  </View>

                  <Text style={styles.modalPassive}>✨ {selectedItem.passive}</Text>
                  
                  <View style={styles.modalInfo}>
                    <Text style={styles.modalInfoText}>💰 Preço: {selectedItem.price} ₵</Text>
                    <Text style={styles.modalInfoText}>⬆️ Nível necessário: {selectedItem.levelRequired}</Text>
                  </View>
                </>
              )}
              
              {selectedGacha && (
                <>
                  <Text style={[styles.modalTitle, { color: getRarityColor(selectedGacha.rarity) }]}>
                    🎲 GACHA {selectedGacha.rarity.toUpperCase()}
                  </Text>
                  <Text style={styles.modalDescription}>
                    Item aleatório de raridade {selectedGacha.rarity}
                  </Text>
                  <Text style={styles.modalPrice}>💰 {selectedGacha.price} ₵</Text>
                </>
              )}
              
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => {
                    if (selectedItem) handleBuy(selectedItem);
                    if (selectedGacha) handleGacha(selectedGacha);
                  }}
                  activeOpacity={0.8}
                >
                  <View style={styles.buttonGradient}>
                    <Text style={styles.confirmButtonText}>✓ CONFIRMAR</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setModalVisible(false);
                    playUISound();
                  }}
                  activeOpacity={0.8}
                >
                  <View style={styles.buttonGradient}>
                    <Text style={styles.cancelButtonText}>✗ CANCELAR</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#fcee09',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Cyberpunk',
    color: '#fcee09',
    textAlign: 'center',
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginBottom: 12,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
  },
  statText: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  categoryTabs: {
    maxHeight: 50,
    marginVertical: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fcee0944',
  },
  categoryTabsContent: {
    paddingHorizontal: 20,
    gap: 8,
    paddingVertical: 8,
  },
  categoryTab: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#fcee0944',
    minWidth: 120,
  },
  activeCategoryTab: {
    backgroundColor: '#fcee09',
    borderColor: '#fcee09',
    shadowColor: '#fcee09',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  categoryText: {
    color: '#fcee0988',
    fontSize: 13,
    fontFamily: 'ChakraPetch-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  activeCategoryText: {
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#fcee09',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  timerText: {
    fontSize: 12,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
  itemCard: {
    marginBottom: 12,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  itemGradient: {
    padding: 12,
    borderLeftWidth: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    flex: 1,
    marginRight: 8,
    textTransform: 'uppercase',
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 10,
    fontFamily: 'ChakraPetch-Bold',
    color: '#000',
    borderWidth: 1,
    borderColor: '#000',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemLabel: {
    fontSize: 12,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  gachaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gachaItem: {
    width: (width - 50) / 2,
  },
  gachaCard: {
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  gachaGradient: {
    padding: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  gachaTitle: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Bold',
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  gachaPrice: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#fcee09',
  },
  backButtonGradient: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fcee09',
  },
  backButtonText: {
    fontSize: 18,
    fontFamily: 'Cyberpunk',
    color: '#000',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  modalContent: {
    width: width - 40,
    maxHeight: '80%',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fcee09',
    backgroundColor: '#000',
  },
  modalGradient: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Cyberpunk',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(252,238,9,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  modalBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  modalBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
    fontFamily: 'ChakraPetch-Bold',
    color: '#000',
    borderWidth: 2,
    borderColor: '#000',
    textTransform: 'uppercase',
  },
  modalStats: {
    backgroundColor: 'rgba(252,238,9,0.05)',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fcee0944',
  },
  modalStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  modalStatLabel: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
  },
  modalStatValue: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
  },
  modalPassive: {
    fontSize: 13,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
    fontStyle: 'italic',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInfo: {
    marginBottom: 20,
  },
  modalInfoText: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
    textAlign: 'center',
    marginBottom: 4,
  },
  modalDescription: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalPrice: {
    fontSize: 24,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  modalButtons: {
    gap: 12,
  },
  confirmButton: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fcee09',
  },
  cancelButton: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fcee09',
  },
  buttonGradient: {
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
