import React, {useState} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Text, Icon, useTheme, Layout} from '@ui-kitten/components';

interface ExpandableRowProps {
  title: string;
  description: string;
  containerStyle?: Object;
}

const ExpandableRow: React.FC<ExpandableRowProps> = ({
  title,
  description,
  containerStyle,
}) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  return (
    <Layout style={[{borderRadius: 5}, containerStyle]}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          category="p1"
          style={{flex: 1, fontWeight: 'bold', color: 'black'}}>
          {title}
        </Text>
        <Icon
          name={expanded ? 'arrow-ios-upward' : 'arrow-ios-downward'}
          fill={theme['color-basic-600']}
          width={24}
          height={24}
        />
      </TouchableOpacity>
      {expanded && (
        <Text style={{marginTop: 10, color: theme['color-basic-600']}}>
          {description}
        </Text>
      )}
    </Layout>
  );
};

export default ExpandableRow;
