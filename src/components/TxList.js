import React from 'react';
import {StyleSheet, ScrollView, View, FlatList} from 'react-native';
import {Text, Button, Title} from 'react-native-paper';
import TxItem from './TxItem';
import colors from '../config/colors';

const TxList = props => {
  console.log(`PROPS TXS: ${JSON.stringify(props.txs)}`);

  const renderItem = ({item, index}) => (
    <>
      <TxItem tx={item} key={item.blockNumber} />
    </>
  );

  return (
    <View style={styles.container}>
      <Title
        style={{marginVertical: 8, color: colors.accent, textAlign: 'center'}}>
        TRANSACTIONS
      </Title>
      <FlatList
        data={props.txs}
        renderItem={renderItem}
        keyExtractor={item => item.blockHash}
        onRefresh={props.onRefresh}
        refreshing={props.refreshing}
        style={{flex: 1}}
      />
    </View>
  );
};

export default TxList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    borderColor: colors.accent,
    borderWidth: 2,
    paddingBottom: 12,
  },
});
