import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Layout,
  Text,
  useTheme,
  Input,
  Icon,
  Button,
  useStyleSheet,
} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppScreenProps} from '@src/types';
import {STRINGS} from './string';
import EmiFooter from '../components/emiFooter';
import ExpandableRow from '../components/expandibleRow';
import {GLOBAL_CONSTANTS} from '@src/constants';

const InterestRateChanges: React.FC<AppScreenProps<'InterestRateChanges'>> = ({
  navigation,
}) => {
  const theme = useTheme();
  const kittenStyle = useStyleSheet(kittenStyles);

  const [changes, setChanges] = useState([{month: '', rate: ''}]);

  function saveChanges() {
    // Implement the logic to save the 'changes' array here
    console.log('Saving changes:', changes);
    GLOBAL_CONSTANTS.interestRateChanges = changes;
    navigation.goBack();
  }

  function resetChanges() {
    setChanges([{month: '', rate: ''}]);
    GLOBAL_CONSTANTS.interestRateChanges = [];
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: STRINGS.INTEREST_RATE_CHANGES,
    });
  }, [navigation]);

  useEffect(() => {
    if (GLOBAL_CONSTANTS.interestRateChanges.length) {
      setChanges(GLOBAL_CONSTANTS.interestRateChanges);
    }
  }, []);

  return (
    <Layout style={kittenStyle.outerContainer}>
      <Layout style={[kittenStyle.container, styles.card]}>
        <Layout style={[styles.titleContainer, kittenStyle.whiteBackground]}>
          <Text category="p1" style={{marginRight: 8, fontWeight: 'bold'}}>
            Revised Interest Rate
          </Text>
          <Text category="p1" style={{marginRight: 10, fontWeight: 'bold'}}>
            Start from Month No.
          </Text>
        </Layout>

        {changes.map((change, index) => (
          <View key={index} style={styles.changeRow}>
            <Input
              placeholder="Changed Rate"
              value={change.rate}
              onChangeText={text => {
                const newChanges = [...changes];
                newChanges[index].rate = text;
                setChanges(newChanges);
              }}
              style={styles.input}
              accessoryRight={() => {
                return <Text>%</Text>;
              }}
            />
            <Input
              placeholder={'Month No.'}
              value={change.month}
              onChangeText={text => {
                const newChanges = [...changes];
                newChanges[index].month = text;
                setChanges(newChanges);
              }}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                const newChanges = [...changes];
                newChanges.splice(index, 1);
                setChanges(newChanges);
                GLOBAL_CONSTANTS.interestRateChanges = newChanges;
              }}>
              <Icon
                name="close-outline"
                style={{height: 25, width: 25}}
                fill={theme['color-danger-500']}
              />
            </TouchableOpacity>
          </View>
        ))}

        <Button
          style={{marginTop: 8, marginHorizontal: 70}}
          onPress={() => {
            setChanges([...changes, {month: '', rate: ''}]);
          }}>
          Add Interest Rate Change
        </Button>
      </Layout>

      <EmiFooter
        rightTitle="Save"
        leftTitle="Reset"
        onResetPress={resetChanges}
        onCalculatePress={saveChanges}
      />
      <ExpandableRow
        title={STRINGS.EXPANDIBLE_ROW_TITLE}
        description={STRINGS.EXPANDIBLE_ROW_DESC}
        containerStyle={kittenStyle.expandibleRowContainer}
      />
    </Layout>
  );
};

const kittenStyles = StyleSheet.create({
  resetButton: {
    flex: 1,
    margin: 4,
    borderColor: 'color-primary-500',
    backgroundColor: 'color-basic-500',
    borderWidth: 2,
  },
  button: {
    flex: 1,
    margin: 4,
  },
  outerContainer: {
    flex: 1,
    padding: 10,
  },
  container: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'color-basic-500',
  },
  expandibleRowContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 3,
    backgroundColor: 'color-basic-500',
  },
  whiteBackground: {
    backgroundColor: 'color-basic-500',
  },
});

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 0.7,
    marginVertical: 2,
    marginRight: 5,
    // height: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 16,
  },
  closeButton: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InterestRateChanges;
