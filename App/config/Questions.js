import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ProgressBarAndroid } from 'react-native';

export const reactQuestions = [
  // ... (Data pertanyaan yang sudah ada)
];

export default function QuestionScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = reactQuestions[currentQuestionIndex];

  const handleAnswerPress = (option) => {
    setSelectedAnswer(option);
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < reactQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const progress = (currentQuestionIndex + 1) / reactQuestions.length;

  if (showResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>Quiz Selesai!</Text>
        <Text style={styles.resultText}>Skor Anda: {score} / {reactQuestions.length}</Text>
        <Text style={styles.resultText}>Progress: 100%</Text>
        <TouchableOpacity style={styles.button} onPress={handleRestartQuiz}>
          <Text style={styles.buttonText}>Mulai Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      <FlatList
        data={currentQuestion.options}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedAnswer === item && styles.selectedOptionButton,
              selectedAnswer === currentQuestion.correctAnswer && item === currentQuestion.correctAnswer
                ? styles.correctOptionButton
                : selectedAnswer !== currentQuestion.correctAnswer && selectedAnswer === item
                ? styles.wrongOptionButton
                : null,
            ]}
            onPress={() => handleAnswerPress(item)}
            disabled={selectedAnswer !== null}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedAnswer && (
        <TouchableOpacity style={styles.button} onPress={handleNextQuestion}>
          <Text style={styles.buttonText}>Pertanyaan Selanjutnya</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.progressText}>Progress: {(progress * 100).toFixed(0)}%</Text>
      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={progress}
        color="#b90e0a"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionButton: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
  },
  selectedOptionButton: {
    backgroundColor: '#d3d3d3',
  },
  correctOptionButton: {
    backgroundColor: '#4CAF50',
  },
  wrongOptionButton: {
    backgroundColor: '#F44336',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#b90e0a',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  progressText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
});
