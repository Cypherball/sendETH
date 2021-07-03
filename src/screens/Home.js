import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Keyboard} from 'react-native';
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
import {getBalance, getTransactions, sendTransaction} from '../api';
import ResponseModal from '../components/ResponseModal';
import colors from '../config/colors';
import TxList from '../components/TxList';

const Home = () => {
  // transaction amount in ETH
  const [amnt, setAmnt] = useState('');
  const [amntErr, setAmntErr] = useState('');
  // recepient public key
  const [pk, setPk] = useState('');
  const [pkErr, setPkErr] = useState('');

  // User Account Balance
  const [bal, setBal] = useState(null);

  // User Transactions
  const [txs, setTxs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Modal to show transaction response
  const [modalVisible, setModalVisible] = React.useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => {
    setModalVisible(false);
  };

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
    // get all user's transactions
    (async () => {
      setRefreshing(true);
      try {
        const res = await getTransactions();
        if (res.data.message === 'OK') setTxs(res.data.result);
      } catch (err) {
        console.log(err);
      }
      setRefreshing(false);
    })();
  }, []);

  useEffect(() => {
    if (txError) {
      showModal();
    }
  }, [txError]);

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

  const txListRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await getTransactions();
      console.log(`RESULT: ${JSON.stringify(res)}`);
      if (res.data.message === 'OK') setTxs(res.data.result);
    } catch (err) {
      console.log(err);
    }
    setRefreshing(false);
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
    Keyboard.dismiss();
    // Validate inputs and send transaction
    setLoading(true);
    if (validate()) {
      console.log('SENDING...');
      try {
        const tx = await sendTransaction(amnt, pk);
        if (tx) {
          console.log('Success');
          showModal();
          setPk('');
          updateBalance();
        } else console.log('Oh No! There was an error :(');
        txListRefresh();
      } catch (err) {
        console.log(`Oh No! There was an error`);
        // Error Handling (Will show error modal automatically because of the useEffect hook)
        if (err.code === 'INSUFFICIENT_FUNDS')
          setTxError(
            'Your account has insufficient funds to make this transaction!',
          );
        else if (err.code === 'INVALID_ARGUMENT' && err.argument === 'address')
          setTxError('Invalid Recepient Address Provided!');
        else setTxError(err.code);
        txListRefresh();
      }
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
            <View style={styles.balance_view}>
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
      {/* List of User's Transactions */}
      <TxList txs={txs} refreshing={refreshing} onRefresh={txListRefresh} />
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
    marginTop: 12,
    //marginBottom: 10,
    textAlign: 'center',
  },
  balance_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 10,
    marginBottom: 24,
    padding: 2,
  },
});
