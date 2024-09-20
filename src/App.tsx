import './App.sass';

import {Route, BrowserRouter as Router, Routes, } from 'react-router-dom';

import {PersonList} from './components/PersonList';
import {Person} from './components/Person';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonList />}/>
        <Route path="/p/:name/:personId" element={<Person />}/>
      </Routes>
    </Router>
  );
}