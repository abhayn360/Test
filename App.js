import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Route from './src/Routes/Route'
import { Appearance } from 'react-native';

const App = () => {
  useEffect(() => Appearance.setColorScheme('light'),
  [])
  return (
    <Route/>

  )
}

export default App

const styles = StyleSheet.create({})