import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button, Modal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';

const ResponseModal = ({visible, onDismiss, onClosePress, error}) => {
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modalContainer}
      dismissable={false}>
      <View style={styles.content}>
        <Icon
          name={
            error ? 'close-circle-outline' : 'checkbox-marked-circle-outline'
          }
          size={125}
          color={error ? colors.error : colors.success}
          style={styles.icon}
        />
        <Text style={styles.content_txt}>
          {error ? error : 'Successfully Added Transaction!'}
        </Text>
      </View>
      <Button style={styles.close_btn} onPress={onClosePress}>
        <Text style={styles.close_btn_txt}>CLOSE</Text>
      </Button>
    </Modal>
  );
};

export default ResponseModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.surface,
    padding: 20,
    minHeight: '45%',
    marginHorizontal: 8,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
    marginBottom: 20,
  },
  content_txt: {
    textAlign: 'center',
    fontSize: 16,
  },
  close_btn: {
    alignSelf: 'flex-end',
  },
  close_btn_txt: {
    color: colors.accent,
    fontWeight: 'bold',
  },
});
