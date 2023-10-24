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
