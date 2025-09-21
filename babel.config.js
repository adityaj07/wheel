module.exports = {
  presets: ["module:@react-native/babel-preset", "nativewind/babel"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@": "./src",
        },
      },
    ],
    "@babel/plugin-proposal-export-namespace-from",
    "react-native-worklets/plugin",
  ],
};
