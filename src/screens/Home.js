import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Text,
  Title,
  TextInput,
  Button,
  Portal,
  ActivityIndicator,
  TouchableRipple,
} from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import validator from 'validator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getBalance, sendTransaction} from '../api';
import ResponseModal from '../components/ResponseModal';
import colors from '../config/colors';

const Home = () => {
  // transaction amount in ETH
  const [amnt, setAmnt] = useState('');
  const [amntErr, setAmntErr] = useState('');
  // recepient public key
  const [pk, setPk] = useState('');
  const [pkErr, setPkErr] = useState('');

  const [bal, setBal] = useState(null);

  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = React.useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const [txError, setTxError] = useState('');

  useEffect(() => {
    // get user's current balance
    (async () => {
      try {
        const _bal = await getBalance();
        setBal(_bal);
      } catch (err) {
        console.log(err);
        setBal('?');
      }
    })();
  }, []);

  const updateBalance = async () => {
    setBal(null);
    try {
      const _bal = await getBalance();
      setBal(_bal);
    } catch (err) {
      console.log(err);
      setBal('?');
    }
  };

  const validateAmnt = _amnt => {
    if (!_amnt) setAmntErr('Please enter an amount to transfer');
    else if (isNaN(validator.toFloat(_amnt)))
      setAmntErr('Only decimal input allowed!');
    else if (validator.toFloat(_amnt) == 0)
      setAmntErr('Amount should be greater than 0');
    else {
      setAmntErr('');
      return true;
    }
    return false;
  };

  const onChangeAmnt = _amnt => {
    if (_amnt && isNaN(validator.toFloat(_amnt))) return;
    setAmnt(_amnt);
    validateAmnt(_amnt);
  };

  const validatePk = _pk => {
    if (!_pk) setPkErr("Please enter the recepient's address / public key");
    else if (!validator.isEthereumAddress(_pk)) setPkErr('Invalid Address');
    else {
      setPkErr('');
      return true;
    }
    return false;
  };

  const onChangePk = _pk => {
    _pk = _pk.trim();
    setPk(_pk);
    validatePk(_pk);
  };

  // Validates both amount and eth public key
  const validate = () => {
    const amntValid = validateAmnt(amnt.trim());
    const pkValid = validatePk(pk.trim());
    if (amntValid && pkValid) return true;
    return false;
  };

  const onSendPress = async () => {
    setLoading(true);
    if (validate()) {
      console.log('SENDING...');
      const tx = await sendTransaction(amnt, pk);
      if (tx) console.log('Success');
      else console.log('Oh No! There was an error :(');
    } else console.log('Invalid Input/s');
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Portal>
        {/* Modal is to show success or failure messages */}
        <ResponseModal
          visible={modalVisible}
          onDismiss={hideModal}
          onClosePress={hideModal}
          error={txError}
        />
      </Portal>
      <Title style={styles.title}>sendETH</Title>
      {bal !== null ? (
        <View
          style={{
            marginBottom: 20,
          }}>
          {/*Update Balance on touch*/}
          <TouchableOpacity
            onPress={updateBalance}
            rippleColor="rgba(0, 0, 0, .32)">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 24, marginRight: 5}}>{bal}</Text>
              <Icon
                name={'ethereum'}
                size={30}
                color={colors.accent}
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator
          animating={true}
          color={colors.accent}
          style={{marginBottom: 20}}
        />
      )}

      <TextInput
        label="Amount"
        mode="outlined"
        textContentType="none"
        keyboardType={'decimal-pad'}
        keyboardAppearance="dark"
        maxLength={20}
        disabled={loading}
        style={styles.input}
        right={<TextInput.Affix text="ETH" />}
        value={amnt}
        onChangeText={onChangeAmnt}
        error={amntErr}
      />
      {amntErr ? <Text style={styles.input_error}>{amntErr}</Text> : null}
      <TextInput
        label="Recepient Address"
        mode="outlined"
        keyboardAppearance="dark"
        maxLength={42}
        disabled={loading}
        style={styles.input}
        value={pk}
        onChangeText={onChangePk}
        error={pkErr}
      />
      {pkErr ? <Text style={styles.input_error}>{pkErr}</Text> : null}
      <Button
        icon="send"
        mode="contained"
        loading={loading}
        style={styles.send_btn}
        onPress={onSendPress}>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>
          {loading ? 'SENDING' : 'SEND'}
        </Text>
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
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    margin: 8,
  },
  input_error: {
    color: colors.error,
    fontSize: 12,
    marginHorizontal: 12,
    marginBottom: 4,
  },
  send_btn: {
    marginHorizontal: 5,
    marginVertical: 18,
    padding: 2,
  },
});
