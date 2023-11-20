import {AdType, Ads} from '@src/types';
import {Layout} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const WIDTH = Dimensions.get('screen').width;

export const Advert: React.FC<Ads> = ({
  adType = AdType.BANNER,
  BannerSize,
  containerStyle,
}) => {
  const [adLoadSuccess, setAdLoadSuccess] = React.useState(true);

  const getAdStyleBasedOnSize = useCallback(() => {
    if (BannerSize == BannerAdSize.LARGE_BANNER) {
      return {left: WIDTH * 0.09};
    } else if (BannerSize == BannerAdSize.MEDIUM_RECTANGLE) {
      return {left: WIDTH * 0.112};
    }
  }, [BannerSize]);

  if (adLoadSuccess && adType == AdType.BANNER) {
    return (
      <Layout
        style={[styles.container, getAdStyleBasedOnSize(), containerStyle]}>
        <BannerAd
          unitId={adUnitId}
          size={BannerSize ? BannerSize : BannerAdSize.MEDIUM_RECTANGLE ?? ''}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdFailedToLoad={() => {
            setAdLoadSuccess(false);
          }}
        />
      </Layout>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: WIDTH * 0.112,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    flex: 1,
  },
});
