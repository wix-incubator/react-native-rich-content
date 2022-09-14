## `Commands`

#### `yarn setup`
Clean everything that git ignores, install, build and install pods.
#### `yarn android:start || yarn ios:start`
Run the demo app on android/ios without listening to changes in the code.
#### `yarn android:start-watch || yarn ios:start-watch`
Build typescript and run the demo app on android/ios. Typescript watches changes in the code and compile again for each change- makes the demo app respond to changes in the native parts (meaning - not for the web-assets).
#### `yarn build`
Build typescript and then build the web-assets of the editor and the plugins.
