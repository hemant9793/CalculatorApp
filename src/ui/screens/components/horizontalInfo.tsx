import React from 'react';
import {Text, Layout, useTheme} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {HorizontalInfoProps} from '@src/types';

const HorizontalInfo = ({
  title,
  value,
  showDivider,
  isHorizontal = true,
  textContainerStyle,
  horizontalTitleCategory,
  titleTextStyle,
}: HorizontalInfoProps) => {
  const theme = useTheme();
  if (isHorizontal) {
    return (
      <Layout style={[styles.container]}>
        <Layout style={[styles.textContainer, textContainerStyle]}>
          <Text
            category={horizontalTitleCategory ? horizontalTitleCategory : 'p1'}
            style={titleTextStyle}>
            {title}
          </Text>
          <Text status="primary" category="s1" style={styles.valueText}>
            {value}
          </Text>
        </Layout>
        {showDivider && <Layout style={styles.divider} />}
      </Layout>
    );
  } else {
    return (
      <Layout style={[styles.cardContainer, styles.card]}>
        <Text category="p1" style={[styles.cardTitle, titleTextStyle]}>
          {title}
        </Text>
        <Text
          status="primary"
          category="s1"
          style={[styles.cardValue, {color: theme['color-primary-500']}]}>
          {value}
        </Text>
      </Layout>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'white',
    // borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 10,
    flexDirection: 'row',
  },
  valueText: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#aab7c0',
  },
  cardContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardValue: {
    marginTop: 5,
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
});

export default HorizontalInfo;
