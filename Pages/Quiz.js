import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View,ActivityIndicator } from "react-native";

function Quiz() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
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
          <Text style={styles.question}>{data[0].Questions}</Text>
        </View>
        <View style={styles.answerContainer}>
          <Pressable style={styles.buttonStyle}>
            <Text>{data[0]["Option-1"]}</Text>
          </Pressable>
          <Pressable style={styles.buttonStyle}>
            <Text>{data[0]["Option-2"]}</Text>
          </Pressable>
          <Pressable style={styles.buttonStyle}>
            <Text>{data[0]["Option-3"]}</Text>
          </Pressable>
          <Pressable style={styles.buttonStyle}>
            <Text>{data[0]["Option-4"]}</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonStyle}>
            <Text>Back</Text>
          </Pressable>
          <Pressable style={styles.buttonStyle}>
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
