module.exports = {
  presets: ['module:metro-react-native-babel-preset'], // existing
  // add the following
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@src': './src',
        },
      },
    ],
  ],
};