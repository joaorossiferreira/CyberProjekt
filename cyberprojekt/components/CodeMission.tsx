import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native';

interface CodeMissionProps {
  missionData: any;
  onAnswer: (answer: string) => void;
}

export default function CodeMissionCompact({ missionData, onAnswer }: CodeMissionProps) {
  const [availableBlocks, setAvailableBlocks] = useState<string[]>([]);
  const [solution, setSolution] = useState<string[]>([]);

  useEffect(() => {
    if (missionData?.correctCode) {
      // Split into lines, remove inline comments (// ...) and empty lines
      const blocks = missionData.correctCode
        .split('\n')
        .map((line: string) => line.replace(/\/\/.*$/, '').trim())
        .filter((line: string) => line.length > 0);
      setAvailableBlocks([...blocks].sort(() => Math.random() - 0.5));
      setSolution([]);
    }
  }, [missionData]);

  const addToSolution = (block: string) => {
    const newSolution = [...solution, block];
    setSolution(newSolution);

    setAvailableBlocks(prev => {
      const newAvailable = prev.filter(b => b !== block);
      // if there are no more available blocks, submit the answer
      if (newAvailable.length === 0) {
        onAnswer(newSolution.join('\n'));
      }
      return newAvailable;
    });
  };

  const removeFromSolution = (index: number) => {
    const block = solution[index];
    const newSolution = solution.filter((_, i) => i !== index);
    setSolution(newSolution);
    setAvailableBlocks(prev => [...prev, block]);
  };

  const resetAll = () => {
    const allBlocks = [...solution, ...availableBlocks];
    setAvailableBlocks([...allBlocks].sort(() => Math.random() - 0.5));
    setSolution([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{missionData?.description}</Text>
      
      {/* SOLUÇÃO ATUAL */}
      <View style={styles.solutionArea}>
        <Text style={styles.sectionTitle}>SEU CÓDIGO:</Text>
        {solution.map((block, index) => (
          <TouchableOpacity
            key={index}
            style={styles.solutionBlock}
            onPress={() => removeFromSolution(index)}
          >
            <Text style={styles.blockText}>{block}</Text>
            <Text style={styles.removeText}>✕</Text>
          </TouchableOpacity>
        ))}
        {solution.length === 0 && (
          <Text style={styles.placeholder}>Toque nos blocos abaixo</Text>
        )}
      </View>

      {/* BLOCOS DISPONÍVEIS */}
      <View style={styles.availableArea}>
        <Text style={styles.sectionTitle}>BLOCOS DISPONÍVEIS:</Text>
        <View style={styles.blocksGrid}>
          {availableBlocks.map((block, index) => (
            <TouchableOpacity
              key={index}
              style={styles.availableBlock}
              onPress={() => addToSolution(block)}
            >
              <Text style={styles.blockText} numberOfLines={2}>{block}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetAll}>
        <Text style={styles.resetText}>REINICIAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 400,
  },
  description: {
    fontSize: 13,
    fontFamily: 'ChakraPetch-Regular',
    color: '#00ffcc',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 16,
  },
  solutionArea: {
    backgroundColor: '#00000033',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#00ffcc',
    marginBottom: 10,
    minHeight: 100,
  },
  availableArea: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'ChakraPetch-Bold',
    color: '#fcee09',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  blocksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  solutionBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00ffcc22',
    padding: 6,
    borderRadius: 4,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#00ffcc',
  },
  availableBlock: {
    backgroundColor: '#fcee0922',
    padding: 6,
    borderRadius: 4,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#fcee09',
    width: '48%',
    minHeight: 40,
    justifyContent: 'center',
  },
  blockText: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: '#ffffff',
    textAlign: 'center',
  },
  removeText: {
    color: '#ff3366',
    fontSize: 10,
    fontWeight: 'bold',
  },
  placeholder: {
    color: '#00ffcc44',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 10,
  },
  resetButton: {
    backgroundColor: '#ff336622',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ff3366',
    alignSelf: 'center',
  },
  resetText: {
    color: '#ff3366',
    textAlign: 'center',
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 11,
    textTransform: 'uppercase',
  },
});