## `Commands`

#### `yarn setup`
Clean everything that git ignores, install, build and install pods.
#### `yarn android:start || yarn ios:start`
Run the demo app on android/ios without listening to changes in the code.
#### `yarn android:start-watch || yarn ios:start-watch`
Build typescript and run the demo app on android/ios. Typescript watches changes in the code and compile again for each change- makes the demo app respond to changes in the native parts (meaning - not for the web-assets).
#### `yarn build`
Build typescript and then build the web-assets of the editor and the plugins.

## `Adding a plugin`

- Create a new folder with the plugin's name in packages
#### `Handle web assets`
- Create path in the new package: src/web-assets/src.
- In src/web-assets/src, create a ts file that exports a function called createPlugin. The function should return a web plugin for the editor.
- In src/web-assets/src, create index.ts. In it, require './{BUNDLED_SCRIPT_FILE_NAME_OF_CHOICE}' and export a getter of the field {CHOSEN_FIELD_NAME} of it.  The path shouldn't exist, but it will after the compilation to the dist folder.
- In src/web-assets. Create a js file for build configuration. export the return value of @react-native-rich-content/web-assets-build-tools's createWebAssetsBuildTools with the config:
  intermediatesPath: {ABSOLUTE_PATH_TO_INTERMEDIATES_FOLDER},
  distPath: {ABSOLUTE_PATH_OF_DIST_FOLDER}/{BUNDLED_SCRIPT_FILE_NAME_OF_CHOICE},
  filename: {BUNDLED_SCRIPT_FILE_NAME_IN_INTERMEDIATES},
  library: {UNIQUE_LIBRARY_NAME_OF_PLUGIN},
  entry:{ABSOLUTE_PATH_TO_THE_FILE_THAT_EXPORTS_CREATEPLUGIN},
  fieldName: {CHOSEN_FIELD_NAME}
- Create src/web-assets/webpack.config.js, import the object created with the build tools and export it's getWebpackConfig().
- Create a build command in src/web-assets/package.json. it should run buildTools.prepareBuild, webpack, and buildTools.bundleWebAssets.
- Add the following fields to src/web-assets/package.json   
    "main": "./dist/index.js",
    "types": "./dist/index.d.ts"
- Create src/web-assets/tsconfig.json. extend monorepo's root's tsconfig.web-assets.json, set outDir to './dist', rootDir to './src', include './src/index.ts' and everything it depends on.
- Create src/web-assets/.eslintrc.json with {
    "env": {
        "browser": true
    },
    "root": false
}.
#### `Handle native`
- In the new package folder, create tsconfig. In it, extend monorepo's root's tsconfig.native.json, reference src/web-assets, exclude src/web-assets, include src, set outDir to dist and rootDir to src.
- In src, implement the editor plugin creator. Import '@react-native-rich-content/common''s createEditorAtomicPlugin function. Pass to it the script string imported from './web-assets', and as a second parameter, the string '{UNIQUE_LIBRARY_NAME_OF_PLUGIN}.createPlugin'. Export the result as the editor plugin creator.
- In src/index.ts, export the editor plugin creator, viewer plugin creator and every util or type that you wish.
- In package.json, set name to '@react-native-rich-content/{PLUGIN_NAME}', set the fields "main": "./dist/index.js",
  "types": "./dist/index.d.ts".
  - In package.json's scripts. set preinstall to install src/web-assets. set build to run src/web-assets build and then run copyfiles -u 3 ./src/web-assets/dist/* ./dist/web-assets. This will copy the compiled web-assets to the package's dist folder.
#### `Handle monorepo's root`
- In tsconfig.json, add the path to the new package to the references array.
- In package.json, add to 'build' script the command 'yarn workspace @react-native-rich-content/{NEW_PLUGIN_NAME} build'
