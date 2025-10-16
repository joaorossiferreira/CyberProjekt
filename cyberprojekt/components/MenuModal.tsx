// components/MenuModal.tsx
import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useOverlay } from './OverlayContext';
import { useAudio } from './AudioManager';

interface MenuModalProps {
  visible: boolean;
  onClose: () => void;
  onOptionSelect: (option: string) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ visible, onClose, onOptionSelect }) => {
  const { playUISound } = useAudio();

  const handleOptionSelect = async (option: string) => {
    await playUISound();
    onOptionSelect(option);
  };

  const handleClose = async () => {
    await playUISound();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={[styles.modalContainer]}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Configuracoes</Text>
          
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
            onPress={() => handleOptionSelect('Configurações')}
          >
            <Text style={styles.menuButtonText}>⚙️ CONFIGURAÇÕES</Text>
          </TouchableOpacity>

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
});

export default MenuModal;