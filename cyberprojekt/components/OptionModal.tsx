import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useOverlay } from './OverlayContext';

interface OptionModalProps {
  visible: boolean;
  option: string | null;
  onClose: () => void;
}

const OptionModal: React.FC<OptionModalProps> = ({ visible, option, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={[styles.modalContainer, { backgroundColor: useOverlay().suppressOverlay ? 'transparent' : 'rgba(0, 0, 0, 0.5)' }]}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            {option ? `${option} aberto! (Modal temporário)` : 'Carregando...'}
          </Text>
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
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default OptionModal;