

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInput = ({ 
  value, 
  onChangeText, 
  placeholder, 
  keyboardType, 
  secureTextEntry, 
  showPassword, 
  onTogglePasswordVisibility, 
  iconName, 
  errorMessage,
  labelText  
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {labelText && <Text style={styles.label}>{labelText}</Text>}
      <View style={[styles.inputContainer, isFocused && styles.focusedContainer]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {iconName && (
          <Icon 
            name={secureTextEntry ? 'eye-off' : iconName} 
            size={20} 
            color="#999" 
            style={styles.icon} 
            onPress={onTogglePasswordVisibility} 
          />
        )}
      </View>
      {errorMessage &&
       <Text style={styles.err}>
       {errorMessage}
       </Text>
      }
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical:5
  },
  label: {
    fontSize: 14,
    color: '#333',  
    marginBottom: 4,
    marginLeft:5,
    fontFamily:'Poppins-Medium',

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  focusedContainer: {
    borderColor: '#424242',  
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginLeft: 8,
  },
    err:{
    fontSize: 10,
    margin: 2,
    color: 'tomato',
  }
});

export default CustomInput;


