import React, {useLayoutEffect, useState} from 'react';
import {Layout, Text, Input, Card, useTheme, Icon} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  convertToWordInAmericanEnglish,
  convertToWordInIndianEnglish,
  convertToWordInHindi,
  indianConversion,
} from '@src/ui/screens/helpers/formulas';
import {AppScreenProps} from '@src/types';
import StringUtils from '@src/ui/utils/stringUtils';

const AmountToWordsScreen: React.FC<AppScreenProps<'AmountToWordsScreen'>> = ({
  navigation,
}) => {
  const theme = useTheme();
  const [amount, setAmount] = useState<string>('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Amount To Words',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setAmount('');
          }}
          style={{marginRight: 10}}>
          <Icon
            name="refresh-outline"
            style={{height: 22, width: 22}}
            fill={theme['color-basic-500']}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [convertedAmounts, setConvertedAmounts] = useState({
    indianEnglish: '',
    hindi: '',
    english: '',
  });

  const convertToWords = (inputAmount: string) => {
    const indianEnlishAmount = indianConversion(parseInt(inputAmount));
    const hindiAmount = convertToWordInHindi(inputAmount);
    const billionAmount = convertToWordInAmericanEnglish(parseInt(inputAmount));

    setConvertedAmounts({
      indianEnglish: indianEnlishAmount ?? '',
      hindi: hindiAmount,
      english: billionAmount,
    });
  };

  const handleAmountChange = (text: string) => {
    setAmount(StringUtils.cleanString(text));
    convertToWords(StringUtils.cleanString(text));
  };

  return (
    <Layout
      style={[styles.container, {backgroundColor: theme['color-basic-500']}]}>
      <Layout
        style={[
          styles.inputContainer,
          styles.card,
          {backgroundColor: theme['color-basic-500']},
        ]}>
        <Input
          label={'Amount'}
          placeholder="Enter an amount"
          keyboardType="numeric"
          maxLength={12}
          value={amount.toString()}
          style={styles.input}
          onChangeText={handleAmountChange}
        />
      </Layout>
      {amount && (
        <Layout style={styles.resultContainer}>
          <Card style={styles.card}>
            <Text category="h6">In Indian English :</Text>
            <Text category="p1">{convertedAmounts.indianEnglish}</Text>
          </Card>
          {amount.length <= 12 && (
            <Card style={styles.card}>
              <Text category="h6">In Hindi :</Text>
              <Text category="p1">{convertedAmounts.hindi}</Text>
            </Card>
          )}
          <Card style={styles.card}>
            <Text category="h6">In American English :</Text>
            <Text category="p1">{convertedAmounts.english}</Text>
          </Card>
        </Layout>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    padding: 10,
  },
  resultContainer: {
    marginTop: 16,
  },
  input: {
    marginVertical: 2,
    borderWidth: 1.5,
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
});

export default AmountToWordsScreen;
