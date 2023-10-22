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
