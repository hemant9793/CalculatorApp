import React from 'react';
import {Modal, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {
  Layout,
  Text,
  useStyleSheet,
  useTheme,
  Icon,
} from '@ui-kitten/components';

interface StringModalProps {
  visible: boolean;
  strings: string[];
  onClose: () => void;
  onSelect: (selectedString: string) => void;
}

const OptionModal: React.FC<StringModalProps> = ({
  visible,
  strings,
  onClose,
  onSelect,
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
          <FlatList
            data={strings}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  index != strings.length - 1 ? {borderBottomWidth: 0.4} : {},
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}>
                <Text
                  category="h6"
                  style={{
                    textAlign: 'center',
                    fontWeight: '600',
                    color: theme['color-primary-500'],
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
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
    backgroundColor: 'color-basic-500',
  },
  closeText: {
    marginBottom: 2,
    fontSize: 16,
    color: 'color-primary-500',
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderBottomWidth: 0.5,
  },

  closeIcon: {
    height: 22,
    width: 22,
  },
});

export default OptionModal;
