import React from 'react';
import {
  Layout,
  Button,
  useStyleSheet,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {STRINGS} from './strings'; // Assuming you have the strings file.
import {StyleSheet} from 'react-native';
import {EmitFooter} from '@src/types';

const EmiFooter = ({
  containerStyle,
  rightTitle,
  leftButtonVisible = true,
  leftTitle,
  rightButtonVisible = true,
  onResetPress,
  onCalculatePress,
}: EmitFooter) => {
  const kittenStyle = useStyleSheet(kittenStyles);
  const theme = useTheme();

  return (
    <Layout style={[styles.emiFooter, containerStyle]}>
      {leftButtonVisible && (
        <Button
          status="basic"
          onPress={onResetPress}
          style={kittenStyle.resetButton}>
          {() => (
            <Text style={{color: theme['color-primary-500']}}>
              {leftTitle ? leftTitle : STRINGS.RESET}
            </Text>
          )}
        </Button>
      )}
      {rightButtonVisible && (
        <Button
          status="primary"
          onPress={onCalculatePress}
          style={[
            kittenStyle.button,
            leftButtonVisible ? {} : {marginHorizontal: 11},
          ]}>
          {rightTitle ? rightTitle : STRINGS.CALCULATE_BUTTON}
        </Button>
      )}
    </Layout>
  );
};

const kittenStyles = StyleSheet.create({
  resetButton: {
    flex: 1,
    margin: 4,
    borderColor: 'color-primary-500',
    backgroundColor: 'color-basic-500',
    borderWidth: 2,
  },
  button: {
    flex: 1,
    margin: 4,
  },
});

const styles = StyleSheet.create({
  emiFooter: {
    flexDirection: 'row',
  },
});

export default EmiFooter;

// const principal = 10000
// const rate = 8/12/100
// const loantenuremonth = 12
// const GLOBAL_CONSTANTS = {
//   interestRateChanges: [{"month":4,"rate":1},
//   {"month":6,"rate":2}
//   ]
// }
// function convertFloatToInt(num: number): number {
//     if (num < 0) {
//         // Handle negative numbers if needed
//         return Math.floor(num);
//     }

//     return Math.ceil(num);
// }

// function getAllMonthInterestRate(interestChanges: any[],originalInterestRate:number,loanTenure:number) {
//   let outputDS: { [key: number]: number } = {};
//   let currentRate = originalInterestRate;

//   for (let i = 1; i <= loanTenure; i++) {
//     const rateChange = interestChanges.find(change => change.month === i);

//     if (rateChange) {
//         const monthlyRate = rateChange.rate/12/100
//       currentRate = monthlyRate;
//     }

//     outputDS[i] = currentRate;
//   }

//   return outputDS;
// }

// const calculateEMI = (
//   principalAmount: number,
//   monthlyInterestRate: number,
//   loanTenureMonths: number,
//   emiType: string,
// ): number => {
//   let emiValue = 0;
//     emiValue =
//       (principalAmount *
//         monthlyInterestRate *
//         Math.pow(1 + monthlyInterestRate, loanTenureMonths)) /
//       (Math.pow(1 + monthlyInterestRate, loanTenureMonths) - 1);
//   return emiValue;
// };
// const calculateAmortizationSchedule = (
//   principal: number,
//   monthlyInterestRate: number,
//   loanTerm: number,
//   emi: number,
// ) => {
//   // const monthlyInterestRate = annualInterestRate / 100 / 12;
//   const numberOfPayments = loanTerm;
//   const schedule = [];
//   let balance = principal;
//   const allmonthInterestRate = getAllMonthInterestRate(GLOBAL_CONSTANTS.interestRateChanges,monthlyInterestRate,loanTerm)
//   console.log('allmonthInterestRate',allmonthInterestRate)
//   for (let month = 1; month <= numberOfPayments; month++) {
//     const currentMonthIR = allmonthInterestRate[month]
//     const interestPaid = balance * currentMonthIR;
//     const principalPaid = emi>balance ? balance : emi - interestPaid;
//     balance -= principalPaid;

//     schedule.push({
//       month,
//       balance: balance <= 0.5 ? 0 : balance,
//       principal: principalPaid,
//       interest: interestPaid,
//     });

//   }
//   //   let lastMonthBalance = schedule[schedule.length-1].balance
//   // if(lastMonthBalance > 0 ){
//   //   const monthNumber = schedule[schedule.length-1].month
//   //   const lastMonthInterest = schedule[schedule.length-1].interest
//   //   while(lastMonthBalance > 0){
//   //       // const currentMonthIR = allmonthInterestRate[month]
//   //   const interestPaid = lastMonthBalance * lastMonthInterest;
//   //   const principalPaid = emi - interestPaid;
//   //   lastMonthBalance -= principalPaid;

//   //   schedule.push({
//   //     month:monthNumber+1,
//   //     balance: lastMonthBalance <= 0.5 ? 0 : lastMonthBalance,
//   //     principal: principalPaid,
//   //     interest: interestPaid,
//   //   });
//   //   }
//   // }

//   return schedule;
// };

// const calculateEmiWitInterestRateChanges = (
//   principal: number,
//   monthlyInterestRate: number,
//   loanTenureMonths: number,
//   emiType: string,
// ) => {
//   const oldEmi = calculateEMI(
//     principal,
//     monthlyInterestRate,
//     loanTenureMonths,
//     emiType,
//   );
//   console.log("oldEmi==>",oldEmi)
//   const scheduleWithOldEmi = calculateAmortizationSchedule(
//     principal,
//     monthlyInterestRate,
//     loanTenureMonths,
//     oldEmi,
//   );
//   console.log("scheduleWithOldEmi==>",scheduleWithOldEmi)
//   const balanceLastMonth = scheduleWithOldEmi[scheduleWithOldEmi.length-1].balance
//   const changesTenure =  Math.round((balanceLastMonth/oldEmi) * 100) / 100
//   console.log('changesTenure',changesTenure)
//   const inreasedTenure = loanTenureMonths+=convertFloatToInt(changesTenure)
//   console.log('inreasedTenure',inreasedTenure)

//   return
//   const interestChange = GLOBAL_CONSTANTS.interestRateChanges;
//   let upOrDownInterest = 0
//   let newNumberOfMonths = 0
//             interestChange.forEach((rateChange: { month: number; rate: number; }, index: number)=>{
//                 const {month,rate} = rateChange
//                 console.log('rateChange==>',rateChange)
//                 const remainingBalanceAmout = scheduleWithOldEmi[month-2].balance
//                 console.log('remainingBalanceAmout==>',remainingBalanceAmout)

//                 const newLoanTenure = index == interestChange.length-1 ? loanTenureMonths - month : interestChange[index+1].month - month
//                 console.log('newLoanTenure',newLoanTenure,newLoanTenure+1)
//                 const newEmi = calculateEMI(
//                             remainingBalanceAmout,
//                             rate / 12 / 100,
//                             newLoanTenure+1,
//                             emiType,
//                         );
//                 console.log('newEmi---->',newEmi)
//                 const totalAmountWithNewEmi = newEmi*newLoanTenure
//                 console.log('totalAmountWithNewEmi---->',totalAmountWithNewEmi)
//                 const totalAmountWithOldEmi = oldEmi*newLoanTenure
//                 console.log('totalAmountWithOldEmi---->',totalAmountWithOldEmi)

//                 if(totalAmountWithNewEmi > totalAmountWithOldEmi){
//                     let newTenuyre = (totalAmountWithNewEmi - totalAmountWithOldEmi)/oldEmi
//                     console.log('increasedTenure----->',newTenuyre)
//                     newTenuyre < 1 ? newNumberOfMonths += 1 : newNumberOfMonths +=newTenuyre
//                 }else{
//                     console.log('ignoring for now====>')
//                     let newTenuyre = (totalAmountWithOldEmi - totalAmountWithNewEmi)/oldEmi
//                     console.log('increasedTenure----->',newTenuyre)
//                     newTenuyre < 1 ? newNumberOfMonths -= 1 : newNumberOfMonths -=newTenuyre
//                 }
//             })
//   console.log('newNumberOfMonths',newNumberOfMonths,convertFloatToInt(newNumberOfMonths))
//   console.log('newTenureMonht',loanTenureMonths+convertFloatToInt(newNumberOfMonths),)
// }
// ;

// calculateEmiWitInterestRateChanges(principal,rate,loantenuremonth,"reducing")

//TODO fixed amortization for remaining month

// const principal = 10000
// const rate = 8/12/100
// const loantenuremonth = 12
// const GLOBAL_CONSTANTS = {
//   interestRateChanges: [{"month":4,"rate":60},
//   {"month":6,"rate":70}
//   ]
// }
// function convertFloatToInt(num: number): number {
//     if (num < 0) {
//         // Handle negative numbers if needed
//         return Math.floor(num);
//     }

//     return Math.ceil(num);
// }

// function getAllMonthInterestRate(interestChanges: any[],originalInterestRate:number,loanTenure:number) {
//   let outputDS: { [key: number]: number } = {};
//   let currentRate = originalInterestRate;

//   for (let i = 1; i <= loanTenure; i++) {
//     const rateChange = interestChanges.find(change => change.month === i);

//     if (rateChange) {
//         const monthlyRate = rateChange.rate/12/100
//       currentRate = monthlyRate;
//     }

//     outputDS[i] = currentRate;
//   }

//   return outputDS;
// }

// const calculateEMI = (
//   principalAmount: number,
//   monthlyInterestRate: number,
//   loanTenureMonths: number,
//   emiType: string,
// ): number => {
//   let emiValue = 0;
//     emiValue =
//       (principalAmount *
//         monthlyInterestRate *
//         Math.pow(1 + monthlyInterestRate, loanTenureMonths)) /
//       (Math.pow(1 + monthlyInterestRate, loanTenureMonths) - 1);
//   return emiValue;
// };
// const calculateAmortizationSchedule = (
//   principal: number,
//   monthlyInterestRate: number,
//   loanTerm: number,
//   emi: number,
// ) => {
//   const numberOfPayments = loanTerm;
//   const schedule = [];
//   let balance = principal;
//   const allmonthInterestRate = getAllMonthInterestRate(GLOBAL_CONSTANTS.interestRateChanges, monthlyInterestRate, loanTerm);
//   console.log('allmonthInterestRate', allmonthInterestRate);

//   let month = 1;

//   while (balance > 0.5) {
//     const currentMonthIR = allmonthInterestRate[month] ?  allmonthInterestRate[month] : allmonthInterestRate[loanTerm];
//     const interestPaid = balance * currentMonthIR;
//     const principalPaid = emi > balance ? balance : emi - interestPaid;
//     balance -= principalPaid;

//     schedule.push({
//       month,
//       balance: balance <= 0.5 ? 0 : balance,
//       principal: principalPaid,
//       interest: interestPaid,
//     });

//     month++;
//   }

//   return schedule;
// };

// // const calculateAmortizationSchedule = (
// //   principal: number,
// //   monthlyInterestRate: number,
// //   loanTerm: number,
// //   emi: number,
// // ) => {
// //   // const monthlyInterestRate = annualInterestRate / 100 / 12;
// //   const numberOfPayments = loanTerm;
// //   const schedule = [];
// //   let balance = principal;
// //   const allmonthInterestRate = getAllMonthInterestRate(GLOBAL_CONSTANTS.interestRateChanges,monthlyInterestRate,loanTerm)
// //   console.log('allmonthInterestRate',allmonthInterestRate)
// //   for (let month = 1; month <= numberOfPayments; month++) {
// //     const currentMonthIR = allmonthInterestRate[month]
// //     const interestPaid = balance * currentMonthIR;
// //     const principalPaid = emi>balance ? balance : emi - interestPaid;
// //     balance -= principalPaid;

// //     schedule.push({
// //       month,
// //       balance: balance <= 0.5 ? 0 : balance,
// //       principal: principalPaid,
// //       interest: interestPaid,
// //     });

// //   }
// //     let lastMonthBalance = schedule[schedule.length-1].balance
// //     console.log('lastMonthBalance',lastMonthBalance)

// //   return schedule;
// // };

// const calculateEmiWitInterestRateChanges = (
//   principal: number,
//   monthlyInterestRate: number,
//   loanTenureMonths: number,
//   emiType: string,
// ) => {
//   const oldEmi = calculateEMI(
//     principal,
//     monthlyInterestRate,
//     loanTenureMonths,
//     emiType,
//   );
//   console.log("oldEmi==>",oldEmi)
//   const scheduleWithOldEmi = calculateAmortizationSchedule(
//     principal,
//     monthlyInterestRate,
//     loanTenureMonths,
//     oldEmi,
//   );
//   console.log("scheduleWithOldEmi==>",scheduleWithOldEmi)
//   const balanceLastMonth = scheduleWithOldEmi[scheduleWithOldEmi.length-1].balance
//   const changesTenure =  Math.round((balanceLastMonth/oldEmi) * 100) / 100
//   console.log('changesTenure',changesTenure)
//   const inreasedTenure = loanTenureMonths+=convertFloatToInt(changesTenure)
//   console.log('inreasedTenure',inreasedTenure)

//   return
//   const interestChange = GLOBAL_CONSTANTS.interestRateChanges;
//   let upOrDownInterest = 0
//   let newNumberOfMonths = 0
//             interestChange.forEach((rateChange: { month: number; rate: number; }, index: number)=>{
//                 const {month,rate} = rateChange
//                 console.log('rateChange==>',rateChange)
//                 const remainingBalanceAmout = scheduleWithOldEmi[month-2].balance
//                 console.log('remainingBalanceAmout==>',remainingBalanceAmout)

//                 const newLoanTenure = index == interestChange.length-1 ? loanTenureMonths - month : interestChange[index+1].month - month
//                 console.log('newLoanTenure',newLoanTenure,newLoanTenure+1)
//                 const newEmi = calculateEMI(
//                             remainingBalanceAmout,
//                             rate / 12 / 100,
//                             newLoanTenure+1,
//                             emiType,
//                         );
//                 console.log('newEmi---->',newEmi)
//                 const totalAmountWithNewEmi = newEmi*newLoanTenure
//                 console.log('totalAmountWithNewEmi---->',totalAmountWithNewEmi)
//                 const totalAmountWithOldEmi = oldEmi*newLoanTenure
//                 console.log('totalAmountWithOldEmi---->',totalAmountWithOldEmi)

//                 if(totalAmountWithNewEmi > totalAmountWithOldEmi){
//                     let newTenuyre = (totalAmountWithNewEmi - totalAmountWithOldEmi)/oldEmi
//                     console.log('increasedTenure----->',newTenuyre)
//                     newTenuyre < 1 ? newNumberOfMonths += 1 : newNumberOfMonths +=newTenuyre
//                 }else{
//                     console.log('ignoring for now====>')
//                     let newTenuyre = (totalAmountWithOldEmi - totalAmountWithNewEmi)/oldEmi
//                     console.log('increasedTenure----->',newTenuyre)
//                     newTenuyre < 1 ? newNumberOfMonths -= 1 : newNumberOfMonths -=newTenuyre
//                 }
//             })
//   console.log('newNumberOfMonths',newNumberOfMonths,convertFloatToInt(newNumberOfMonths))
//   console.log('newTenureMonht',loanTenureMonths+convertFloatToInt(newNumberOfMonths),)
// }
// ;

// calculateEmiWitInterestRateChanges(principal,rate,loantenuremonth,"reducing")
