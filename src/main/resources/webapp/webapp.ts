// @ts-expect-error No types
import Router from '/lib/router';
import { get as getContext } from '/lib/xp/context';
import { immutableGetter, getWebappUrl } from '/lib/urlHelper';

import {
	// DEBUG_MODE,
	// FILEPATH_MANIFEST_CJS,
	FILEPATH_MANIFEST_NODE_MODULES,
	GETTER_ROOT
} from '/constants';

function get(_request) {
  return {
    contentType: 'text/html',
    body: `<html>
  <head>
    <script type="text/javascript" src="${getWebappUrl({
      manifestPath: FILEPATH_MANIFEST_NODE_MODULES,
      path: 'react/umd/react.development.js'
    })}"></script>
    <script type="text/javascript" src="${getWebappUrl({
      manifestPath: FILEPATH_MANIFEST_NODE_MODULES,
      path: 'react-dom/umd/react-dom.development.js'
    })}"></script>
  </head>
  <body>
    <div id="react-root"></div>
    <script type='module' defer>
      import {App} from '${getWebappUrl({ path: 'App.mjs' })}';
      const root = ReactDOM.createRoot(document.getElementById('react-root'));
      root.render(React.createElement(App, { header: 'Hello from React inside a web app!' }));
    </script>
  </body>
</html>`
  }
}

const router = Router();

router.all(`/${GETTER_ROOT}/{path:.+}`, (r) => {
	const context = getContext();
	log.info('/wepapp/webapp context:%s', JSON.stringify(context, null, 4));

	return immutableGetter(r);
});

router.get('/?', get);

export const all = (r) => router.dispatch(r);
