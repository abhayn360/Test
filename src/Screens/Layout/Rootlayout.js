import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from 'react-native';

const RootLayout = props => {
  const scheme = useColorScheme();
  return (
    <SafeAreaView
      style={{
        ...styles.root,
        ...props.style,
      }}>
      <StatusBar
        animated={true}
        backgroundColor={
      '#ffffff'
        }
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <ScrollView style={{backgroundColor:"#ffffff"}}
      showsVerticalScrollIndicator={false}
      >
      {props.children}

      </ScrollView>
    </SafeAreaView>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
 
});
