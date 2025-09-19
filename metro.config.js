const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

const baseConfig = getDefaultConfig(__dirname);

const config = mergeConfig(baseConfig, {
  resolver: {
    sourceExts: [...baseConfig.resolver.sourceExts, 'cjs', 'ts', 'tsx'],
  },
});

module.exports = withNativeWind(config, {input: './src/global.css'});
