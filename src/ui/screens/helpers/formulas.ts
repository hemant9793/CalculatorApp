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
  let n: number; // Compounding frequency per year
  if (compoundingFrequency === 'cumulative') {
    n = 1; // Compounded annually
  } else if (compoundingFrequency === 'quarterly') {
    n = 4; // Compounded quarterly
  } else {
    n = 12; // Compounded monthly
  }

  // Calculate the maturity amount with compound interest
  const r = rateOfInterest / (n * 100); // Monthly or quarterly interest rate
  const t = timePeriodInMonths / 12; // Time in years

  const maturityAmount = principal * Math.pow(1 + r, n * t);

  return maturityAmount;
}
