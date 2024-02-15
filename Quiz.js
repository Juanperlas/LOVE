import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

const questions = [
  {
    question: "¿En qué fecha nos conocimos?",
    options: ["02/09/2023", "02/10/2023", "03/09/2023"],
    correctAnswer: "02/09/2023",
  },
  {
    question: "¿Cuál es la primera música que te dediqué?",
    options: ["La promesa", "Hasta la raíz", "Hasta el fin del mundo"],
    correctAnswer: "La promesa",
  },
  {
    question: "¿Dónde nos besamos por primera vez?",
    options: ["Cinema", "Mi casa", "Calle"],
    correctAnswer: "Cinema",
  },
  {
    question: "¿Qué es lo que más me gusta de ti?",
    options: ["Ojos", "Cabello", "Cachetes"],
    correctAnswer: "Cachetes",
  },
  {
    question: "¿Cuándo es mi cumpleaños?",
    options: ["07 de abril", "07 de marzo", "06 de abril"],
    correctAnswer: "07 de abril",
  },
  // Añade más preguntas aquí
];

export default function Quiz({ navigation }) {
  useEffect(() => {
    navigation.setOptions({ title: "¿Sabes de Nosotros?" });
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showX, setShowX] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const question = questions[currentQuestionIndex];

  const checkAnswer = () => {
    if (selectedOption === question.correctAnswer) {
      setShowCheck(true);
      setTimeout(() => {
        setCorrectAnswers(correctAnswers + 1);
        setShowCheck(false);
        goToNextQuestion();
      }, 1000);
    } else {
      setShowX(true);
      setTimeout(() => setShowX(false), 1000);
    }
  };

  const goToNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedOption(null); // Resetea la opción seleccionada para la próxima pregunta
    } else {
      showFinalResult();
    }
  };

  const showFinalResult = () => {
    let resultMessage = "";
    let faceEmoji = "";

    const score = Math.floor((correctAnswers / questions.length) * 100);

    if (score < 50) {
      resultMessage = "¡¡¡Comooo!!!";
      faceEmoji = "☹️";
    } else if (score === 100) {
      resultMessage = "¡Regular!";
      faceEmoji = "😄";
    } else {
      resultMessage = "¡Perfecto!";
      faceEmoji = "😊";
    }

    alert(
      `${resultMessage} Tu puntaje total es: ${correctAnswers + 1}/${
        questions.length
      } (${score + 20}%) ${faceEmoji}`
    );
    // Salir de la sección de preguntas
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.score}>
          {correctAnswers}/{questions.length}
        </Text>
        <Text style={styles.question}>{question.question}</Text>
        {question.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={
              option === selectedOption ? styles.selectedOption : styles.option
            }
            onPress={() => setSelectedOption(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.checkButton} onPress={checkAnswer}>
          <Text style={styles.checkButtonText}>Comprobar respuesta</Text>
        </TouchableOpacity>
      </View>
      {showX && (
        <Animated.Text style={[styles.result, styles.resultX]}>
          ❌
        </Animated.Text>
      )}
      {showCheck && (
        <Animated.Text style={[styles.result, styles.resultCheck]}>
          ✔️
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEEAE6",
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#FF7F7F",
  },
  question: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#FF7F7F",
  },
  option: {
    backgroundColor: "#FFC1C1",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#FF7F7F",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  checkButton: {
    backgroundColor: "#FF3B3B",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  checkButtonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  result: {
    fontSize: 100,
    textAlign: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  resultX: {
    color: "red",
  },
  resultCheck: {
    color: "green",
  },
});
