import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://backend-psi-fawn-77.vercel.app';

interface RankingModalProps {
  visible: boolean;
  onClose: () => void;
}

interface RankingUser {
  name: string;
  level?: number;
  gold?: number;
}

const RankingModal: React.FC<RankingModalProps> = ({ visible, onClose }) => {
  const [levelRanking, setLevelRanking] = useState<RankingUser[]>([]);
  const [goldRanking, setGoldRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      fetchRankings();
    }
  }, [visible]);

  const fetchRankings = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('RankingModal: Token encontrado:', token);
      if (!token) {
        setError('Usuário não logado. Conecte-se para ver o ranking.');
        setLoading(false);
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };

      const levelRes = await fetch(`${BASE_URL}/rankings/level`, { headers });
      const goldRes = await fetch(`${BASE_URL}/rankings/gold`, { headers });

      if (levelRes.ok && goldRes.ok) {
        setLevelRanking(await levelRes.json());
        setGoldRanking(await goldRes.json());
        console.log('RankingModal: Rankings recebidos');
      } else {
        console.error('RankingModal: Erro ao buscar rankings:', levelRes.status, goldRes.status);
        setError('Erro ao carregar rankings. Tente novamente.');
      }
    } catch (err) {
      console.error('RankingModal: Erro de rede:', err);
      setError('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const renderRankingItem = ({ item, index }: { item: RankingUser; index: number }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.level || item.gold}</Text>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Rankings Online</Text>
          
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : loading ? (
            <Text style={styles.footerText}>Carregando...</Text>
          ) : (
            <>
              <Text style={styles.subtitle}>Top Levels</Text>
              <View style={styles.table}>
                <View style={styles.headerRow}>
                  <Text style={styles.headerCell}>#</Text>
                  <Text style={styles.headerCell}>Nome</Text>
                  <Text style={styles.headerCell}>Level</Text>
                </View>
                <FlatList
                  data={levelRanking}
                  renderItem={renderRankingItem}
                  keyExtractor={(item) => item.name}
                />
              </View>

              <Text style={styles.subtitle}>Top Gold</Text>
              <View style={styles.table}>
                <View style={styles.headerRow}>
                  <Text style={styles.headerCell}>#</Text>
                  <Text style={styles.headerCell}>Nome</Text>
                  <Text style={styles.headerCell}>Gold</Text>
                </View>
                <FlatList
                  data={goldRanking}
                  renderItem={renderRankingItem}
                  keyExtractor={(item) => item.name}
                />
              </View>
            </>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#00ffcc',
    marginBottom: 10,
    fontFamily: 'ChakraPetch-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#fcee09',
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'ChakraPetch-Regular',
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
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'ChakraPetch-Regular',
  },
  closeButton: {
    backgroundColor: '#ff3366',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'ChakraPetch-Bold',
    textAlign: 'center',
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

export default RankingModal;