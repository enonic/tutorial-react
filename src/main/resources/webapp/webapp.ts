// @ts-expect-error No types
import Router from '/lib/router';


function get(_request) {
  return {
    contentType: 'text/html',
    body: `<html><body><h1>Hello, World!</h1></body></html>`
  }
}

const router = Router();

router.get('/?', get);

export const all = (r) => router.dispatch(r);
