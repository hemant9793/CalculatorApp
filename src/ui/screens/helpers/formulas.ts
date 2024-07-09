import {GLOBAL_CONSTANTS} from '@src/constants';

export const calculateEMI = (
  principalAmount: number,
  monthlyInterestRate: number,
  loanTenureMonths: number,
  emiType?: string,
): number => {
  let emiValue = 0;
  if (emiType == 'Flat') {
    //emin in arrears
    const annualInterestRate = monthlyInterestRate * 12 * 100;
    const totalInterest =
      (principalAmount * annualInterestRate * (loanTenureMonths / 12)) / 100;
    const totalAmount = principalAmount + totalInterest;
    emiValue = totalAmount / loanTenureMonths;
  } else {
    //emin in arrears
    emiValue =
      (principalAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, loanTenureMonths)) /
      (Math.pow(1 + monthlyInterestRate, loanTenureMonths) - 1);
  }
  return emiValue;
};

export const calculateAmortizationSchedule = (
  principal: number,
  monthlyInterestRate: number,
  loanTerm: number,
  emi: number,
) => {
  // const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTerm;

  const schedule = [];

  let balance = principal;
  for (let month = 1; month <= numberOfPayments; month++) {
    const interestPaid = balance * monthlyInterestRate;
    const principalPaid = emi - interestPaid;
    balance -= principalPaid;

    schedule.push({
      month,
      balance: roundNumber(balance <= 0.5 ? 0 : balance),
      principal: roundNumber(principalPaid),
      interest: roundNumber(interestPaid),
    });
  }

  return schedule;
};

export const calculateEmiWitInterestRateChanges = (
  principal: number,
  monthlyInterestRate: number,
  loanTenureMonths: number,
  emiType: string,
) => {
  const oldEmi = calculateEMI(
    principal,
    monthlyInterestRate,
    loanTenureMonths,
    emiType,
  );
  const scheduleWithOldEmi = calculateAmortizationSchedule(
    principal,
    monthlyInterestRate,
    loanTenureMonths,
    oldEmi,
  );
  const interestChange = GLOBAL_CONSTANTS.interestRateChanges;
  console.log('scheduleWithOldEmi', scheduleWithOldEmi);
  const changeMonthBalanceAmount =
    scheduleWithOldEmi[interestChange[0].month - 1];
  console.log(
    'changeMonthBalanceAmount',
    changeMonthBalanceAmount,
    interestChange[0],
    loanTenureMonths - interestChange[0].month,
  );
  const newEmi = calculateEMI(
    changeMonthBalanceAmount.balance,
    interestChange[0].rate / 12 / 100,
    loanTenureMonths - interestChange[0].month,
    emiType,
  );
  console.log('newEmi', newEmi);
  const increasedMonth =
    (newEmi * (loanTenureMonths - interestChange[0].month)) / oldEmi;
  console.log('increasedMonth', increasedMonth);
};

export const calculatePrincipal = (
  enteredEmi: number,
  monthlyInterestRate: number,
  loanTenureMonths: number,
) => {
  const complexRateCalc = (1 + monthlyInterestRate) ** loanTenureMonths;
  const principal =
    (enteredEmi * (complexRateCalc - 1)) /
    (monthlyInterestRate * complexRateCalc);
  return principal;
};

export function calculatePercentage(
  A?: number,
  B?: number,
  option?: 'A' | 'B',
) {
  if (!A || !B) {
    return;
  }
  const total = A + B;
  let percentage;
  if (option === 'A') {
    percentage = ((A / total) * 100).toFixed(2);
  } else if (option === 'B') {
    percentage = ((B / total) * 100).toFixed(2);
  }

  return parseFloat(percentage); // Return undefined if the option is invalid
}

export const roundNumber = (num: number) => {
  return Math.round(num * 100) / 100;
};

export function addTimeToDate(baseDate: Date, months: number): Date {
  console.log('baseDate', baseDate);
  const resultDate = new Date(baseDate);

  if (months !== 0) {
    resultDate.setMonth(resultDate.getMonth() + months);
  }

  console.log('resultDate', resultDate);

  return resultDate;
}

