/* eslint-disable react/prop-types */
// import { toStr } from '@enonic/js-utils';
import 'css/panel.css';
import React/*, {
  useEffect,
  useState,
}*/ from 'react';
import {Person} from './components/Person';
import {PersonList} from './components/PersonList';


export function App({
  guillotineUrl,
}: {
  guillotineUrl: string
}) {
  return (
    <>
      {/* <PersonList guillotineUrl={guillotineUrl}/> */}
      <Person guillotineUrl={guillotineUrl} personId='a8b374a2-c532-45eb-9aa1-73d1c37cd681'/>
    </>
  );
}
