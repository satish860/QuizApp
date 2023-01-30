import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

function Quiz({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [questionId, setQuestionId] = useState(0);
  const [totalScore, settotalScore] = useState(0);


  function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

  const getQuestions = async () => {
    try {
      const response = await fetch(
        "https://sheet2api.com/v1/5fIIA2nxT1OU/hquestions"
      );
      const json = await response.json();
      setData(getRandom(json,10));
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
    if (nextQuestionId == 9) {
      navigation.navigate("Result", {
        score: totalScore,
      });
    }
    setQuestionId(nextQuestionId);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: "700" }}>LOADING...</Text>
        </View>
      ) : (
        data && (
          <View style={styles.parent}>
            <View style={styles.top}>
              <Text style={styles.question}>
                Q. {decodeURIComponent(data[questionId].Questions)}
              </Text>
            </View>
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.optionButtom}
                onPress={() => onOptionPress(1, data[questionId].Answer)}
              >
                <Text style={styles.option}>
                  {decodeURIComponent(data[questionId]["Option-1"])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButtom}
                onPress={() => onOptionPress(2, data[questionId].Answer)}
              >
                <Text style={styles.option}>
                  {decodeURIComponent(data[questionId]["Option-2"])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButtom}
                onPress={() =>  onOptionPress(3, data[questionId].Answer)}
              >
                <Text style={styles.option}>
                  {decodeURIComponent(data[questionId]["Option-3"])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButtom}
                onPress={() =>  onOptionPress(4, data[questionId].Answer)}
              >
                <Text style={styles.option}>
                  {decodeURIComponent(data[questionId]["Option-4"])}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
              {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>PREV</Text>
            </TouchableOpacity> */}

              {questionId !== 9 && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={OnNextEvent}
                >
                  <Text style={styles.buttonText}>SKIP</Text>
                </TouchableOpacity>
              )}

              {questionId === 9 && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={OnNextEvent}
                >
                  <Text style={styles.buttonText}>SHOW RESULTS</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )
      )}
    </View>
  );
}

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: "100%",
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#1A759F",
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  question: {
    fontSize: 28,
  },
  option: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  optionButtom: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: "#34A0A4",
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  parent: {
    height: "100%",
  },
});