export function calculateFDMaturityAmount(
  principal: number,
  rateOfInterest: number,
  timePeriodInMonths: number,
  compoundingFrequency: string,
): number {
  if (compoundingFrequency === 'Simple Interest') {
    // Calculate the maturity amount with simple interest
    const r = rateOfInterest / (12 * 100); // Monthly interest rate
    const t = timePeriodInMonths / 12; // Time in years

    const maturityAmount = principal * (1 + r * t);

    return maturityAmount;
  } else {
    let n: number; // Compounding frequency per year

    if (compoundingFrequency === 'Compounded Yearly') {
      n = 1; // Compounded annually
    } else if (compoundingFrequency === 'Compounded Quarterly') {
      n = 4; // Compounded quarterly
    } else if (compoundingFrequency === 'Compounded Half Yearly') {
      n = 2; // Compounded semi-annually
    } else {
      n = 12; // Compounded monthly
    }

    // Calculate the maturity amount with compound interest
    const r = rateOfInterest / (n * 100); // Monthly, quarterly, or half-yearly interest rate
    const t = timePeriodInMonths / 12; // Time in years

    const maturityAmount = principal * Math.pow(1 + r, n * t);

    return maturityAmount;
  }
}
const monthsToQuarters = (months: number) => {
  return (months / 3).toFixed(2);
};

export const calculateRDMaturity = (
  MonthlyDeposit: number,
  numOfMonths: number,
  interestRate: number,
) => {
  const i = interestRate / 400; // compounded quarterly
  const numOfQuarters = monthsToQuarters(numOfMonths);
  const numerator = Math.pow(1 + i, parseFloat(numOfQuarters)) - 1;
  const denominator = 1 - Math.pow(1 + i, -1 / 3);
  const maturityAmount = MonthlyDeposit * (numerator / denominator);
  const maturedRd = parseFloat(maturityAmount.toFixed(2));
  return {
    maturedRd,
    totalInterest: roundNumber(maturedRd - MonthlyDeposit * numOfMonths),
  };
};

export function calculatePPFMaturity(
  annualPayment: number,
  interestRate: number,
  numberOfYears: number,
): number {
  const interestRateDecimal = interestRate / 100;
  const M =
    annualPayment *
    (((Math.pow(1 + interestRateDecimal, numberOfYears) - 1) /
      interestRateDecimal) *
      (1 + interestRateDecimal));
  return parseFloat(M.toFixed(2)); // Convert to a number and round to two decimal places
}

export function calculateAnnualPpfPayment(paymentMode: string, amount: number) {
  switch (paymentMode) {
    case 'Yearly':
      return amount * 1;
    case 'Half Yearly':
      return amount * 2;
    case 'Quarterly':
      return amount * 4;
    case 'Monthly':
      return amount * 12;
  }
}

var a = [
  '',
  'one ',
  'two ',
  'three ',
  'four ',
  'five ',
  'six ',
  'seven ',
  'eight ',
  'nine ',
  'ten ',
  'eleven ',
  'twelve ',
  'thirteen ',
  'fourteen ',
  'fifteen ',
  'sixteen ',
  'seventeen ',
  'eighteen ',
  'nineteen ',
];
var b = [
  '',
  '',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];

const TEN = 10;
const ONE_HUNDRED = 100;
const ONE_THOUSAND = 1000;
const ONE_LAC = 100000;
const ONE_CRORE = 10000000;
const ONE_ARAB = 1000000000;
const ONE_KHARAB = 100000000000;
const MAX = 9999999999999;

const unitDigits = [
  'ZERO',
  'ONE',
  'TWO',
  'THREE',
  'FOUR',
  'FIVE',
  'SIX',
  'SEVEN',
  'EIGHT',
  'NINE',
  'TEN',
  'ELEVEN',
  'TWELVE',
  'THIRTEEN',
  'FOURTEEN',
  'FIFTEEN',
  'SIXTEEN',
  'SEVENTEEN',
  'EIGHTEEN',
  'NINETEEN',
];
const tensDigits = [
  'ZERO',
  'TEN',
  'TWENTY',
  'THIRTY',
  'FORTY',
  'FIFTY',
  'SIXTY',
  'SEVENTY',
  'EIGHTY',
  'NINETY',
];

