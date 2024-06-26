// import {toStr} from '@enonic/js-utils/value/toStr';
import {
  getStaticCjsUrl,
  getStaticEsmUrl,
  getStaticNodeModuleUrl,
} from '/services/static';


const BASENAME = `/webapp/${app.name}`;


export function get(request) {
  // log.info('request:%s', toStr(request));
  const {
    host,
    port,
    scheme,
  } = request;
  const baseUrl = `${scheme}://${host}:${port}`;
  return {
    contentType: 'text/html',
    body: `<html>
  <head>
    <script type="text/javascript" src="${getStaticNodeModuleUrl({
      baseUrl,
      path: 'react/umd/react.development.js'
    })}"></script>
    <script type="text/javascript" src="${getStaticNodeModuleUrl({
      baseUrl,
      path: 'react-dom/umd/react-dom.development.js'
    })}"></script>
    <link rel="stylesheet" media="all" href="${getStaticCjsUrl({
      baseUrl,
      path: 'App.css'
    })}">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>Webapp</title>
  </head>
  <body>
    <div id="react-root"></div>
    <script type='module' defer>
      import {App} from '${getStaticEsmUrl({
        baseUrl,
        path: 'App.mjs'
      })}';
      const root = ReactDOM.createRoot(document.getElementById('react-root'));
      root.render(React.createElement(App, {
        basename: '${BASENAME}',
        guillotineUrl: '${app.config.guillotineUrl}',
      }));
    </script>
  </body>
</html>`
  };
}
