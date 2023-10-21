import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {AppScreenProps} from '@src/types';

const HomeScreen: React.FC<AppScreenProps<'HomeScreen'>> = ({
  route,
  navigation,
}) => {
  const data = [
    {key: 'Calculator 1'},
    {key: 'Calculator 2'},
    {key: 'Calculator 3'},
    // Add more calculator data here
  ];

  const onItemPress = () => {
    navigation.navigate('EmiCalculator');
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity style={styles.gridItem} onPress={onItemPress}>
        <Text style={styles.itemTextStyle}>{item.key}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Layout style={styles.container}>
      <FlatList
        data={data}
        numColumns={2} // Adjust the number of columns as needed
        contentContainerStyle={styles.gridContainer}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  gridContainer: {
    justifyContent: 'center',
  },
  itemTextStyle: {
    fontWeight: '500',
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    padding: 8,
  },
});

export default HomeScreen;
