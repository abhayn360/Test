import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Screens/Dashboard/Dashboard';
import Login from '../Screens/Login';

const Route = () => {
    const Stack = createNativeStackNavigator();

  return (


    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}  />
        <Stack.Screen name="main" component={Dashboard} options={{headerShown:false}}  />



      </Stack.Navigator>
    </NavigationContainer>
  
  )
}

export default Route

const styles = StyleSheet.create({})