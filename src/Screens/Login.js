import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import CustomInput from './Custominput';
import { Image } from 'react-native';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import RootLayout from './Layout/Rootlayout';
const HEIGHT=Dimensions.get('screen').height

export default function Login() {
  const [email, setemail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigation=useNavigation()
  const isFocused=useIsFocused()

  useEffect(() => {
  setemail('')
  setPassword('')
  }, [isFocused])
  
  


  const handleSubmit = () => {
    setLoading(true);
    setError(null);

    axios.post('https://wispper.vercel.app/api/v0/users/login', {
      email: email,
      password: password,
    })
      .then((response) => {
        navigation.navigate('main', { userId: response.data?._id });
        console.log('Login successful:', response.data?._id);
      })
      .catch((err) => {
        setError(err.response ? err.response.data.message : "An error occurred");

      })
      .finally(() => {
        setLoading(false);
      });
  };




  return (
    <RootLayout>

<View style={styles.container}>
      <Image source={require('../assets/images/NFC_logo.png')} style={styles.logo} />

      <Text style={styles.welcomeText}>Welcome!</Text>





      <CustomInput
        labelText="Email"
        value={email}
        onChangeText={setemail}
        placeholder="Enter your phone number"
        keyboardType="email-address"
        iconName="email"
      />
<CustomInput
        value={password}
        labelText="Password"
        errorMessage={error}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={!showPassword}
        onTogglePasswordVisibility={()=>    setShowPassword(prev => !prev)
        }
        iconName="eye"
      />
    

      
      <TouchableOpacity style={styles.loginButton} onPress={() => handleSubmit()}>
      {!loading ?
        <Text style={styles.loginButtonText}>Login</Text>
      :
      <ActivityIndicator  color="#fff"/>
    }
      </TouchableOpacity>
    </View>

    </RootLayout>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop:HEIGHT*.15
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily:'Poppins-Regular',
    color: '#000',
    marginBottom: 20,

  },
  subText: {
    fontSize: 18,
    marginBottom: 30,
    color: '#000',
  },

  loginButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 50
  },
  loginButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
