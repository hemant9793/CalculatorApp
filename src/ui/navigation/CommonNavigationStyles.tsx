import {ThemeType} from '@ui-kitten/components';

export const commonNavigationStyles = (theme: ThemeType) => {
  return {
    headerShown: true,
    headerStyle: {
      backgroundColor: theme['color-primary-500'],
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '500',
    },
  };
};
