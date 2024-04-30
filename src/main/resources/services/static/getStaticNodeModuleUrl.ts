import { getHashedPath } from '/services/static/getHashedPath';
import { getStaticUrl } from '/services/static/getStaticUrl';
import { FILEPATH_MANIFEST_NODE_MODULES } from '../../constants';


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
