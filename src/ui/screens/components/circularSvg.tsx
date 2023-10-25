import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, useTheme} from '@ui-kitten/components';
import Calculator from '@src/assets/svg/calculator.svg';
import CalculatorCoin from '@src/assets/svg/calculatorCoin.svg';
import Comparison from '@src/assets/svg/comparison.svg';
import FinancialPlanning from '@src/assets/svg/financialPlanning.svg';
import {SCREEN_NAMES} from '@src/ui/screendata/screendata';

interface SvgInCircleProps {
  width: number;
  height: number;
  color: string;
  name: string;
}

const SvgInCircle: React.FC<SvgInCircleProps> = ({
  width,
  height,
  name,
  color,
}) => {
  const theme = useTheme();
  const getSvgIcon = () => {
    switch (name) {
      case SCREEN_NAMES.FdCalculator:
        return <CalculatorCoin width={width} height={height} color={color} />;
      case SCREEN_NAMES.RdCalculator:
        return <CalculatorCoin width={width} height={height} color={color} />;
      case SCREEN_NAMES.EmiCalculator:
        return <Calculator width={width} height={height} color={color} />;
      case SCREEN_NAMES.CompareLoansScreen:
        return <Comparison width={width} height={height} color={color} />;
      case SCREEN_NAMES.PpfdCalculator:
        return (
          <FinancialPlanning width={width} height={height} color={color} />
        );

      default:
        break;
    }
  };
  return (
    <Layout
      style={[
        styles.container,
        {
          backgroundColor: theme['color-primary-500'],
          width: width + 15,
          height: height + 15,
          borderRadius: (height + 15) / 2,
        },
      ]}>
      {getSvgIcon()}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SvgInCircle;
