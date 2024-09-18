import './App.sass';
import React from 'react';
import {Route, BrowserRouter as Router, Routes,} from 'react-router-dom';
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
      </Routes>
    </Router>
  )
}