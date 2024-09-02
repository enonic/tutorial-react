// <1> Import some styling, so that a App.css is built
import './styles/body.sass';
import './styles/reactRoot.sass';

import React from 'react'; // <2> Support JSX syntax
// <3> Import routing components
import {Route, BrowserRouter as Router, Routes,} from 'react-router-dom';

// <4> Import actual components (views)
import {Person} from './components/Person';
import {PersonList} from './components/PersonList';


export function App({
  basename,
  guillotineUrl,
}: {
  basename: string
  guillotineUrl: string
}) {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<PersonList guillotineUrl={guillotineUrl}/>}/>
        <Route
          element={<Person guillotineUrl={guillotineUrl}/>}
          path="/p/:name/:personId"
        />
        <Route path='*' element={<p>URL doesn't exist!</p>}/>
      </Routes>
    </Router>
  )
}
