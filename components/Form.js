import { StyleSheet, Text, TextInput, View, Keyboard } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import Btn from "./uiUtils/Btn";

const Form = ({ onAddItems }) => {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState(1);
  const [hideNum, setHideNum] = useState(false);

  function handleHideNum() {
    setHideNum(!hideNum);
  }

  function handleSubmit() {
    if (!input) return;
    if (hideNum) {
      const newItem1 = {
        input,
        select: null,
        packed: false,
        id: Date.now(),
      };
      onAddItems(newItem1);
    } else {
      const newItem = { input, select, packed: false, id: Date.now() };
      onAddItems(newItem);
    }
    setSelect(1);
    setInput("");
    Keyboard.dismiss();
  }

  const pickerItems = [
    ...Array.from({ length: 100 }, (_, i) => ({
      label: String(i + 1),
      value: i + 1,
    })),
  ];
  return (
    <View style={styles.con}>
      <Text style={styles.txt}>What shouldn't you forget ?</Text>
      <View style={styles.FlexCon}>
        {!hideNum && (
          <RNPickerSelect
            style={pickerSelectStyles}
            value={select}
            placeholder={{
              label: "Select amount...",
              value: null,
              color: "#9EA0A4",
              disabled: true,
            }}
            onValueChange={(value) => {
              if (value !== null) {
                setSelect(value);
              }
            }}
            items={pickerItems}
          />
        )}
        <TextInput
          style={[styles.input, hideNum && { width: "100%", marginLeft: 0 }]}
          placeholder="I shouldn`t forget to..."
          placeholderTextColor={"#7070"}
          value={input.trimStart()}
          onChangeText={setInput}
          multiline
          autoCapitalize="none"
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Btn style={styles.btn2} onPress={handleHideNum}>
          Amount
        </Btn>
        <Btn style={styles.btn} onPress={handleSubmit}>
          ADD
        </Btn>
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  con: {
    width: "90%",
    alignItems: "center",
  },
  FlexCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  txt: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#ffebb3",
    minHeight: 50,
    width: "80%",
    borderRadius: 15,
    paddingTop: 13,
    paddingBottom: 13,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#5a3e2b",
    marginLeft: 10,
    maxHeight: 120,
  },
  btn: {
    backgroundColor: "#76c7c2",
    width: "40%",
    height: 40,
  },
  btn2: {
    backgroundColor: "#76c7a1",
    height: 40,
    marginRight: "10%",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    width: 55,
    fontSize: 18,
    fontWeight: "bold",
    color: "#5a3e2b",
    backgroundColor: "#ffebb3",
    borderRadius: 15,
    textAlign: "center",
  },
  inputAndroid: {
    height: 50,
    width: 55,
    fontSize: 18,
    fontWeight: "bold",
    color: "#5a3e2b",
    backgroundColor: "#ffebb3",
    borderRadius: 15,
    textAlign: "center",
  },
});
