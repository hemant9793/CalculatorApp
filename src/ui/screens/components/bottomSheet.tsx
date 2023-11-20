import React from 'react';
import {Dimensions, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Layout,
  Text,
  useStyleSheet,
  Button,
  Divider,
  Icon,
  useTheme,
} from '@ui-kitten/components';

interface StringModalProps {
  visible: boolean;
  onClose: () => void;
  watchAd: () => void;
  purchaseAdFree: () => void;
}
const WIDTH = Dimensions.get('screen').width;

const BottomSheet: React.FC<StringModalProps> = ({
  visible,
  watchAd,
  purchaseAdFree,
  onClose,
}) => {
  const kittenStyle = useStyleSheet(kittenStyles);
  const theme = useTheme();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      hardwareAccelerated={true}
      visible={visible}
      onRequestClose={onClose}>
      <Layout style={styles.centeredView}>
        <Layout style={[styles.modalView, kittenStyle.accentBackground]}>
          <Layout style={styles.modalContent}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text category="p1" style={kittenStyle.closeText}>
                Close
              </Text>
              <Icon
                name="close"
                style={styles.closeIcon}
                fill={theme['color-primary-500']}
              />
            </TouchableOpacity>
            <Text category="h6" style={kittenStyle.text}>
              Watch an Ad to Export Report
            </Text>
            <Button style={kittenStyle.button} onPress={watchAd}>
              Watch Ad
            </Button>
            <Layout style={{marginVertical: 8, backgroundColor: 'white'}}>
              <Layout style={styles.divider} />
              <Text
                style={{
                  position: 'absolute',
                  top: -2.5,
                  left: WIDTH * 0.43,
                  backgroundColor: 'white',
                  paddingHorizontal: 10,
                }}>
                or
              </Text>
            </Layout>
            <Text category="h6" style={kittenStyle.text}>
              Purchase Ad-Free Version
            </Text>
            <Button style={kittenStyle.button} onPress={purchaseAdFree}>
              Purchase Now
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </Modal>
  );
};

const kittenStyles = StyleSheet.create({
  accentBackground: {
    backgroundColor: 'color-primary-400',
  },
  closeText: {
    marginBottom: 2,
    fontSize: 16,
    color: 'color-primary-500',
  },
  button: {
    marginHorizontal: 20,
    // backgroundColor: 'color-basic-500',
    // borderColor: 'color-primary-500',
    // borderWidth: 1,
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
    // color: 'color-basic-1100',
  },
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Transparent black background
  },
  modalView: {
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 0,
  },
  closeIcon: {
    height: 22,
    width: 22,
  },

  divider: {
    marginVertical: 10,
    height: 0.65,
    backgroundColor: 'black',
  },
  closeButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default BottomSheet;
