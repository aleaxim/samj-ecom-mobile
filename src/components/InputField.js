import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {fonts} from '../styles/globalStyles';

const InputField = ({
  label,
  placeholder,
  password,
  keyboardType,
  autoCapitalize,
  onChangeText,
  onBlur,
  value,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text variant="bodyLarge" style={styles.inputLabel}>
        {label}
      </Text>
      <TextInput
        mode="outlined"
        placeholder={placeholder}
        secureTextEntry={password}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '95%',
    marginBottom: 12,
  },
  inputLabel: {
    marginBottom: 10,
    fontFamily: fonts.latoBold,
  },
});

export default InputField;
