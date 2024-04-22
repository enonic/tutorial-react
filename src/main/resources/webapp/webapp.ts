// @ts-expect-error No types
import Router from '/lib/router';
import { immutableGetter, getWebappUrl } from '/lib/urlHelper';
import {
  FILEPATH_MANIFEST_CJS,
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
    <link rel="stylesheet" media="all" href="${getWebappUrl({
      manifestPath: FILEPATH_MANIFEST_CJS,
      path: 'App.css'
    })}">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>Webapp</title>
  </head>
  <body style="font-size:13px">
    <div id="react-root"></div>
    <script type='module' defer>
      import {App} from '${getWebappUrl({ path: 'App.mjs' })}';
      const root = ReactDOM.createRoot(document.getElementById('react-root'));
      root.render(React.createElement(App, {
        guillotineUrl: '${app.config.guillotineUrl}',
        siteKey: '${app.config.siteKey}'
      }));
    </script>
  </body>
</html>`
  }
}

const router = Router();

router.all(`/${GETTER_ROOT}/{path:.+}`, (r) => {
  return immutableGetter(r);
});

router.get('/?', get);

export const all = (r) => router.dispatch(r);
