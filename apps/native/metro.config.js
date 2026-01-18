//app/native/metro.config.js
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1️⃣ Allow Metro to watch workspace files
config.watchFolders = [workspaceRoot];

// 2️⃣ Tell Metro how to resolve @repo/ui
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3️⃣ Force symlink support (VERY important)
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
