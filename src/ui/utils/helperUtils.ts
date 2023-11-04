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
