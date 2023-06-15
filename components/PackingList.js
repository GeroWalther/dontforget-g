import { StyleSheet, View, FlatList } from "react-native";
import React, { useState } from "react";
import Item from "./Item";
import RNPickerSelect from "react-native-picker-select";
import Btn from "./uiUtils/Btn";

export default function PackingList({
  items,
  onDeleteItem,
  onTogglePacking,
  clearAll,
}) {
  const [sortBy, setSortby] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "descr")
    sortedItems = items.slice().sort((a, b) => a.input.localeCompare(b.input));
  if (sortBy === "done")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedItems}
        renderItem={({ item }) => (
          <Item
            onDeleteItem={onDeleteItem}
            onTogglePacking={onTogglePacking}
            item={item}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.flex}>
        <RNPickerSelect
          value={sortBy}
          onValueChange={(value) => {
            if (value !== null) {
              setSortby(value);
            }
          }}
          style={pickerSelectStyles}
          placeholder={{
            label: "Sort by...",
            value: null,
            color: "#9EA0A4",
            disabled: true,
          }}
          items={[
            { label: "Sort by input order", value: "input" },
            { label: "Sort alphabetically", value: "descr" },
            { label: "Sort by status", value: "done" },
          ]}
        />
        <Btn style={styles.ClearBtn} onPress={clearAll}>
          Clear All
        </Btn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  flex: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  ClearBtn: {
    backgroundColor: "#ffebb3",
    color: "#5a3e2b",
    marginTop: 0,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: "#5a3e2b",
    backgroundColor: "#ffebb3",

    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
    height: 34,
    width: "100%",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  inputAndroid: {
    color: "#5a3e2b",
    backgroundColor: "#ffebb3",

    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    height: 34,
    width: "30%",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
});
