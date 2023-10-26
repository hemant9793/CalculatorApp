export const calculateEMI = (
  principalAmount: number,
  monthlyInterestRate: number,
  loanTenureMonths: number,
): number => {
  const emiValue =
    (principalAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, loanTenureMonths)) /
    (Math.pow(1 + monthlyInterestRate, loanTenureMonths) - 1);
  return emiValue;
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

export function calculatePercentage(A: number, B: number, option: 'A' | 'B') {
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

export const convertToWordInIndianEnglish = (num: number) => {
  if (!num) {
    return 'Please Enter an Amount';
  }
  console.log('amountToWordsEnlish -> num', num);
  if ((num = num.toString()).length > 9) {
    return 'overflow';
  }
  let n = ('000000000' + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) {
    return;
  }
  var str = '';
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore '
      : '';
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh '
      : '';
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand '
      : '';
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred '
      : '';
  str +=
    n[5] != 0
      ? (str != '' ? 'and ' : '') +
        (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) +
        'only '
      : '';
  return str;
};

export function convertToWordInAmericanEnglish(number: number): string {
  if (!number) {
    return 'Please Enter an Amount';
  }
  const first: string[] = [
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
  const tens: string[] = [
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
  const mad: string[] = ['', 'thousand', 'million', 'billion', 'trillion'];
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
