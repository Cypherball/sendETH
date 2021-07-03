import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button, IconButton} from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import {ethers} from 'ethers';
import colors from '../config/colors';

const TxItem = ({tx}) => {
  const amount = ethers.utils.formatEther(tx.value);
  return (
    <View
      style={{
        ...styles.container,
        // Red: Error, Green: Success, Yellow: Pending
        borderColor:
          tx.isError !== '0'
            ? colors.error
            : tx.txreceipt_status === '1'
            ? colors.success
            : colors.warning,
      }}>
      <View style={{...styles.rowContainer, marginBottom: 5}}>
        <Text style={{...styles.txtStyle, color: colors['gray-500']}}>
          {moment.unix(tx.timeStamp).format('DD/MM/YYYY HH:mm')}
        </Text>
        <Icon
          name={
            tx.isError !== '0'
              ? 'exclamation-circle'
              : tx.txreceipt_status
              ? 'check-circle'
              : 'hourglass-half'
          }
          size={25}
          color={
            tx.isError !== '0'
              ? colors.error
              : tx.txreceipt_status === '1'
              ? colors.success
              : colors.warning
          }
          style={styles.icon}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.txtStyle} numberOfLines={1}>
          <Text style={styles.txtHeadingStyle}>HASH:</Text> {tx.hash}
        </Text>
        <IconButton
          icon="content-copy"
          color={colors.accent}
          size={18}
          onPress={() => Clipboard.setString(tx.hash)}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.txtStyle} numberOfLines={1}>
          <Text style={styles.txtHeadingStyle}>FROM:</Text> {tx.from}
        </Text>
        <IconButton
          icon="content-copy"
          color={colors.accent}
          size={18}
          onPress={() => Clipboard.setString(tx.from)}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.txtStyle} numberOfLines={1}>
          <Text style={styles.txtHeadingStyle}>TO:</Text> {tx.to}
        </Text>
        <IconButton
          icon="content-copy"
          color={colors.accent}
          size={18}
          onPress={() => Clipboard.setString(tx.to)}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.txtStyle} numberOfLines={1}>
          <Text style={styles.txtHeadingStyle}>AMOUNT:</Text> {amount}
        </Text>
        <IconButton
          icon="content-copy"
          color={colors.accent}
          size={18}
          onPress={() => Clipboard.setString(amount)}
        />
      </View>
    </View>
  );
};

export default TxItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: 10,
    borderWidth: 2,
    borderRadius: 20,
    flex: 1,
    marginBottom: 8,
    marginHorizontal: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtStyle: {
    flex: 1,
    paddingHorizontal: 5,
  },
  txtHeadingStyle: {
    fontWeight: 'bold',
    color: colors.accent,
  },
  icon: {
    alignSelf: 'center',
    paddingHorizontal: 5,
  },
});
