import type {RestProps} from '..';


import {forceArray} from '@enonic/js-utils/array/forceArray';
import React, {
  useEffect,
  useState,
} from 'react';
import {Link} from 'react-router-dom';
import {PERSON_MOVIES_QUERY} from '../../queries/personMoviesQuery';
import '../../styles/filmography.sass';


export declare interface FilmographyConfig {
  heading?: string
}


export function Filmography({
  config,
  guillotineUrl,
  personId,
}: {
  config: FilmographyConfig,
} & RestProps) {
  const {heading = 'Movies'} = config;

  const [data, setData] = useState<{
    _id: string
    _name: string
    displayName: string
    data: {
      photos: {
        imageUrl: string
      }[]
    }
  }[]>();
  console.debug(data);

  useEffect(() => {
    fetch(guillotineUrl, {
      body: JSON.stringify({
        query: PERSON_MOVIES_QUERY,
        variables: {
          personId,
        }
      }),
      headers: { // HTTP/2 uses lowercase header keys
        'content-type':	'application/json'
      },
      method: 'POST',
    })
      .then(response => response.json())
      .then(json => {
        const value = json.data.guillotine.queryDsl;
        setData(value)
      });
  }, []); // useEffect

  if (!data) {
    return null;
  }

  return (
    <div className='filmography'>
      <h2>{heading}</h2>
      <ul>
        {data.map(({
          _id,
          _name,
          data: {
            photos
          },
          displayName
        }) => {
        const src = photos ? forceArray(photos)[0].imageUrl : null;
        return <li key={_id}>
          <Link to={`/m/${_name}/${_id}`}>
            <img alt={displayName} src={src}/>
            <div>{displayName}</div>
          </Link>
        </li>;
      })}
      </ul>
    </div>
  );
}
