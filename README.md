# Tutorial React SPA powered by Enonic

This tutorial is published on [Enonic's Developer Portal](https://developer.enonic.com/docs/tutorial-react)

## About

This project was bootstrapped with Vite using `react-ts` template and contains a working version of the React application, as well as the tutorial documentation.

## Configuration

This project contains a file called `.env` with the following variable, pointing to the Enonic API

      VITE_GUILLOTINE_URL=http://localhost:8080/site/intro/master

Verify that this URL corresponds to the Guillotine API URL in your Enonic XP installation (see the tutorial referenced above for more details).

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
