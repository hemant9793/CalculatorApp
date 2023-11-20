import Clipboard from '@react-native-clipboard/clipboard';

export const copyToClipboard = (stringData: string) => {
  let copySuccess = false;
  try {
    Clipboard.setString(stringData ?? '');
    copySuccess = true;
  } catch (error) {
    console.log(error);
  }
  return copySuccess;
};

export function numberWithCommas(x: number) {
  return x.toString().split('.')[0].length > 3
    ? x
        .toString()
        .substring(0, x.toString().split('.')[0].length - 3)
        .replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
        ',' +
        x.toString().substring(x.toString().split('.')[0].length - 3)
    : x.toString();
}

export const monthsToYearsAndMonths = (numMonths: number): string => {
  if (numMonths <= 0) {
    return 'Invalid input';
  }

  const years = Math.floor(numMonths / 12);
  const remainingMonths = numMonths % 12;

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    return `${years} year${years > 1 ? 's' : ''}`;
  } else {
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${
      remainingMonths > 1 ? 's' : ''
    }`;
  }
};
