import React from 'react';
import {StyleSheet} from 'react-native';
import {PieChart as RNPieChart} from 'react-native-chart-kit';
import {Card} from '@ui-kitten/components';
import {PieChartProps} from '@src/types';

const PieChart = ({
  data,
  width,
  height,
  chartConfig,
  accessor,
}: PieChartProps) => {
  return (
    <Card style={[styles.container]}>
      <RNPieChart
        data={data}
        width={width}
        height={height}
        chartConfig={chartConfig}
        accessor={accessor}
        backgroundColor={'transparent'}
        paddingLeft={'0'}
        center={[-30, 0]}
        absolute
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default PieChart;
