// app/(tabs)/inventory.tsx
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAudio } from '../../components/AudioManager';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'https://backend-psi-fawn-77.vercel.app';

interface ItemStats {
  strength: number;
  speed: number;
  damage: number;
  resistance: number;
}

interface InventoryItem {
  itemId: string;
  name: string;
  category: string;
  rarity: string;
  stats: ItemStats;
  passive: string;
  equipped?: boolean;
}

export default function InventoryScreen() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('Todos');
  const [rarityFilter, setRarityFilter] = useState<string>('Todos');
  const { playUISound } = useAudio();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    checkAuthAndFetch();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      checkAuthAndFetch();
    }, [])
  );

  const checkAuthAndFetch = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        router.push('/login');
        return;
      }
      await fetchInventory(token);
    } catch (err) {
      console.error('Erro ao verificar autenticação:', err);
      router.push('/login');
    }
  };

  const fetchInventory = async (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      const userId = decoded.id;
      const response = await fetch(`${BASE_URL}/inventory/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setInventory(data);
      } else {
        console.error('Erro ao buscar inventário:', response.status);
      }
    } catch (err) {
      console.error('Erro de rede ao buscar inventário:', err);
    }
  };

  const handleEquip = async (item: InventoryItem) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/inventory/equip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ itemId: item.itemId }),
      });
      const data = await response.json();
      if (data.message) {
        setInventory(inventory.map(i =>
          i.itemId === item.itemId ? { ...i, equipped: true } :
          i.category === item.category ? { ...i, equipped: false } : i
        ));
        await playUISound();
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.error('Erro ao equipar item:', err);
      alert('Erro ao equipar item.');
    }
  };

  const handleUnequip = async (item: InventoryItem) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const decoded: any = jwtDecode(token!);
      const userId = decoded.id;
      const response = await fetch(`${BASE_URL}/users/${userId}/unequip/${item.itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.message) {
        setInventory(inventory.map(i =>
          i.itemId === item.itemId ? { ...i, equipped: false } : i
        ));
        await playUISound();
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.error('Erro ao desequipar item:', err);
      alert('Erro ao desequipar item.');
    }
  };

  const getRarityColor = (rarity: string): string => {
    switch (rarity?.toLowerCase()) {
      case 'mythic':
      case 'mítica':
      case 'mitica': return '#ff0066'; // Rosa/Vermelho neon
      case 'legendary':
      case 'lendária':
      case 'lendaria': return '#ff9900'; // Laranja
      case 'epic':
      case 'épica':
      case 'epica': return '#9d00ff'; // Roxo
      case 'rare':
      case 'rara': return '#00ccff'; // Azul ciano
      case 'common':
      case 'comum': return '#888888'; // Cinza
      default: return '#888888';
    }
  };

  const getFilteredInventory = () => {
    return inventory.filter(item => {
      // Filtro de categoria
      const categoryMatch = categoryFilter === 'Todos' || item.category === categoryFilter;
      
      // Filtro de raridade (normaliza para comparação)
      const normalizeRarity = (r: string) => r?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const rarityMatch = rarityFilter === 'Todos' || normalizeRarity(item.rarity) === normalizeRarity(rarityFilter);
      
      return categoryMatch && rarityMatch;
    });
  };

  const renderItem = ({ item }: { item: InventoryItem }) => (
    <Animated.View 
      style={[
        styles.itemCard, 
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          borderColor: getRarityColor(item.rarity),
          backgroundColor: '#000',
        }
      ]}
    >
      <View
        style={[styles.itemGradient, { borderLeftColor: getRarityColor(item.rarity) }]}
      >
        <View style={styles.itemHeader}>
          <Text style={[styles.itemName, { color: getRarityColor(item.rarity) }]}>
            {item.name}
          </Text>
          <Text style={[styles.rarityBadge, { backgroundColor: getRarityColor(item.rarity) }]}>
            {item.rarity}
          </Text>
        </View>
        
        <Text style={styles.categoryText}>📦 {item.category}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>💪 Força:</Text>
            <Text style={styles.statValue}>{item.stats.strength}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>⚡ Velocidade:</Text>
            <Text style={styles.statValue}>{item.stats.speed}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>🧠 Inteligência:</Text>
            <Text style={styles.statValue}>{item.stats.damage}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>🛡️ Resistência:</Text>
            <Text style={styles.statValue}>{item.stats.resistance}</Text>
          </View>
        </View>
        
        <Text style={styles.passiveText}>✨ {item.passive}</Text>
        
        {item.equipped ? (
          <TouchableOpacity
            style={[styles.equipButton, { backgroundColor: '#ff4444' }]}
            onPress={() => handleUnequip(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.equipButtonText}>DESEQUIPAR</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.equipButton, { backgroundColor: '#fcee09' }]}
            onPress={() => handleEquip(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.equipButtonText}>EQUIPAR</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      <View style={styles.header}>
        <Text style={styles.title}>⚡ INVENTARIO ⚡</Text>
        <Text style={styles.subtitle}>{getFilteredInventory().length} / {inventory.length} itens</Text>
        
        {/* Filtros de Categoria */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>CATEGORIA:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {['Todos', 'Arma', 'Espada', 'Armadura', 'Cabeça', 'Implante', 'Sandevistan'].map(cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filterButton,
                  categoryFilter === cat && styles.filterButtonActive
                ]}
                onPress={async () => {
                  await playUISound();
                  setCategoryFilter(cat);
                }}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.filterButtonText,
                  categoryFilter === cat && styles.filterButtonTextActive
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filtros de Raridade */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>RARIDADE:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {['Todos', 'Comum', 'Rara', 'Épica', 'Lendária', 'Mítica'].map(rar => (
              <TouchableOpacity
                key={rar}
                style={[
                  styles.filterButton,
                  rarityFilter === rar && styles.filterButtonActive
                ]}
                onPress={async () => {
                  await playUISound();
                  setRarityFilter(rar);
                }}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.filterButtonText,
                  rarityFilter === rar && styles.filterButtonTextActive
                ]}>
                  {rar}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {getFilteredInventory().length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📦</Text>
            <Text style={styles.emptySubtext}>
              {inventory.length === 0 ? 'Nenhum item no inventário' : 'Nenhum item com esses filtros'}
            </Text>
          </View>
        ) : (
          getFilteredInventory().map(item => (
            <View key={item.itemId}>{renderItem({ item })}</View>
          ))
        )}
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
    paddingBottom: 20,
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
    marginBottom: 8,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
    textAlign: 'center',
    marginBottom: 16,
  },
  filterSection: {
    marginTop: 12,
  },
  filterLabel: {
    fontSize: 12,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    marginBottom: 8,
    letterSpacing: 1,
  },
  filterScroll: {
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#fcee09',
    backgroundColor: 'transparent',
  },
  filterButtonActive: {
    backgroundColor: '#fcee09',
  },
  filterButtonText: {
    fontSize: 12,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    textTransform: 'uppercase',
  },
  filterButtonTextActive: {
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptySubtext: {
    fontSize: 18,
    fontFamily: 'ChakraPetch-Regular',
    color: '#666',
  },
  itemCard: {
    marginBottom: 16,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  itemGradient: {
    padding: 16,
    borderLeftWidth: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 20,
    fontFamily: 'ChakraPetch-Bold',
    flex: 1,
    textShadowColor: 'rgba(252,238,9,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    textTransform: 'uppercase',
  },
  rarityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 8,
    borderWidth: 2,
    borderColor: '#000',
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 10,
    color: '#000',
    textTransform: 'uppercase',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
    marginBottom: 12,
  },
  statsContainer: {
    backgroundColor: 'rgba(252,238,9,0.05)',
    padding: 12,
    borderWidth: 1,
    borderColor: '#fcee0944',
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
  },
  passiveText: {
    fontSize: 13,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  equipButton: {
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  equipButtonText: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    color: '#000',
    letterSpacing: 1,
    textTransform: 'uppercase',
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
});