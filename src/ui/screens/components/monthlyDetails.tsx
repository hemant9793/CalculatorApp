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
      <Layout style={[kittenStyle.headerRow, kittenStyle.border]}>
        {titleList.map((title: string) => (
          <Text appearance="alternative" style={styles.headerCell}>
            {title}
          </Text>
        ))}
      </Layout>
      <FlatList
        data={schedule}
        keyExtractor={item => item.month.toString()}
        renderItem={({item, index}) => (
          <Layout
            key={item.month}
            style={[
              kittenStyle.row,
              {
                backgroundColor:
                  index % 2 === 0
                    ? theme['color-basic-200']
                    : theme['color-basic-1300'],
              },
              // Specify border styles for the cells
              kittenStyle.border,
              // Check if it's the last item in the row to set the right border
              index === schedule.length - 1 && {borderBottomWidth: 1},
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
    marginTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'color-primary-400',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  border: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'color-basic-1000',
  },
});

const styles = StyleSheet.create({
  headerCell: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 1,
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 5,
    borderRightWidth: 1,
    paddingHorizontal: 4,
  },
});

export default AmortizationSchedule;
