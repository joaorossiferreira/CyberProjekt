import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Animated, Easing, Text } from 'react-native';
import MapComponent from '../../components/MapComponent';
import MissionScreen from '../../components/MissionScreen';
import BattleScreen from '../../components/BattleScreen';
import BossArena from '../../components/BossArena';
import MenuModal from '../../components/MenuModal';
import OptionModal from '../../components/OptionModal';
import { getUserLocation } from '../../services/location';
import { generateRandomItems, saveItems, loadItems } from '../../services/map';
import { Coords, Item, PlayerStats, BattleResult, Enemy } from '../../types';
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
  const [battleScreenVisible, setBattleScreenVisible] = useState(false);
  const [bossArenaVisible, setBossArenaVisible] = useState(false);
  const [selectedEnemy, setSelectedEnemy] = useState<Enemy | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({ strength: 0, speed: 0, damage: 0, resistance: 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [playerLevel, setPlayerLevel] = useState(1); // NOVO: Nível do jogador
  const toastAnim = useRef(new Animated.Value(0)).current;
  const musicInitialized = useRef(false);
  const { playUISound, playBackgroundMusic, stopBackgroundMusic } = useAudio();

  useEffect(() => {
    async function fetchLocationAndPlayMusic() {
      try {
        console.log('explore.tsx: Montando tela e tocando música...');
        
        // Busca nível do jogador
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          try {
            const { jwtDecode } = await import('jwt-decode');
            const decoded: any = jwtDecode(token);
            const response = await fetch(`${BASE_URL}/profile/${decoded.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
              const data = await response.json();
              setPlayerLevel(data.user.level);
              console.log('explore.tsx: Player level:', data.user.level);
            }
          } catch (err) {
            console.error('Erro ao buscar nível:', err);
          }
        }
        
        const location = await getUserLocation();
        setUserLocation(location);
        if (location) {
          // FORÇA LIMPEZA DO CACHE - REMOVA DEPOIS DE TESTAR!
          await AsyncStorage.removeItem('mapItems');
          console.log('explore.tsx: 🔥 Cache limpo! Gerando novos itens...');
          
          // GERA TODOS OS ITENS DE UMA VEZ (6 MISSÕES + 3 INIMIGOS = 9)
          const generatedItems = generateRandomItems(location, 9, [], playerLevel);
          console.log('explore.tsx: Items gerados:', generatedItems.length);
          console.log('explore.tsx: Inimigos gerados:', generatedItems.filter(i => i.enemy).map(i => ({ id: i.id, icon: i.icon, name: i.name })));
          setItems(generatedItems);
          await saveItems(generatedItems);
        } else {
          const cachedItems = await loadItems();
          const validItems = cachedItems.filter(item => !item.expiresAt || item.expiresAt > Date.now());
          console.log('explore.tsx: Items válidos do cache:', validItems.length);
          setItems(validItems);
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
      // Remove itens expirados primeiro
      setItems(prevItems => {
        const validItems = prevItems.filter(item => !item.expiresAt || item.expiresAt > Date.now());
        console.log(`🔄 Intervalo: Total=${prevItems.length}, Válidos=${validItems.length}, Inimigos=${validItems.filter(i => i.id.startsWith('enemy-')).length}`);
        
        if (validItems.length < 9) { // 6 missões + 3 inimigos
          // GERA QUANTOS ITENS FALTAREM ATÉ COMPLETAR 9
          const itemsNeeded = 9 - validItems.length;
          const newItems = generateRandomItems(userLocation, itemsNeeded, validItems, playerLevel);
          const allItems = [...validItems, ...newItems];
          saveItems(allItems);
          console.log(`🔄 Adicionados ${newItems.length} novos itens. Total agora: ${allItems.length}`);
          return allItems;
        }
        return validItems;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [userLocation, playerLevel]);

  const handleItemClick = async (item: Item) => {
    await playUISound();
    
    // Se for inimigo, abre tela de batalha
    if (item.enemy) {
      console.log('explore.tsx: Iniciando batalha contra:', item.enemy.name);
      setSelectedEnemy(item.enemy);
      
      // Busca stats do jogador do backend
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const { jwtDecode } = await import('jwt-decode');
          const decoded: any = jwtDecode(token);
          const response = await fetch(`${BASE_URL}/profile/${decoded.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            setPlayerStats(data.user.stats);
            setPlayerLevel(data.user.level);
            console.log('explore.tsx: Stats do jogador:', data.user.stats);
          }
        }
      } catch (err) {
        console.error('Erro ao buscar stats:', err);
      }
      
      setBattleScreenVisible(true);
    } else {
      // Se for missão, abre tela de missão
      setSelectedItem(item);
      setMissionScreenVisible(true);
    }
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

  const handleBattleEnd = async (result: BattleResult) => {
    console.log('explore.tsx: Batalha finalizada:', result);
    
    // Usa o enemy do result (vindo do BossArena) ou o selectedEnemy (vindo do mapa)
    const enemy = (result as any).enemy || selectedEnemy;
    
    if (result.victory) {
      // Tocar som de vitória
      await playUISound(require('../../assets/sounds/success.mp3'));
      
      let droppedItem = null;
      
      // Se for boss, verifica item drop
      if (enemy?.isBoss) {
        try {
          const token = await AsyncStorage.getItem('userToken');
          if (token) {
            const { getUnlockedTier } = await import('../../services/battle');
            const tier = getUnlockedTier(playerLevel);
            
            const dropResponse = await fetch(`${BASE_URL}/battle/get-drop`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                tier,
                bossDifficulty: enemy.difficulty,
              }),
            });
            
            if (dropResponse.ok) {
              const dropData = await dropResponse.json();
              if (dropData.dropped) {
                droppedItem = dropData.item;
                console.log('explore.tsx: Item dropado!', droppedItem);
              }
            }
          }
        } catch (err) {
          console.error('Erro ao verificar drop:', err);
        }
      }
      
      // Enviar recompensas ao backend
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const response = await fetch(`${BASE_URL}/update-progress`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              exp: result.xpGained,
              gold: result.goldGained,
              itemDrop: droppedItem, // Envia item dropado se houver
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log('explore.tsx: Recompensas salvas:', data);
            
            let message = `VITÓRIA! +${result.xpGained} XP! +${result.goldGained} ₵!`;
            if (data.droppedItem) {
              message += ` • 🎁 ${data.droppedItem.name} (${data.droppedItem.rarity})!`;
            }
            if (data.leveledUp) {
              message += ` • 🆙 NÍVEL ${data.level}!`;
            }
            showToastNotification(message);
          } else {
            console.error('Erro ao salvar recompensas:', response.status);
            showToastNotification('Vitória! Mas erro ao salvar progresso.');
          }
        }
      } catch (err) {
        console.error('Erro ao enviar recompensas:', err);
        showToastNotification(`Vitória! +${result.xpGained} XP! +${result.goldGained} ₵!`);
      }
      
      // Remove inimigo do mapa (somente se não for boss)
      if (enemy && !enemy.isBoss) {
        setItems(prevItems => {
          const updatedItems = prevItems.filter(item => item.enemy?.id !== enemy.id);
          saveItems(updatedItems);
          return updatedItems;
        });
      }
    } else {
      // Derrota
      await playUISound();
      showToastNotification('DERROTA! Você foi nocauteado...');
    }
    
    // Fecha tela de batalha e Boss Arena
    setBattleScreenVisible(false);
    setBossArenaVisible(false);
    setSelectedEnemy(null);
  };

  const handleOptionSelect = async (option: string) => {
    await playUISound();
    setMenuVisible(false);
    
    // Se for Boss Arena, busca stats atualizados e abre
    if (option === 'BossArena') {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const { jwtDecode } = await import('jwt-decode');
          const decoded: any = jwtDecode(token);
          const response = await fetch(`${BASE_URL}/profile/${decoded.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            setPlayerStats(data.user.stats);
            setPlayerLevel(data.user.level);
            console.log('explore.tsx: Stats atualizados para Boss Arena:', data.user.stats);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar stats:', error);
      }
      setBossArenaVisible(true);
      return;
    }
    
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
      {battleScreenVisible && selectedEnemy && (
        <View style={styles.battleScreenOverlay}>
          <BattleScreen
            enemy={selectedEnemy}
            playerStats={playerStats}
            playerLevel={playerLevel}
            onBattleEnd={handleBattleEnd}
            onClose={async () => {
              await playUISound();
              setBattleScreenVisible(false);
              setSelectedEnemy(null);
            }}
          />
        </View>
      )}
      {bossArenaVisible && (
        <View style={styles.battleScreenOverlay}>
          <BossArena
            playerLevel={playerLevel}
            playerStats={playerStats}
            onClose={async () => {
              await playUISound();
              setBossArenaVisible(false);
            }}
            onBattleEnd={handleBattleEnd}
          />
        </View>
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
  battleScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: '#000',
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