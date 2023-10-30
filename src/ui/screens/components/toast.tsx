import Toast from 'react-native-toast-message';

interface ToastParams {
  text1: string;
  type?: string;
  text2?: string;
}

export const showToast = (params: ToastParams): void => {
  Toast.show({
    type: params?.type ? params?.type : 'success',
    text1: params.text1,
    text2: params.text2,
    position: 'bottom',
    visibilityTime: 1500,
  });
};
