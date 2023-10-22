import React from 'react';
import {Layout, Text, useStyleSheet, useTheme} from '@ui-kitten/components';
import {StyleSheet, FlatList} from 'react-native';

type ScheduleItem = {
  month: number;
  principal: number;
  interest: number;
  balance: number;
};

type AmortizationScheduleProps = {
  schedule: ScheduleItem[];
};

const AmortizationSchedule: React.FC<AmortizationScheduleProps> = ({
  schedule,
}) => {
  const kittenStyle = useStyleSheet(kittenStyles);
  const theme = useTheme();

  const titleList = ['Month', 'Principal', 'Interest', 'Balance'];

  return (
    <Layout style={kittenStyle.container}>
      <Layout style={kittenStyle.headerRow}>
        {titleList.map((title: string) => (
          <Text appearance="alternative" style={styles.headerCell}>
            {title}
          </Text>
        ))}
      </Layout>
      <FlatList
        data={schedule}
        keyExtractor={item => item.month.toString()}
        renderItem={({item}) => (
          <Layout
            key={item.month}
            style={[
              kittenStyle.row,
              {
                ...(item.month % 2 == 0
                  ? {backgroundColor: theme['color-basic-300']}
                  : {backgroundColor: theme['color-basic-200']}),
              },
            ]}>
            <Text style={styles.cell}>{item.month}</Text>
            <Text style={styles.cell}>{item.principal.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.interest.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.balance.toFixed(2)}</Text>
          </Layout>
        )}
      />
    </Layout>
  );
};

const kittenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'color-primary-400',
    padding: 5,
    paddingVertical: 6,
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    paddingVertical: 6,
  },
});

const styles = StyleSheet.create({
  headerCell: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default AmortizationSchedule;
