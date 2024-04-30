import { getHashedPath } from '/services/static/getHashedPath';
import { getStaticUrl } from '/services/static/getStaticUrl';

// <1> Different manifest file:
import { FILEPATH_MANIFEST_CJS } from '../../constants';


export const getStaticCjsUrl = ({
  baseUrl,
  path
}: {
  baseUrl: string
  path: string
}): string => getStaticUrl({
  baseUrl,
  path: getHashedPath({
    manifestPath: FILEPATH_MANIFEST_CJS, // <2> Different manifest file
    path
  })
});
