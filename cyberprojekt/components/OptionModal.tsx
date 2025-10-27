// components/OptionModal.tsx
import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOverlay } from './OverlayContext';
import { useAudio } from './AudioManager';
import Slider from '@react-native-community/slider';

interface OptionModalProps {
  visible: boolean;
  option: string | null;
  onClose: () => void;
  onReset: () => void; // NOVA PROP PARA RESETAR ESTADO
}

const OptionModal: React.FC<OptionModalProps> = ({ visible, option, onClose, onReset }) => {
  const { musicVolume, uiSoundVolume, setMusicVolume, setUISoundVolume, playUISound, stopBackgroundMusic } = useAudio();
  const navigation = useNavigation();

  const handleClose = async () => {
    await playUISound();
    onClose();
  };

  const handleBackToMainMenu = async () => {
    await playUISound();
    await stopBackgroundMusic();
    try {
      console.log('Tentando navegar para a tela de login...');
      onClose(); // FECHAR O MODAL
      onReset(); // RESETAR ESTADO EM explore.tsx
      navigation.navigate('index'); // NAVEGAR PARA TELA DE LOGIN
    } catch (error) {
      console.error('Erro ao navegar:', error);
    }
  };

  const renderContent = () => {
    console.log('OptionModal render: visible=', visible, 'option=', option); // LOG PARA DEPURAR
    if (option === 'Configurações') {
      return (
        <ScrollView style={styles.configContainer}>
          <Text style={styles.configTitle}>CONFIGURAÇÕEs DE ÁUDIO</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>VOLUME MÚSICA: {Math.round(musicVolume * 100)}%</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={musicVolume}
              onValueChange={setMusicVolume}
              minimumTrackTintColor="#fcee09"
              maximumTrackTintColor="#333"
              thumbTintColor="#fcee09"
            />
          </View>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>VOLUME UI: {Math.round(uiSoundVolume * 100)}%</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={uiSoundVolume}
              onValueChange={setUISoundVolume}
              minimumTrackTintColor="#00ffcc"
              maximumTrackTintColor="#333"
              thumbTintColor="#00ffcc"
            />
          </View>
          <Text style={styles.configInfo}>
            As configurações de áudio são salvas automaticamente
          </Text>
          <TouchableOpacity onPress={handleBackToMainMenu}>
            <Text style={styles.mainMenuLink}>Voltar ao menu principal</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }

    return (
      <Text style={styles.modalText}>
        {option ? `${option} aberto! (Modal temporário)` : 'Carregando...'}
      </Text>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>
            {option === 'Configurações' ? 'CONFIGURACOES' : option}
          </Text>
          {renderContent()}
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
    maxHeight: '80%',
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
  modalText: {
    fontSize: 18,
    fontFamily: 'ChakraPetch-Regular',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  configContainer: {
    maxHeight: 300,
  },
  configTitle: {
    fontSize: 18,
    fontFamily: 'ChakraPetch-Bold',
    color: '#00ffcc',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  sliderContainer: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#00000044',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fcee0944',
  },
  sliderLabel: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#fcee09',
    marginBottom: 10,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  configInfo: {
    fontSize: 12,
    fontFamily: 'ChakraPetch-Regular',
    color: '#00ffcc',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  closeButton: {
    backgroundColor: '#fcee09',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
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
  mainMenuLink: {
    fontSize: 14,
    fontFamily: 'ChakraPetch-Regular',
    color: '#ff3366',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default OptionModal;