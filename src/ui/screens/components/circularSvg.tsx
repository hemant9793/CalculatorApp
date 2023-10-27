import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, useTheme} from '@ui-kitten/components';
import Calculator from '@src/assets/svg/calculator1.svg';
import CalculatorCoin from '@src/assets/svg/calculatorCoin.svg';
import Safebox from '@src/assets/svg/safebox.svg';
import Comparison from '@src/assets/svg/comparison.svg';
import Rupee from '@src/assets/svg/rupee.svg';
import Rd from '@src/assets/svg/rd.svg';
import Alphabetmoney from '@src/assets/svg/alphabetmoney.svg';
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
        return <Safebox width={width - 6} height={height - 6} color={color} />;
      case SCREEN_NAMES.RdCalculator:
        return <Rd width={width - 6} height={height - 6} color={color} />;
      case SCREEN_NAMES.EmiCalculator:
        return (
          <Calculator width={width - 6} height={height - 6} color={color} />
        );
      case SCREEN_NAMES.CompareLoansScreen:
        return (
          <Comparison width={width - 6} height={height - 3} color={color} />
        );
      case SCREEN_NAMES.AmountToWordsScreen:
        return (
          <Alphabetmoney width={width - 6} height={height - 6} color={color} />
        );
      case SCREEN_NAMES.MoneyTotallerScreen:
        return <Rupee width={width - 6} height={height - 6} color={color} />;
      case SCREEN_NAMES.PpfdCalculator:
        return (
          <FinancialPlanning
            width={width - 6}
            height={height - 6}
            color={color}
          />
        );

      default:
        break;
    }
  };
  return (
    <Layout
      style={[
        {
          width: width + 25,
          height: height + 25,
          borderRadius: (height + 25) / 2,
          borderColor: theme['color-primary-400'],
          backgroundColor: theme['color-basic-500'],
        },
        styles.outerContainer,
      ]}>
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerContainer: {
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SvgInCircle;
