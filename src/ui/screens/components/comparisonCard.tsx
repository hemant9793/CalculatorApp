import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {LoanComparisonCardProps} from '@src/types';

const LoanComparisonCard: React.FC<LoanComparisonCardProps> = ({
  cardTitle,
  title1,
  value1,
  title2,
  value2,
}) => {
  return (
    <Layout style={styles.card}>
      <Text category="h6" style={styles.header}>
        {cardTitle}
      </Text>
      <Layout style={styles.row}>
        <Layout style={styles.rowItem}>
          <Text style={styles.rowTitle}>{title1}</Text>
          <Text style={styles.rowValue}>{value1}</Text>
        </Layout>
        <Layout style={styles.rowItem}>
          <Text style={styles.rowTitle}>{title2}</Text>
          <Text style={styles.rowValue}>{value2}</Text>
        </Layout>
      </Layout>
      <Text style={styles.comparisonText}>
        {value1 > value2
          ? `${title1} is higher`
          : value1 < value2
          ? `${title2} is higher`
          : 'Both values are equal'}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    marginBottom: 12,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    // backgroundColor: 'red',
  },
  rowItem: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    // backgroundColor: 'yellow',
  },
  rowValue: {
    fontSize: 16,
    textAlign: 'center',
  },
  comparisonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoanComparisonCard;
