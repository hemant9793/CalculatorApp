import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Card, Text, useStyleSheet} from '@ui-kitten/components';

interface KeyValue {
  title: string;
  value: number | string;
}

interface GridComponentProps {
  data: KeyValue[];
}

const GridComponent: React.FC<GridComponentProps> = ({data}) => {
  const groupedData: KeyValue[][] = [];
  const renderCardItem = ({title, value}: KeyValue) => (
    <Card key={title} style={styles.card}>
      <Text category="h6" style={{textAlign: 'center', marginBottom: 4}}>
        {title}
      </Text>
      <Text style={[kittenStyles.primaryColor, kittenStyles.centeredText]}>
        {value}
      </Text>
    </Card>
  );

  const renderRow = (rowData: KeyValue[]) => (
    <Layout key={rowData[0].title} style={styles.row} level="2">
      {rowData?.map(renderCardItem)}
    </Layout>
  );

  for (let i = 0; i < data.length; i += 2) {
    groupedData?.push(data.slice(i, i + 2));
  }

  return (
    <Layout style={styles.container}>{groupedData?.map(renderRow)}</Layout>
  );
};

const kittenStyles = StyleSheet.create({
  primaryColor: {
    color: '#0079B9',
    fontWeight: 'bold',
  },
  centeredText: {
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 4,
    paddingHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default GridComponent;
