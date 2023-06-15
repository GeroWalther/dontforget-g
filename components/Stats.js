import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Stats = ({ items }) => {
  if (!items.length)
    return (
      <Text style={[styles.stats, containerStyles]}>
        Start adding some items to your list 🚀
      </Text>
    );
  const numItems = items.length;
  const numPacked = items.filter((i) => i.packed).length;
  const numPercentage = Math.round((numPacked / numItems) * 100);
  const containerStyles =
    numPercentage === 100 ? styles.greenContainer : styles.yellowContainer;
  return (
    <View style={[styles.stats, containerStyles]}>
      <Text style={{ fontSize: 18, textAlign: "center" }}>
        {numPercentage === 100
          ? "You got everything! Ready to go ! ✈️"
          : `You have ${numItems} task(s) on your list, and you already done ${numPacked} (${numPercentage}%)`}
      </Text>
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  stats: {
    backgroundColor: "#76c7c2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
  },
  greenContainer: {
    backgroundColor: "#00c587",
  },
  yellowContainer: {
    backgroundColor: "#fbd56b",
  },
});
