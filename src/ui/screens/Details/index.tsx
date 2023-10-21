import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Layout,
  Text,
  Button,
  Card,
  Divider,
  useStyleSheet,
} from '@ui-kitten/components';
import {AppScreenProps} from '@src/types';
import HorizontalInfo from '../components/horizontalInfo';

const DetailScreen: React.FC<AppScreenProps<'DetailScreen'>> = ({
  route,
  navigation,
}) => {
  const kittenStyle = useStyleSheet(kittenStyles);

  const {
    emi,
    interest,
    loanamount: loanAmount,
    period,
    selectedChip,
  } = route.params;
  console.log(route.params);

  // Dummy data for HorizontalInfo components
  const screenData = [
    {title: 'Emi', value: (emi ?? 0).toString()}, // Convert emi to a string
    {title: 'Interest', value: interest.toString()}, // Convert interest to a string
    {title: 'Loan Amount', value: loanAmount.toString()}, // Convert loanAmount to a string
    {title: 'Period', value: period.toString()},
  ];

  const getSelectedChipValue = (selectedChip: string) => {
    const selectedKey = selectedChip.toLowerCase().replace(/ /g, '');
    return route.params[selectedKey];
  };

  return (
    <Layout style={styles.outerContainer}>
      {/* Card with Title and Value */}
      <Card style={styles.card}>
        <Text style={kittenStyle.primaryText} category="h6">
          {selectedChip}
        </Text>
        <Text style={kittenStyle.primaryText} category="s1">
          {getSelectedChipValue(selectedChip)}
        </Text>
      </Card>

      {/* HorizontalInfo components */}
      {screenData.map((data, index) => (
        <HorizontalInfo
          key={index}
          title={data.title}
          value={data.value}
          showDivider={index < screenData.length - 1}
        />
      ))}

      {/* Button */}
      <Button
        style={styles.button}
        onPress={() => {
          // Add your navigation logic here
        }}>
        See Details
      </Button>
    </Layout>
  );
};
const kittenStyles = StyleSheet.create({
  primaryText: {
    color: 'color-primary-500',
  },
});
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 5,
    shadowColor: 'rgba(0, 0, 0, 0.2)', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 14, // Shadow radius
    elevation: 4, // Elevation
  },
  button: {
    marginVertical: 16,
  },
});

export default DetailScreen;
