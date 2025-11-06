// app/(tabs)/profile.tsx
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
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

interface Item {
  itemId: string;
  name: string;
  category: string;
  rarity: string;
  stats: ItemStats;
  passive: string;
}

interface UserProfile {
  name: string;
  level: number;
  gold: number;
  stats: ItemStats;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [equippedItems, setEquippedItems] = useState<Item[]>([]);
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
      await fetchProfile(token);
    } catch (err) {
      console.error('Erro ao verificar autenticação:', err);
      router.push('/login');
    }
  };

  const fetchProfile = async (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      const userId = decoded.id;
      const response = await fetch(`${BASE_URL}/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data.user);
        setEquippedItems(data.equippedItems);
      } else {
        console.error('Erro ao buscar perfil:', response.status);
      }
    } catch (err) {
      console.error('Erro de rede ao buscar perfil:', err);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
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

  const handleUnequip = async (item: Item) => {
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
        setEquippedItems(equippedItems.filter(i => i.itemId !== item.itemId));
        await playUISound();
        // Recarrega o perfil para atualizar stats
        await fetchProfile(token!);
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.error('Erro ao desequipar item:', err);
      alert('Erro ao desequipar item.');
    }
  };

  const renderItem = ({ item }: { item: Item }) => (
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
        
        <TouchableOpacity
          style={[styles.unequipButton, { backgroundColor: '#ff4444' }]}
          onPress={() => handleUnequip(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.unequipButtonText}>DESEQUIPAR</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  if (!profile) {
    return (
      <View style={[styles.container, { backgroundColor: '#000' }]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>⚡ CARREGANDO ⚡</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      <View style={styles.header}>
        <Text style={styles.title}>⚡ PERFIL ⚡</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.profileCard, { opacity: fadeAnim }]}>
          <View style={styles.profileGradient}>
            <Text style={styles.profileName}>{profile.name}</Text>
            
            <View style={styles.profileRow}>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatLabel}>NÍVEL</Text>
                <Text style={styles.profileStatValue}>{profile.level}</Text>
              </View>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatLabel}>GOLD</Text>
                <Text style={styles.profileStatValue}>{profile.gold} ₵</Text>
              </View>
            </View>

            <View style={styles.totalStatsCard}>
              <Text style={styles.totalStatsTitle}>⚡ STATS TOTAIS ⚡</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>💪 Força:</Text>
                <Text style={styles.statValue}>{profile.stats.strength}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>⚡ Velocidade:</Text>
                <Text style={styles.statValue}>{profile.stats.speed}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>🧠 Inteligência:</Text>
                <Text style={styles.statValue}>{profile.stats.damage}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>🛡️ Resistência:</Text>
                <Text style={styles.statValue}>{profile.stats.resistance}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Text style={styles.sectionTitle}>🔥 ITENS EQUIPADOS 🔥</Text>
        
        {equippedItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>⚠️</Text>
            <Text style={styles.emptySubtext}>Nenhum item equipado</Text>
          </View>
        ) : (
          equippedItems.map(item => (
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
    fontSize: 28,
    fontFamily: 'Cyberpunk',
    color: '#fcee09',
    textAlign: 'center',
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 24,
    fontFamily: 'Cyberpunk',
    color: '#fcee09',
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  profileCard: {
    marginTop: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#fcee09',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  profileGradient: {
    padding: 20,
    backgroundColor: '#000',
  },
  profileName: {
    fontSize: 32,
    fontFamily: 'Cyberpunk',
    color: '#fcee09',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatLabel: {
    fontSize: 12,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
    marginBottom: 8,
    opacity: 0.8,
  },
  profileStatValue: {
    fontSize: 24,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fff',
  },
  totalStatsCard: {
    backgroundColor: 'rgba(252,238,9,0.05)',
    padding: 16,
    borderWidth: 1,
    borderColor: '#fcee09',
  },
  totalStatsTitle: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    textAlign: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptySubtext: {
    fontSize: 16,
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
    backgroundColor: 'rgba(252,238,9,0.05)',
    borderLeftWidth: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 18,
    fontFamily: 'ChakraPetch-Bold',
    flex: 1,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  rarityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
    fontFamily: 'ChakraPetch-Bold',
    color: '#000',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
    marginBottom: 12,
    opacity: 0.9,
  },
  statsContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fcee09',
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
    fontStyle: 'italic',
    opacity: 0.8,
    marginBottom: 12,
  },
  unequipButton: {
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  unequipButtonText: {
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
    paddingVertical: 16,
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