import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375; // iPhone SE e menores
const isMediumDevice = width >= 375 && width < 414; // iPhone 6/7/8
const isLargeDevice = width >= 414; // iPhone 6/7/8 Plus, X, etc.

// Tamanhos responsivos
const getResponsiveSize = {
  title: isSmallDevice ? 24 : isMediumDevice ? 26 : 28,
  subtitle: isSmallDevice ? 12 : isMediumDevice ? 14 : 16,
  buttonText: isSmallDevice ? 16 : isMediumDevice ? 18 : 20,
  buttonPaddingVertical: isSmallDevice ? 10 : 12,
  buttonPaddingHorizontal: isSmallDevice ? 30 : 40,
  letterSpacing: isSmallDevice ? 4 : 6,
};

export const CyberpunkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    overflow: 'hidden',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    zIndex: 2,
    marginTop: height * 0.35, // 🔥 Subiu de 10% para 5%
    maxWidth: '90%',
  },
  title: {
    fontFamily: 'Cyberpunk',
    fontSize: getResponsiveSize.title,
    color: '#fcee09',
    textShadowColor: '#000',
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 1,
    marginBottom: 10,
    textAlign: 'center',
    includeFontPadding: false,
  },
  titleShadow: {
    fontFamily: 'Cyberpunk',
    fontSize: getResponsiveSize.title,
    color: 'transparent',
    textShadowColor: '#fcee09',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    opacity: 0.7,
    position: 'absolute',
    textAlign: 'center',
    includeFontPadding: false,
  },
  subtitle: {
    fontFamily: 'Cyberpunk',
    fontSize: getResponsiveSize.subtitle,
    color: 'rgba(252, 238, 9, 0.6)',
    letterSpacing: getResponsiveSize.letterSpacing,
    textTransform: 'uppercase',
    marginTop: 10,
    textAlign: 'center',
    includeFontPadding: false,
  },
  button: {
    position: 'absolute',
    bottom: height * 0.15, // 🔥 Subiu de 10% para 15%
    paddingVertical: getResponsiveSize.buttonPaddingVertical,
    paddingHorizontal: getResponsiveSize.buttonPaddingHorizontal,
    backgroundColor: '#fcee09',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 0,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
    minWidth: 150,
    alignSelf: 'center',
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  buttonHover: {
    backgroundColor: '#000',
    shadowColor: '#fcee09',
    shadowOffset: { width: 3, height: 3 },
  },
  buttonText: {
    fontFamily: 'Cyberpunk',
    color: '#000',
    fontSize: getResponsiveSize.buttonText,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    includeFontPadding: false,
  },
  buttonTextHover: {
    color: '#fcee09',
  },
  scanlines: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.03,
    zIndex: 1,
  },
  fullGlitch: {
    backgroundColor: '#000',
    opacity: 0.8,
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
});