import ioResource from '/lib/ioResource';
import {IS_DEV_MODE} from '/lib/runMode';
import {
  FILEPATH_MANIFEST_CJS,
  FILEPATH_MANIFEST_ESM,
  FILEPATH_MANIFEST_NODE_MODULES,
} from '../../constants';


// <1> "Cache" the objects from each parsed json manifest file
// (for as long as the js file lives in memory)
const MANIFESTS = IS_DEV_MODE ? {} : {
  [FILEPATH_MANIFEST_CJS]: ioResource(FILEPATH_MANIFEST_CJS),
  [FILEPATH_MANIFEST_ESM]: ioResource(FILEPATH_MANIFEST_ESM),
  [FILEPATH_MANIFEST_NODE_MODULES]: ioResource(FILEPATH_MANIFEST_NODE_MODULES),
};


export function getHashedPath({
  manifestPath,
  path,
}: {
  manifestPath: string
  path: string
}): string {
  if (IS_DEV_MODE) {
    // <2> When XP is running in development mode, it reads files directly from
    // the filesystem (rather than only from the application jar file).
    // Since the build system may change the json manifest files without
    // touching this js file, we must skip the potentially stale cache.
    return ioResource(manifestPath)[path];
  }
  return MANIFESTS[manifestPath][path];
}