function generateWords(number: number) {
  let remainder, word;
  let words = arguments[1];

  // We’re done
  if (number === 0) {
    // console.log(words, 'words');
    return !words ? 'ZERO' : words.join(' ').replace(/,$/, '');
  }
  // handle first time case: words will be undefined at first run
  if (!words) {
    words = [];
  }
  // If negative, prepend “minus”
  if (number < 0) {
    words.push('minus');
    number = Math.abs(number);
  }

  if (number < 20) {
    remainder = 0;
    word = unitDigits[number];
  } else if (number < ONE_HUNDRED) {
    remainder = number % TEN;
    word = tensDigits[Math.floor(number / TEN)];
    // In case of remainder, we need to handle it here to be able to add the “-”
    if (remainder) {
      word += '-' + unitDigits[remainder];
      remainder = 0;
    }
  } else if (number < ONE_THOUSAND) {
    remainder = number % ONE_HUNDRED;
    word = generateWords(Math.floor(number / ONE_HUNDRED)) + ' HUNDRED';
  } else if (number < ONE_LAC) {
    remainder = number % ONE_THOUSAND;
    word = generateWords(Math.floor(number / ONE_THOUSAND)) + ' THOUSAND,';
  } else if (number < ONE_CRORE) {
    remainder = number % ONE_LAC;
    word = generateWords(Math.floor(number / ONE_LAC)) + ' LAC,';
  } else if (number < ONE_ARAB) {
    remainder = number % ONE_CRORE;
    word = generateWords(Math.floor(number / ONE_CRORE)) + ' CRORE,';
  } else if (number < ONE_KHARAB) {
    // console.log(Math.floor(number / ONE_ARAB));
    remainder = number % ONE_ARAB;
    word = generateWords(Math.floor(number / ONE_ARAB)) + ' ARAB,';
  } else if (number < MAX) {
    remainder = number % ONE_KHARAB;
    word = generateWords(Math.floor(number / ONE_KHARAB)) + ' KHARAB';
  }
  words.push(word);
  return generateWords(remainder, words);
}

// characterCase can be of 3 types capital (default), lowercase or uppercase
export function indianConversion(
  number: number,
  {characterCase = 'capital'} = {},
) {
  let words = generateWords(number);
  // and can only be in uppercase if the characterCase = uppercase, otherwise it will always be of lowercase (in case of both capital and lowercase)
  let and = 'and ';
  if (characterCase === 'uppercase') {
    and = 'AND ';
  }

  words = words.split(' ');

  let transformedWords;
  if (characterCase === 'capital') {
    transformedWords = words.map(word => {
      const index = word.indexOf('-');
      if (index >= 0) {
        let indexSeparatedWord = word
          .split('-')
          .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
          .join('-');
        return indexSeparatedWord;
      } else {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      }
    });
    // word[0].toUpperCase() + word.slice(1).toLowerCase()
    // return transformedWords;
  } else if (characterCase === 'lowercase') {
    transformedWords = words.map(word => word.toLowerCase());
  } else {
    transformedWords = words;
  }

  if (transformedWords.length <= 2) {
    // dont add AND word if the sentence contains less than two words.
    return transformedWords.join(' ') + '.';
  }
  // check if previous word has comma?
  const index = transformedWords[transformedWords.length - 2].indexOf(',');
  if (index >= 0) {
    transformedWords[transformedWords.length - 2] = transformedWords[
      transformedWords.length - 2
    ].substr(0, index);
  }
  transformedWords[transformedWords.length - 1] =
    and + transformedWords[transformedWords.length - 1];
  return transformedWords.join(' ') + '.';
}

