module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        ['module:react-native-dotenv', {
          moduleName: '@env',
          path: '.env',
        }],
        ['module-resolver', {
          root: ['./'],
          alias: {
            '@': './src',
            '~': './app',
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        }],
        'nativewind/babel',
        'react-native-reanimated/plugin'
      ],
    };
  };
  