export const  calculateEMI = (
    principalAmount: number,
    monthlyInterestRate: number,
    loanTenureMonths: number
  ): number => {
    const emiValue =
      (principalAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, loanTenureMonths)) /
      (Math.pow(1 + monthlyInterestRate, loanTenureMonths) - 1);
    return emiValue;
  }

  export const calculatePrincipal = (
    enteredEmi: number,
    monthlyInterestRate: number,
    loanTenureMonths: number
  )=>{
    const complexRateCalc = (1 + monthlyInterestRate) ** loanTenureMonths;
    const principal =
          (enteredEmi * (complexRateCalc - 1)) /
          (monthlyInterestRate * complexRateCalc);
    return principal
  }