export function convertToWordInAmericanEnglish(number: number): string {
  if (!number) {
    return 'Please Enter an Amount';
  }
  const first = [
    '',
    'One ',
    'Two ',
    'Three ',
    'Four ',
    'Five ',
    'Six ',
    'Seven ',
    'Eight ',
    'Nine ',
    'Ten ',
    'Eleven ',
    'Twelve ',
    'Thirteen ',
    'Fourteen ',
    'Fifteen ',
    'Sixteen ',
    'Seventeen ',
    'Eighteen ',
    'Nineteen ',
  ];

  const tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];

  const mad = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  let word = '';

  for (let i = 0; i < mad.length; i++) {
    let tempNumber = number % (100 * Math.pow(1000, i));
    if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
      if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
        word =
          first[Math.floor(tempNumber / Math.pow(1000, i))] +
          mad[i] +
          ' ' +
          word;
      } else {
        word =
          tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] +
          '-' +
          first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] +
          mad[i] +
          ' ' +
          word;
      }
    }

    tempNumber = number % Math.pow(1000, i + 1);
    if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0) {
      word =
        first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] +
        'hunderd ' +
        word;
    }
  }
  return word;
}

//In hindi
const zeroTo99: string[] =
  '|एक|दो|तीन|चार|पाँच|छः|सात|आठ|नौ|दश|ग्यारह|बारह|तेरह|चौदह|पन्द्रह|सोलह|सत्रह|अठारह|उन्नीस|बीस|इक्कीस|बाईस|तेईस|चौबीस|पच्चीस|छब्बीस|सत्ताईस|अट्ठाईस|उनतीस|तीस|इकतीस|बत्तीस|तैंतीस|चौंतीस|पैंतीस|छत्तीस|सैंतीस|अड़तीस|उनतालीस|चालीस|इकतालीस|बयालीस|तैंतालीस|चौवालीस|पैंतालीस|छियालीस|सैंतालीस|अड़तालीस|उनचास|पचास|इक्यावन|बावन|तिरपन|चौवन|पचपन|छप्पन|सत्तावन|अट्ठावन|उनसठ|साठ|इकसठ|बासठ|तिरसठ|चौंसठ|पैंसठ|छियासठ|सड़सठ|अड़सठ|उनहत्तर|सत्तर|इकहत्तर|बहत्तर|तिहत्तर|चौहत्तर|पचहत्तर|छिहत्तर|सतहत्तर|अठहत्तर|उन्यासी|अस्सी|इक्यासी|बयासी|तिरासी|चौरासी|पचासी|छियासी|सत्तासी|अट्ठासी|नवासी|नब्बे|इक्यानबे|बानबे|तिरानबे|चौरानबे|पंचानबे|छियानबे|सत्तानबे|अट्ठानबे|निन्यान्बे'.split(
    '|',
  );

const place: string[] = 'हज़ार|लाख|करोड़|अरब|खरब|नील'.split('|');

export function convertToWordInHindi(x: string): string {
  if (!x) {
    return 'कृपया एक राशि दर्ज करें';
  }
  let n: number = x.length;
  x = n === 0 ? '00' : n === 1 || n % 2 === 0 ? '0' + x : x;
  n = x.length;
  let r: string =
    zeroTo99[x.charCodeAt((n -= 2)) * 10 + x.charCodeAt(n + 1) - 528];
  if (n > 0) {
    const v: string = zeroTo99[x.charCodeAt((n -= 1)) - 48];
    if (v) {
      r = v + ' सौ' + (r ? ' ' + r : '');
    }
  }
  for (let i = 0; n > 0; i++) {
    const v: string =
      zeroTo99[x.charCodeAt((n -= 2)) * 10 + x.charCodeAt(n + 1) - 528];
    if (v) {
      r = v + ' ' + place[i] + (r ? ' ' + r : '');
    }
  }
  return r || 'शून्य';
}

