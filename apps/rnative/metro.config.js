const path = require('path');
const getWorkspaces = require('get-yarn-workspaces');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const appJson = require('./package.json');

const rootPath = path.resolve(__dirname, '../../');
const workspaces = getWorkspaces(rootPath);
const installedDependencies = appJson.dependencies;

const extraNodeModules = {};
Object.keys(installedDependencies).forEach(dep => {
  extraNodeModules[dep] = path.resolve(__dirname, 'node_modules', dep);
});
Object.keys(appJson.devDependencies).forEach(dep => {
  extraNodeModules[dep] = path.resolve(__dirname, 'node_modules', dep);
});

module.exports = {
  projectRoot: path.resolve(rootPath, 'apps/rnative'),

  watchFolders: [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(rootPath, 'node_modules'),
    ...workspaces,
  ],

  resolver: {
    blacklistRE: exclusionList(
      workspaces.map(
        workspacePath =>
          `/${workspacePath.replace(
            /\//g,
            '[/\\\\]',
          )}[/\\\\]node_modules[/\\\\]react-native[/\\\\].*/`,
      ),
    ),
    extraNodeModules,
  },
  resetCache: true,
};
