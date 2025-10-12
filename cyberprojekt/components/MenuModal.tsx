import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useOverlay } from './OverlayContext';

interface MenuModalProps {
  visible: boolean;
  onClose: () => void;
  onOptionSelect: (option: string) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ visible, onClose, onOptionSelect }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={[styles.modalContainer, { backgroundColor: useOverlay().suppressOverlay ? 'transparent' : 'rgba(0, 0, 0, 0.5)' }]}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Menu</Text>
          <TouchableOpacity style={styles.button} onPress={() => onOptionSelect('Inventário')}>
            <Text style={styles.buttonText}>Inventário</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onOptionSelect('Perfil')}>
            <Text style={styles.buttonText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onOptionSelect('Histórico')}>
            <Text style={styles.buttonText}>Histórico</Text>
          </TouchableOpacity>
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MenuModal;