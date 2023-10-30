import React from 'react';
import {Modal, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {Layout, Text, useStyleSheet, Button} from '@ui-kitten/components';

interface StringModalProps {
  visible: boolean;
  strings: string[];
  onClose: () => void;
  onSelect: (selectedString: string) => void;
  modalTitle: string;
}

const OptionModal: React.FC<StringModalProps> = ({
  visible,
  strings,
  onClose,
  onSelect,
  modalTitle,
}) => {
  const kittenStyle = useStyleSheet(kittenStyles);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      hardwareAccelerated={true}
      visible={visible}
      onRequestClose={onClose}>
      <Layout style={styles.centeredView}>
        <Layout style={styles.modalView}>
          <Layout style={styles.modalHeaderContainer}>
            <Text
              category="h6"
              appearance="alternative"
              style={[styles.modalHeader, kittenStyle.primaryBackground]}>
              {modalTitle}
            </Text>
          </Layout>
          <FlatList
            data={strings}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  index != strings.length - 1 ? {borderBottomWidth: 1} : {},
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}>
                <Text style={{textAlign: 'center'}}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <Button
            status="primary"
            onPress={onClose}
            style={[styles.closeButton, kittenStyle.accentBackground]}>
            {'Close'}
          </Button>
        </Layout>
      </Layout>
    </Modal>
  );
};

const kittenStyles = StyleSheet.create({
  primaryBackground: {
    backgroundColor: 'color-primary-500',
  },
  accentBackground: {
    backgroundColor: 'color-primary-400',
  },
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    // paddingHorizontal: 10,
    width: '70%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeaderContainer: {
    flexDirection: 'row',
  },
  modalHeader: {
    textAlign: 'center',
    // marginVertical: 10,
    padding: 10,
    flex: 1,
    borderTopLeftRadius: 5,
    alignItems: 'center',
  },
  item: {
    padding: 15,
  },
  closeButton: {
    // backgroundColor: 'red',
    // flex: 0.8,
    marginHorizontal: 60,
    borderRadius: 5,
    marginBottom: 8,
    padding: 10,
    alignItems: 'center',
  },
});

export default OptionModal;
