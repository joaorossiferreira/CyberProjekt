import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAudio } from './AudioManager';

interface MenuModalProps {
  visible: boolean;
  onClose: () => void;
  onOptionSelect: (option: string) => void;
}

interface RankingUser {
  name: string;
  level?: number;
  gold?: number;
}

interface UserStats {
  name: string;
  level: number;
  currentExp: number;
  gold: number;
}

const BASE_URL = 'https://backend-psi-fawn-77.vercel.app';

const MenuModal: React.FC<MenuModalProps> = ({ visible, onClose, onOptionSelect }) => {
  const [showRanking, setShowRanking] = useState(false);
  const [rankingType, setRankingType] = useState<'level' | 'gold'>('level');
  const [rankingData, setRankingData] = useState<RankingUser[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { playUISound } = useAudio();
  const router = useRouter();

  useEffect(() => {
    if (showRanking) {
      fetchUserStats();
      fetchRanking(rankingType);
    }
  }, [showRanking, rankingType]);

  const fetchUserStats = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('MenuModal: Token para user-stats:', token);
      if (!token) {
        console.warn('MenuModal: Usuário não logado');
        setUserStats(null);
        setError('Usuário não logado. Conecte-se para ver o ranking.');
        return;
      }
      const response = await fetch(`${BASE_URL}/user-stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data: UserStats = await response.json();
        console.log('MenuModal: Stats do usuário obtidas:', data);
        setUserStats(data);
      } else {
        console.error('MenuModal: Erro ao buscar stats do usuário:', response.status);
        setUserStats(null);
        setError('Erro ao carregar dados do usuário.');
      }
    } catch (err) {
      console.error('MenuModal: Erro de rede ao buscar stats:', err);
      setUserStats(null);
      setError('Erro de conexão com o servidor.');
    }
  };

  const fetchRanking = async (type: 'level' | 'gold') => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('MenuModal: Token para rankings:', token);
      if (!token) {
        setError('Usuário não logado. Conecte-se para ver o ranking.');
        setRankingData([]);
        setUserRank(null);
        setLoading(false);
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };

      const rankingRes = await fetch(`${BASE_URL}/rankings/${type}`, { headers });
      const rankRes = await fetch(`${BASE_URL}/user-rank/${type}`, { headers });

      if (rankingRes.ok && rankRes.ok) {
        const rankingData = await rankingRes.json();
        const rankData = await rankRes.json();
        console.log('MenuModal: Rankings recebidos:', rankingData);
        console.log('MenuModal: Rank do usuário:', rankData.rank);
        setRankingData(rankingData);
        setUserRank(rankData.rank);
      } else {
        console.error('MenuModal: Erro ao buscar rankings:', rankingRes.status, rankRes.status);
        setError('Erro ao carregar rankings. Tente novamente.');
        setRankingData([]);
        setUserRank(null);
      }
    } catch (err) {
      console.error('MenuModal: Erro de rede:', err);
      setError('Erro de conexão com o servidor.');
      setRankingData([]);
      setUserRank(null);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = async (option: string) => {
    await playUISound();
    if (option === 'Ranking') {
      setShowRanking(true);
      setRankingType('level');
    } else if (option === 'Logout') {
      try {
        console.log('MenuModal: Limpando token do AsyncStorage');
        await AsyncStorage.removeItem('userToken');
        router.replace('/login');
        onClose();
      } catch (err) {
        console.error('MenuModal: Erro ao fazer logout:', err);
        setError('Erro ao sair. Tente novamente.');
      }
    } else {
      onOptionSelect(option);
      onClose();
    }
  };

  const handleClose = async () => {
    await playUISound();
    setShowRanking(false);
    setError(null);
    onClose();
  };

  const switchRankingType = async (direction: 'left' | 'right') => {
    await playUISound();
    setRankingType(prev => (prev === 'level' ? 'gold' : 'level'));
  };

  const renderRankingItem = ({ item, index }: { item: RankingUser; index: number }) => {
    console.log('MenuModal: Comparando item.name:', item.name, 'com userStats.name:', userStats?.name);
    return (
      <View style={[styles.row, { backgroundColor: item.name === userStats?.name ? '#fcee09' : '#00000066' }]}>
        <Text style={[styles.cell, { color: item.name === userStats?.name ? '#000000' : '#ffffff' }]}>
          {index + 1}
        </Text>
        <Text style={[styles.cell, { color: item.name === userStats?.name ? '#000000' : '#ffffff' }]}>
          {item.name}
        </Text>
        <Text style={[styles.cell, { color: item.name === userStats?.name ? '#000000' : '#ffffff' }]}>
          {rankingType === 'level' ? item.level : item.gold}
        </Text>
      </View>
    );
  };

  const renderUserRank = () => {
    if (!userStats || !userRank || rankingData.some(item => item.name === userStats.name)) {
      console.log('MenuModal: Não renderizando linha extra - usuário no top 5 ou dados ausentes', {
        userStats: userStats,
        userRank: userRank,
        isInTop5: rankingData.some(item => item.name === userStats?.name),
      });
      return null;
    }
    console.log('MenuModal: Renderizando linha extra para usuário fora do top 5:', {
      rank: userRank,
      name: userStats.name,
      value: rankingType === 'level' ? userStats.level : userStats.gold,
    });
    return (
      <View style={[styles.row, { backgroundColor: '#fcee09' }]}>
        <Text style={[styles.cell, { color: '#000000' }]}>{userRank}</Text>
        <Text style={[styles.cell, { color: '#000000' }]}>{userStats.name}</Text>
        <Text style={[styles.cell, { color: '#000000' }]}>
          {rankingType === 'level' ? userStats.level : userStats.gold}
        </Text>
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{showRanking ? 'Ranking' : 'Configurações'}</Text>

          {!showRanking ? (
            <>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => handleOptionSelect('Inventário')}
              >
                <Text style={styles.menuButtonText}>📦 INVENTÁRIO</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => handleOptionSelect('Perfil')}
              >
                <Text style={styles.menuButtonText}>👤 PERFIL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => handleOptionSelect('Histórico')}
              >
                <Text style={styles.menuButtonText}>📊 HISTÓRICO</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => handleOptionSelect('Ranking')}
              >
                <Text style={styles.menuButtonText}>🏆 RANKING</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => handleOptionSelect('Configurações')}
              >
                <Text style={styles.menuButtonText}>⚙️ CONFIGURAÇÕES</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : (
                <>
                  <View style={styles.switcher}>
                    <TouchableOpacity onPress={() => switchRankingType('left')}>
                      <Text style={styles.arrow}>◀</Text>
                    </TouchableOpacity>
                    <Text style={styles.rankingTypeTitle}>
                      {rankingType === 'level' ? 'TOP LEVEL' : 'TOP GOLD'}
                    </Text>
                    <TouchableOpacity onPress={() => switchRankingType('right')}>
                      <Text style={styles.arrow}>▶</Text>
                    </TouchableOpacity>
                  </View>

                  {loading ? (
                    <Text style={styles.footerText}>Carregando...</Text>
                  ) : (
                    <View style={styles.table}>
                      <View style={styles.headerRow}>
                        <Text style={styles.headerCell}>#</Text>
                        <Text style={styles.headerCell}>Nome</Text>
                        <Text style={styles.headerCell}>{rankingType.toUpperCase()}</Text>
                      </View>
                      <FlatList
                        data={rankingData}
                        renderItem={renderRankingItem}
                        keyExtractor={(item) => item.name}
                        style={styles.rankingList}
                      />
                      {renderUserRank()}
                    </View>
                  )}
                </>
              )}
            </>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: '#fcee09',
    shadowColor: '#fcee09',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Cyberpunk',
    color: '#fcee09',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  menuButton: {
    backgroundColor: '#00000066',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fcee0944',
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fcee09',
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  closeButton: {
    backgroundColor: '#fcee09',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#fcee0944',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Cyberpunk',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  switcher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  arrow: {
    fontSize: 24,
    color: '#fcee09',
  },
  rankingTypeTitle: {
    fontSize: 18,
    color: '#00ffcc',
    fontFamily: 'ChakraPetch-Bold',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#00ffcc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#333',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#00ffcc',
  },
  headerCell: {
    flex: 1,
    padding: 8,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'ChakraPetch-Regular',
  },
  cell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
    fontFamily: 'ChakraPetch-Regular',
  },
  rankingList: {
    maxHeight: 150,
  },
  errorText: {
    color: '#ff3366',
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    textAlign: 'center',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default MenuModal;