function getAllMonthInterestRate(
  interestChanges: any[],
  originalInterestRate: number,
  loanTenure: number,
) {
  let outputDS: {[key: number]: number} = {};
  let currentRate = originalInterestRate;

  for (let i = 1; i <= loanTenure; i++) {
    const rateChange = interestChanges.find(change => change.month == i);

    if (rateChange) {
      const monthlyRate = rateChange.rate / 12 / 100;
      currentRate = monthlyRate;
    }

    outputDS[i] = currentRate;
  }

  return outputDS;
}

function convertFloatToInt(num: number): number {
  if (num < 0) {
    // Handle negative numbers if needed
    return Math.floor(num);
  }

  return Math.ceil(num);
}

const calculateAmortizationScheduleWithChangingInterestRate = (
  principal: number,
  monthlyInterestRate: number,
  loanTerm: number,
  emi: number,
) => {
  const schedule = [];
  let balance = principal;
  const allmonthInterestRate = getAllMonthInterestRate(
    GLOBAL_CONSTANTS.interestRateChanges,
    monthlyInterestRate,
    loanTerm,
  );

  let month = 1;

  while (balance > 0.5) {
    const currentMonthIR = allmonthInterestRate[month]
      ? allmonthInterestRate[month]
      : allmonthInterestRate[loanTerm];
    const interestPaid = balance * currentMonthIR;
    const principalPaid = emi > balance ? balance : emi - interestPaid;
    balance -= principalPaid;

    schedule.push({
      month,
      balance: roundNumber(balance <= 0.5 ? 0 : balance),
      principal: roundNumber(principalPaid),
      interest: roundNumber(interestPaid),
    });

    month++;
  }

  return schedule;
};

export const calculateVariableInterestRateData = (
  principal: number,
  monthlyInterestRate: number,
  loanTenureMonths: number,
  emiType: string,
) => {
  const oldEmi = calculateEMI(
    principal,
    monthlyInterestRate,
    loanTenureMonths,
    emiType,
  );
  // console.log('oldEmi==>', oldEmi);

  const scheduleWithOldEmi =
    calculateAmortizationScheduleWithChangingInterestRate(
      principal,
      monthlyInterestRate,
      loanTenureMonths,
      oldEmi,
    );
  // console.log('scheduleWithOldEmi==>', scheduleWithOldEmi);
  const totalNewInterest = scheduleWithOldEmi.reduce(
    (acc, entry) => acc + entry.interest,
    0,
  );

  // console.log('Total New Interest: ', totalNewInterest);

  //old interest
  const scheduleWithOldEmiOldAmort = calculateAmortizationSchedule(
    principal,
    monthlyInterestRate,
    loanTenureMonths,
    oldEmi,
  );
  // console.log("scheduleWithOldEmiOldAmort==>",scheduleWithOldEmiOldAmort)
  const totalOldInterest = scheduleWithOldEmiOldAmort.reduce(
    (acc, entry) => acc + entry.interest,
    0,
  );
  // console.log('Total Old Interest: ', totalOldInterest);

  // console.log('changes interest===>', totalOldInterest - totalNewInterest);
  //new work
  const balanceLastMonth =
    scheduleWithOldEmi[scheduleWithOldEmi.length - 1].balance;
  const changesTenure = Math.round((balanceLastMonth / oldEmi) * 100) / 100;
  // console.log('changesTenure', changesTenure);
  const increasedTenure = (loanTenureMonths +=
    convertFloatToInt(changesTenure));
  // console.log('inreasedTenure', increasedTenure);
  const calculatedData = {
    monthlyData: scheduleWithOldEmi,
    newTenure: scheduleWithOldEmi.length
      ? scheduleWithOldEmi.length
      : increasedTenure,
    emi: roundNumber(oldEmi),
    totalOldInterest: roundNumber(totalOldInterest),
    totalNewInterest: roundNumber(totalNewInterest),
  };

  return calculatedData;
};

export function removeCommasAndPeriods(input: string): string {
  if (!input) {
    return '';
  }

  // Use regular expression to remove commas and periods
  const cleanedString = input.replace(/[,\.]/g, '');

  return cleanedString;
}
