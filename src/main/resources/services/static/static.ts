import type {Request, Response} from '/types';


// @ts-expect-error No types yet
import { buildGetter } from '/lib/enonic/static'

import { GETTER_ROOT } from '../../constants';


const getStatic: (request: Request) => Response = buildGetter({
  root: GETTER_ROOT,
});


export const get = (request: Request) => getStatic(request);
