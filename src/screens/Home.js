import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Title, Subheading, TextInput, Button} from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import colors from '../config/colors';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.title}>sendETH</Title>
      <TextInput
        label="Amount"
        mode="outlined"
        textContentType="none"
        keyboardType={'decimal-pad'}
        keyboardAppearance="dark"
        maxLength={255}
        style={styles.input}
      />
      <TextInput
        label="Recepient Address"
        mode="outlined"
        keyboardAppearance="dark"
        maxLength={255}
        style={styles.input}
      />
      <Button
        icon="send"
        mode="contained"
        style={styles.send_btn}
        onPress={() => console.log('SENT')}>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>SEND</Text>
      </Button>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: colors.primary_dark,
  },
  title: {
    fontSize: 48,
    padding: 20,
    color: colors.accent,
    marginVertical: 30,
    textAlign: 'center',
  },
  input: {
    margin: 8,
  },
  send_btn: {
    marginHorizontal: 5,
    marginVertical: 18,
    padding: 2,
  },
});
