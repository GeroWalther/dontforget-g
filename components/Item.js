import React from "react";
import { StyleSheet, View, Text, Switch, Pressable } from "react-native";

const Item = ({ item, onDeleteItem, onTogglePacking }) => {
  const handleTogglePacking = () => {
    onTogglePacking(item.id);
  };

  const handleDeleteItem = () => {
    onDeleteItem(item.id);
  };

  return (
    <View style={styles.container}>
      <Switch
        value={item.packed}
        onValueChange={handleTogglePacking}
        style={styles.switch}
      />
      <Pressable style={styles.itemTextContainer} onPress={handleTogglePacking}>
        <Text style={[styles.itemText, item.packed && styles.itemTextPacked]}>
          {item.select ? item.select : null}
          {item.select ? "x  " : ""}
          {item.input}
        </Text>
      </Pressable>
      <Pressable style={styles.deleteButton} onPress={handleDeleteItem}>
        <Text style={styles.deleteButtonText}>❌</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  switch: {
    marginLeft: 10,
    marginRight: "5%",
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 20,
  },
  itemTextPacked: {
    textDecorationLine: "line-through",
    color: "#5a3e2b",
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteButtonText: {
    fontSize: 20,
    color: "red",
    marginRight: 10,
  },
});

export default Item;
