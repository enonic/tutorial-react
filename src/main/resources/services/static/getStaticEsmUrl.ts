import { getHashedPath } from '/services/static/getHashedPath';
import { getStaticUrl } from '/services/static/getStaticUrl';
import { FILEPATH_MANIFEST_ESM } from '../../constants';


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
