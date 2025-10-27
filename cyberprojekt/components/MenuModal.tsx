// components/MenuModal.tsx
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useAudio } from './AudioManager';
import RankingModal from './RankingModal';

const { width, height } = Dimensions.get('window');

interface MenuModalProps {
  visible: boolean;
  onClose: () => void;
  onOptionSelect: (option: string) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ visible, onClose, onOptionSelect }) => {
  const [showRanking, setShowRanking] = useState(false);
  const { playUISound } = useAudio();
  const router = useRouter();

  const handleOptionSelect = async (option: string) => {
    await playUISound();
    if (option === 'Ranking') {
      setShowRanking(true);
    } else if (option === 'Loja') {
      router.push('/shop');
      onClose();
    } else if (option === 'Inventário') {
      router.push('/inventory');
      onClose();
    } else if (option === 'Perfil') {
      router.push('/profile');
      onClose();
    } else {
      onOptionSelect(option);
      onClose();
    }
  };

  const handleClose = async () => {
    await playUISound();
    setShowRanking(false);
    onClose();
  };

  const handleRankingClose = async () => {
    await playUISound();
    setShowRanking(false);
  };

  const menuOptions = [
    { label: '📦 INVENTÁRIO', value: 'Inventário' },
    { label: '👤 PERFIL', value: 'Perfil' },
    { label: '🛒 LOJA', value: 'Loja' },
    { label: '🏆 RANKING', value: 'Ranking' },
    { label: '📊 HISTÓRICO', value: 'Histórico' },
    { label: '⚙️ CONFIGURAÇÕES', value: 'Configurações' },
  ];

  return (
    <>
      <Modal visible={visible && !showRanking} animationType="fade" transparent statusBarTranslucent>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.85)" barStyle="light-content" />
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.backdrop}
            activeOpacity={1}
            onPress={handleClose}
          />
          
          <View style={styles.modalContent}>
            <View style={styles.modalGradient}>
              <Text style={styles.title}>⚡ MENU ⚡</Text>

              <View style={styles.menuGrid}>
                {menuOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.menuButton}
                    onPress={() => handleOptionSelect(option.value)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.menuButtonGradient}>
                      <Text style={styles.menuButtonText}>{option.label}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity 
                style={styles.closeButton}
                onPress={handleClose}
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

      <RankingModal visible={showRanking} onClose={handleRankingClose} />
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  modalContent: {
    width: width - 40,
    maxHeight: height * 0.85,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fcee09',
    backgroundColor: '#000',
    shadowColor: '#fcee09',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  modalGradient: {
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Cyberpunk',
    color: '#fcee09',
    textAlign: 'center',
    marginBottom: 24,
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  menuGrid: {
    gap: 12,
    marginBottom: 20,
  },
  menuButton: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fcee09',
    backgroundColor: '#000',
  },
  menuButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(252,238,9,0.05)',
  },
  menuButtonText: {
    color: '#fcee09',
    fontSize: 18,
    fontFamily: 'ChakraPetch-Bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  closeButton: {
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#fcee09',
  },
  closeButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#fcee09',
  },
  closeButtonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Cyberpunk',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export default MenuModal;