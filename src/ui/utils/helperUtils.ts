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
