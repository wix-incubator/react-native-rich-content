import { generateJavascriptFile } from './bundle-web-assets';
import { generateIntermediatesDirectory } from './prepare-build';
import { generateWebpackConfig } from './webpackConfig';

export const createWebAssetsBuildTools = ({
  intermediatesPath, filename, isDevMode, entry, distPath, library, fieldName, fileTransformer,
}: {
    intermediatesPath: string;
    filename: string;
    isDevMode: boolean;
    entry: string;
    distPath: string;
    library: string;
    fieldName: string;
    fileTransformer?: (file: Buffer) => string;
}) => ({
  bundleWebAssets: () => generateJavascriptFile({
    intermediatesPath,
    filename,
    distPath,
    fieldName,
    fileTransformer,
  }),
  prepareBuild: () => generateIntermediatesDirectory(intermediatesPath),
  getWebpackConfig: () => generateWebpackConfig({
    isDevMode,
    entry,
    filename,
    library,
    distDir: intermediatesPath,
  }),
});
