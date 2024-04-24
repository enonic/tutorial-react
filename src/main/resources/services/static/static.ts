// @ts-expect-error No types
import {buildGetter} from '/lib/enonic/static'
import ioResource from '/lib/ioResource';
import {IS_DEV_MODE} from '/lib/runMode';
import {
  FILEPATH_MANIFEST_CJS,
	FILEPATH_MANIFEST_ESM,
	FILEPATH_MANIFEST_NODE_MODULES,
  GETTER_ROOT
} from '../../constants';


const MANIFESTS = {
	[FILEPATH_MANIFEST_CJS]: ioResource(FILEPATH_MANIFEST_CJS),
	[FILEPATH_MANIFEST_ESM]: ioResource(FILEPATH_MANIFEST_ESM),
	[FILEPATH_MANIFEST_NODE_MODULES]: ioResource(FILEPATH_MANIFEST_NODE_MODULES),
}

const SERVICE_NAME = 'static';


const getStatic = buildGetter({
  root: GETTER_ROOT,
});


export const get = (request) => getStatic(request);


function getHashedPath({
  manifestPath,
  path,
}: {
  manifestPath: string
  path: string
}) {
  if (IS_DEV_MODE) {
    MANIFESTS[manifestPath] = ioResource(manifestPath);
  }
  return MANIFESTS[manifestPath][path];
}

function getStaticUrl({
  baseUrl,
  path
}: {
  baseUrl: string
  path: string
}) {
  return `${baseUrl}/_/service/${app.name}/${SERVICE_NAME}/${path}`;
}

export const getStaticCjsUrl = ({
  baseUrl,
  path
}: {
  baseUrl: string
  path: string
}) => getStaticUrl({
  baseUrl,
  path: getHashedPath({
    manifestPath: FILEPATH_MANIFEST_CJS,
    path
  })
});

export const getStaticEsmUrl = ({
  baseUrl,
  path
}: {
  baseUrl: string
  path: string
}) => getStaticUrl({
  baseUrl,
  path: getHashedPath({
    manifestPath: FILEPATH_MANIFEST_ESM,
    path
  })
});

export const getStaticNodeModuleUrl = ({
  baseUrl,
  path
}: {
  baseUrl: string
  path: string
}) => getStaticUrl({
  baseUrl,
  path: getHashedPath({
    manifestPath: FILEPATH_MANIFEST_NODE_MODULES,
    path
  })
});
