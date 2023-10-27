import React, {useState} from 'react';
import {Input, Text, Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import HorizontalInfo from '@src/ui/screens/components/horizontalInfo';

const MoneyTotallerScreen: React.FC = () => {
  const denominations = [1, 2, 5, 10, 20, 50, 100, 200, 500, 2000];
  const [amounts, setAmounts] = useState(Array(denominations.length).fill(''));
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);

  const handleAmountChange = (index: number, value: number) => {
    const updatedAmounts = [...amounts];
    updatedAmounts[index] = value ? value : '';
    setAmounts(updatedAmounts);
    calculateTotal(updatedAmounts);
    setTotalNotes(findSum(updatedAmounts));
  };
  function findSum(arr: string[]) {
    let sum = 0;
    arr.forEach((element: string) => {
      if (!element) {
        return;
      }
      sum += parseInt(element, 10);
    });
    console.log('findSum -> sum', sum);
    return sum;
  }

  const calculateTotal = (amount: number[]) => {
    const total = denominations.reduce((acc, denomination, index) => {
      return acc + denominations[index] * amount[index];
    }, 0);
    setTotalAmount(total);
  };

  return (
    <Layout style={styles.container}>
      <HorizontalInfo
        title="Total Amount:"
        value={`₹${totalAmount}`}
        showDivider={false}
        horizontalTitleCategory="h6"
      />
      <HorizontalInfo
        title="Total Notes:"
        horizontalTitleCategory="h6"
        value={`${totalNotes}`}
        showDivider={true}
      />
      {denominations.map((denomination, index) => (
        <Layout key={index} style={[styles.row, styles.rowCard]}>
          <Layout style={[styles.denominationContainerText]}>
            <Text
              category="h6"
              style={styles.denominationText}>{`₹${denomination}`}</Text>
            <Text
              category="h6"
              style={[
                styles.denominationEqualToText,
                {paddingRight: 20, flex: 0.5},
              ]}>
              {'x'}
            </Text>
          </Layout>
          <Input
            style={styles.input}
            keyboardType="numeric"
            placeholder="0"
            value={amounts[index].toString()}
            onChangeText={value =>
              handleAmountChange(index, parseInt(value, 10))
            }
          />
          <Text category="h6" style={styles.denominationEqualToText}>
            {'='}
          </Text>
          <Text
            status="primary"
            style={styles.denominationAmountText}
            category="h6">{`₹${denomination * amounts[index]}`}</Text>
        </Layout>
      ))}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  horizontalCardStyle: {paddingRight: 63},
  headerContainer: {
    marginBottom: 10,
  },
  heading: {
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  denominationText: {
    flex: 1.5,
  },
  denominationContainerText: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  rowCard: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // elevation: 2, // For Android shadow
  },
  denominationEqualToText: {
    flex: 0.2,
    textAlign: 'center',
  },
  denominationAmountText: {
    flex: 1,
    textAlign: 'center',
  },
  input: {
    flex: 1,
  },
  calculateButton: {
    marginVertical: 10,
  },
  totalAmountText: {},
});

export default MoneyTotallerScreen;
