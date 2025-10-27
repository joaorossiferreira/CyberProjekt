import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://backend-psi-fawn-77.vercel.app';
const { width } = Dimensions.get('window');

interface RankingModalProps {
  visible: boolean;
  onClose: () => void;
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

const RankingModal: React.FC<RankingModalProps> = ({ visible, onClose }) => {
  const [rankingType, setRankingType] = useState<'level' | 'gold'>('level');
  const [rankingData, setRankingData] = useState<RankingUser[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      fetchUserStats();
      fetchRanking(rankingType);
    }
  }, [visible, rankingType]);

  const fetchUserStats = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        setError('Usuário não logado.');
        return;
      }
      const response = await fetch(`${BASE_URL}/user-stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data: UserStats = await response.json();
        setUserStats(data);
      } else {
        setUserStats(null);
        console.error('Erro ao carregar stats do usuário:', response.status);
      }
    } catch (err) {
      setUserStats(null);
      console.error('Erro ao buscar stats:', err);
    }
  };

  const fetchRanking = async (type: 'level' | 'gold') => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        setError('Usuário não logado.');
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
        setRankingData(rankingData);
        setUserRank(rankData.rank);
        setError(null);
      } else {
        setError('Erro ao carregar rankings.');
        setRankingData([]);
        setUserRank(null);
      }
    } catch (err) {
      console.error('Erro ao buscar ranking:', err);
      setError('Erro de conexão. Verifique sua internet.');
      setRankingData([]);
      setUserRank(null);
    } finally {
      setLoading(false);
    }
  };

  const switchRankingType = () => {
    setRankingType(prev => (prev === 'level' ? 'gold' : 'level'));
  };

  const renderRankingItem = ({ item, index }: { item: RankingUser; index: number }) => {
    const isUserRow = item.name === userStats?.name;
    const rank = index + 1;
    
    return (
      <View
        style={[
          styles.row, 
          isUserRow && styles.userRow,
          { backgroundColor: isUserRow ? 'rgba(252,238,9,0.1)' : 'rgba(0,0,0,0.3)' }
        ]}
      >
        <View style={styles.rankCell}>
          <Text style={[styles.rankText, isUserRow && styles.userText]}>
            {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}
          </Text>
        </View>
        <View style={styles.nameCell}>
          <Text style={[styles.nameText, isUserRow && styles.userText]} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        <View style={styles.valueCell}>
          <Text style={[styles.valueText, isUserRow && styles.userText]}>
            {rankingType === 'level' ? `Nv. ${item.level}` : `${item.gold} ₵`}
          </Text>
        </View>
      </View>
    );
  };

  const renderUserRank = () => {
    if (!userStats || !userRank || rankingData.some(item => item.name === userStats.name)) {
      return null;
    }
    
    return (
      <View
        style={[
          styles.row, 
          styles.userRow, 
          styles.separatedRow,
          { backgroundColor: 'rgba(252,238,9,0.1)' }
        ]}
      >
        <View style={styles.rankCell}>
          <Text style={[styles.rankText, styles.userText]}>#{userRank}</Text>
        </View>
        <View style={styles.nameCell}>
          <Text style={[styles.nameText, styles.userText]} numberOfLines={1}>
            {userStats.name}
          </Text>
        </View>
        <View style={styles.valueCell}>
          <Text style={[styles.valueText, styles.userText]}>
            {rankingType === 'level' ? `Nv. ${userStats.level}` : `${userStats.gold} ₵`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <TouchableOpacity 
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        
        <View style={styles.modalContent}>
          <View style={styles.modalGradient}>
            <Text style={styles.title}>🏆 RANKING 🏆</Text>

            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : (
              <>
                <View style={styles.switcher}>
                  <TouchableOpacity 
                    onPress={switchRankingType}
                    style={styles.switchButton}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.arrow}>◀</Text>
                  </TouchableOpacity>
                  
                  <View style={styles.rankingTypeContainer}>
                    <Text style={styles.rankingTypeTitle}>
                      {rankingType === 'level' ? '⬆️ TOP NÍVEIS' : '💰 TOP GOLD'}
                    </Text>
                  </View>
                  
                  <TouchableOpacity 
                    onPress={switchRankingType}
                    style={styles.switchButton}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.arrow}>▶</Text>
                  </TouchableOpacity>
                </View>

                {loading ? (
                  <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>⚡ CARREGANDO ⚡</Text>
                  </View>
                ) : (
                  <View style={styles.table}>
                    <View style={styles.headerRow}>
                      <View style={styles.rankCell}>
                        <Text style={styles.headerCell}>#</Text>
                      </View>
                      <View style={styles.nameCell}>
                        <Text style={styles.headerCell}>JOGADOR</Text>
                      </View>
                      <View style={styles.valueCell}>
                        <Text style={styles.headerCell}>
                          {rankingType === 'level' ? 'NÍVEL' : 'GOLD'}
                        </Text>
                      </View>
                    </View>
                    
                    {rankingData.length === 0 ? (
                      <Text style={styles.emptyText}>Nenhum dado disponível</Text>
                    ) : (
                      <FlatList
                        data={rankingData}
                        renderItem={renderRankingItem}
                        keyExtractor={(item, index) => `${item.name}-${index}`}
                        style={styles.rankingList}
                        showsVerticalScrollIndicator={false}
                      />
                    )}
                    
                    {renderUserRank()}
                  </View>
                )}
              </>
            )}

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <View style={styles.closeButtonGradient}>
                <Text style={styles.closeButtonText}>VOLTAR</Text>
              </View>
            </TouchableOpacity>
          </View>
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
  },
  backdrop: {
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
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Cyberpunk',
    color: '#fcee09',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    color: '#fcee09',
    fontSize: 16,
    fontFamily: 'ChakraPetch-Regular',
    textAlign: 'center',
  },
  switcher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  switchButton: {
    padding: 8,
  },
  arrow: {
    fontSize: 24,
    color: '#fcee09',
    fontFamily: 'ChakraPetch-Bold',
  },
  rankingTypeContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#fcee09',
    backgroundColor: 'rgba(252,238,9,0.1)',
  },
  rankingTypeTitle: {
    fontSize: 16,
    color: '#fcee09',
    fontFamily: 'ChakraPetch-Bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Cyberpunk',
    color: '#fcee09',
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  table: {
    borderWidth: 2,
    borderColor: '#fcee09',
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#000',
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#fcee09',
    backgroundColor: 'rgba(252,238,9,0.1)',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fcee0933',
  },
  userRow: {
    borderWidth: 2,
    borderColor: '#fcee09',
  },
  separatedRow: {
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#fcee09',
  },
  rankCell: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameCell: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  valueCell: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  headerCell: {
    color: '#fcee09',
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  rankText: {
    color: '#fcee09',
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 14,
  },
  nameText: {
    color: '#fcee09',
    fontFamily: 'ChakraPetch-Regular',
    fontSize: 14,
  },
  valueText: {
    color: '#fcee09',
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 14,
  },
  userText: {
    color: '#fcee09',
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  rankingList: {
    maxHeight: 250,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    textAlign: 'center',
    paddingVertical: 40,
  },
  closeButton: {
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#fcee09',
  },
  closeButtonGradient: {
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#fcee09',
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Cyberpunk',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export default RankingModal;