# Tutorial React SPA powered by Enonic

This tutorial is published on [Enonic's Developer Portal](https://developer.enonic.com/docs/tutorial-react)

## About

This project was bootstrapped with Vite using `react-ts` template and contains a working version of the React application, as well as the tutorial documentation.

## Configuration

Requires Enonic XP 8.1+ with Guillotine 9 and the published Intro sample project.
Create `.env` in the project root:

```properties
VITE_GUILLOTINE_URL=/api/com.enonic.app.guillotine:graphql
```

Vite forwards `/api` to `http://localhost:8080` during development. Its development configuration sets the existing endpoint variable to the relative URL above, including when an older `.env` contains an absolute XP URL. GraphQL, images and downloads therefore use the frontend's origin, without browser CORS preflight requests. Change the proxy target in `vite.config.ts` for another backend exposing the same API paths.

Queries select `guillotine(project: "intro", branch: "master", scopeKey: "/")` directly. PersonList has no variables; Person and PersonMovies take only `personId`.

For production, provide equivalent `/api` routing on the frontend host. Alternatively, build with an absolute endpoint and configure CORS on XP. The development proxy is not included in production output or automatically provided by `vite preview`.

Only for direct cross-origin access, configure `com.enonic.app.guillotine.cfg` in XP's `config` directory:

```properties
cors.origin=http://localhost:3000, http://localhost:5173
cors.credentials=false
cors.allowedHeaders=Content-Type
cors.methods=POST, OPTIONS
```

Vite defaults to port 5173 unless started with `--port 3000`; allow the actual browser origin. For Cloud or a deployed SPA, allow its corresponding origin, including scheme and port. See the [Guillotine configuration reference](https://developer.enonic.com/docs/guillotine/stable/configuration). Both POST and OPTIONS must return CORS headers. If POST works but OPTIONS returns only a generic `Allow` header, the API's preflight handler needs fixing; an allowed-origin setting alone is insufficient.

Media URLs are built from their returned `path` and `queryString` by `mediaUrl()` in `src/api.ts`.
The media API root defaults to the endpoint's parent (`/api` for the relative endpoint above). Relative and absolute GraphQL endpoints are supported.
Set the optional `VITE_ENONIC_MEDIA_URL` only if your media API/CDN uses another public root.
Configure the Intro app in the project's applications so rich-text macros and image styles resolve.
Never put credentials in `VITE_*` variables: they are exposed to the browser.


## Start

### `npm run dev -- --port 3000`

Runs the app in the development mode on port 3000.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production inside the `/dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Verify the tutorial

```sh
npm test
npm run build
```

`npm test` runs unit tests. To also run the three queries directly against a running XP instance and verify rich-text rendering and media delivery:

```sh
ENONIC_TEST_API=http://localhost:8080/api npm test
```

To also verify browser preflight handling for the actual frontend origin:

```sh
ENONIC_TEST_API=http://localhost:8080/api ENONIC_TEST_ORIGIN=http://localhost:5173 npm test
```

The live checks expect published Intro sample content and Guillotine 9. They only read data; they do not modify XP.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
