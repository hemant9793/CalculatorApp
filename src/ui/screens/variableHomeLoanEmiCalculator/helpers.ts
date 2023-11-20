export function formatRateRange(rateList: any[], initialRate: number) {
  if (!Array.isArray(rateList) || rateList.length === 0) {
    return '';
  }

  const rates = rateList.map(entry => parseFloat(entry.rate));
  rates.push(initialRate);
  const lowestRate = Math.min(...rates);
  const highestRate = Math.max(...rates);

  return `${lowestRate}% to ${highestRate}%`;
}
