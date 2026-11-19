# Tutorial React SPA powered by Enonic

This tutorial is published on [Enonic's Developer Portal](https://developer.enonic.com/learn/react-spa)

## About

This project was bootstrapped with Vite using `react-ts` template and contains a working version of the React application, as well as the tutorial documentation.

## Run the application

Follow the [demo](https://developer.enonic.com/learn/react-spa/next/demo) to start a sandbox with the sample content and run the application.

## Configuration

The application needs no configuration to run against a local sandbox. Requires Enonic XP 8.1+ with Guillotine 9 and the published Intro sample project.

Vite forwards `/api` to `http://localhost:8080` during development, so GraphQL, images and downloads use the frontend's origin, without browser CORS preflight requests. Set `ENONIC_URL` in `.env` for another backend exposing the same API paths.

Queries select `guillotine(project: "intro", branch: "master")` directly. PersonList has no variables; Person takes only `personId`.

For production, provide equivalent `/api` routing on the frontend host. Alternatively, build with an absolute endpoint and configure CORS on XP. The development proxy is not included in production output or automatically provided by `vite preview`.

Only for direct cross-origin access, configure `com.enonic.app.guillotine.cfg` in XP's `config` directory:

```properties
cors.origin=http://localhost:5173
cors.credentials=false
cors.allowedHeaders=Content-Type
cors.methods=POST, OPTIONS
```

Vite serves the application on port 5173 by default; allow the actual browser origin. For Cloud or a deployed SPA, allow its corresponding origin, including scheme and port. See the [Guillotine configuration reference](https://developer.enonic.com/docs/guillotine/stable/configuration). Both POST and OPTIONS must return CORS headers. If POST works but OPTIONS returns only a generic `Allow` header, the API's preflight handler needs fixing; an allowed-origin setting alone is insufficient.

Media URLs are built from their returned `path` and `queryString` by `mediaUrl()` in `src/api.ts`.
The media API root defaults to the endpoint's parent (`/api` for the relative endpoint above). Relative and absolute GraphQL endpoints are supported.
Set the optional `VITE_ENONIC_MEDIA_URL` only if your media API/CDN uses another public root.
Never put credentials in `VITE_*` variables: they are exposed to the browser.


## Verify the tutorial

```sh
npm test
npm run build
```

`npm test` runs unit tests. To also run the queries directly against a running XP instance and verify rich-text rendering and media delivery:

```sh
ENONIC_TEST_API=http://localhost:8080/api npm test
```

To also verify browser preflight handling for the actual frontend origin:

```sh
ENONIC_TEST_API=http://localhost:8080/api ENONIC_TEST_ORIGIN=http://localhost:5173 npm test
```

The live checks expect published Intro sample content and Guillotine 9. They only read data; they do not modify XP.

## Learn More

You can learn more in the [Vite documentation](https://vite.dev/guide/).

To learn React, check out the [React documentation](https://react.dev/).
