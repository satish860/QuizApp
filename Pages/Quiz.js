import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

function Quiz() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [questionId, setQuestionId] = useState(0);
  const [totalScore, settotalScore] = useState(0);
  const getQuestions = async () => {
    try {
      const response = await fetch(
        "https://sheet2api.com/v1/5fIIA2nxT1OU/hquestions"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onOptionPress = (answer, optionId) => {
    if (answer == optionId) {
      settotalScore(totalScore + 10);
    }
    OnNextEvent();
  };

  const OnNextEvent = () => {
    var nextQuestionId = questionId + 1;
    setQuestionId(nextQuestionId);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>{data[questionId].Questions}</Text>
          </View>
          <View style={styles.answerContainer}>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                onOptionPress(data[questionId]["Answer"], 1);
              }}
            >
              <Text>{data[questionId]["Option-1"]}</Text>
            </Pressable>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                onOptionPress(data[questionId]["Answer"], 2);
              }}
            >
              <Text>{data[questionId]["Option-2"]}</Text>
            </Pressable>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                onOptionPress(data[questionId]["Answer"], 3);
              }}
            >
              <Text>{data[questionId]["Option-3"]}</Text>
            </Pressable>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                onOptionPress(data[questionId]["Answer"], 4);
              }}
            >
              <Text>{data[questionId]["Option-4"]}</Text>
            </Pressable>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonStyle}>
              <Text>Back</Text>
            </Pressable>
            <Pressable style={styles.buttonStyle} onPress={() => OnNextEvent()}>
              <Text>Next</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

export default Quiz;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
  questionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  question: {
    lineHeight: 25,
  },

  answerContainer: {
    flex: 1,
  },
  buttonStyle: {
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "10%",
  },
});
