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
  oldTenureInMonths?: number;
};

const AmortizationSchedule: React.FC<AmortizationScheduleProps> = ({
  schedule,
  oldTenureInMonths,
}) => {
  console.log('schedule', schedule);
  const kittenStyle = useStyleSheet(kittenStyles);
  const theme = useTheme();

  const titleList = ['Month', 'Principal', 'Interest', 'Balance'];

  const renderItemCell = (text, isLastCell) => (
    <Text
      style={[
        styles.cell,
        isLastCell && {borderBottomWidth: 1}, // Set the right border for the last cell
      ]}>
      {text}
    </Text>
  );

  const renderScheduleItem = (item, index) => (
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
        kittenStyle.border, // Specify border styles for the cells
        index + 1 > oldTenureInMonths
          ? {backgroundColor: theme['color-danger-500']}
          : {},
        ,
      ]}>
      {renderItemCell(item.month, false)}
      {renderItemCell(item.principal.toFixed(2), false)}
      {renderItemCell(item.interest.toFixed(2), false)}
      {renderItemCell(item.balance.toFixed(2), index === schedule.length - 1)}
    </Layout>
  );

  return (
    <Layout style={kittenStyle.container}>
      <Layout style={[kittenStyle.headerRow, kittenStyle.border]}>
        {titleList.map((title: string) => (
          <Text appearance="alternative" style={styles.headerCell}>
            {title}
          </Text>
        ))}
      </Layout>
      {schedule.map((value: ScheduleItem, index: number) =>
        renderScheduleItem(value, index),
      )}
      {/* <FlatList
        data={schedule}
        keyExtractor={item => item.month.toString()}
        renderItem={renderScheduleItem}
      /> */}
    </Layout>
  );
};

const kittenStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
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
