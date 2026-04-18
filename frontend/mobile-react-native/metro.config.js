const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const existingBlockList = config.resolver.blockList;
const autolinkingBuildPathPattern = /node_modules[\\/]expo-modules-autolinking[\\/]android[\\/].*[\\/]build[\\/].*/;

if (existingBlockList instanceof RegExp) {
  config.resolver.blockList = new RegExp(
    `${existingBlockList.source}|${autolinkingBuildPathPattern.source}`
  );
} else {
  config.resolver.blockList = autolinkingBuildPathPattern;
}

module.exports = config;
