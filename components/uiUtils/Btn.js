import { StyleSheet, Pressable, Text } from 'react-native';
import React from 'react';

const Btn = ({ onPress, style, children, txtColor }) => {
  return (
    <Pressable style={[styles.btn, style]} onPress={onPress}>
      <Text style={[styles.txt, { color: txtColor }]}>{children}</Text>
    </Pressable>
  );
};

export default Btn;

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    height: 34,
    width: '30%',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  txt: {
    fontSize: 18,
  },
});
