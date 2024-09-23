import {useEffect, useState,} from 'react';
import {Link} from 'react-router-dom';

import '../styles/PersonList.sass';

import PERSON_LIST_QUERY from '../queries/PersonList';

const forceArray = (data: any) => (Array.isArray(data) ? data : [data]);

export function PersonList() {
  const [data, setData] = useState<{
    _id: string
    _name: string
    data: {
      photos: {
        imageUrl: string
      }[]
    }
    displayName: string
  }[]>();

  useEffect(() => {
    fetch(import.meta.env.VITE_GUILLOTINE_URL as string, {
      body: JSON.stringify({
        query: PERSON_LIST_QUERY,
      }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
        .then(response => response.json())
        .then(json => setData(json.data.guillotine.queryDsl));
  }, []);

  return (
      <>
        {data && <ul className='person-list'>
          {data.map((person, i) => {

            const {
              _id,
              _name,
              data: {
                photos
              },
              displayName
            } = person;

            const imgProps = {
              alt: displayName,
              src: photos ? forceArray(photos)[0].imageUrl : undefined,
            };

            return <li key={i}>
              <Link to={`/p/${_name}/${_id}`}>
                <img {...imgProps}/>
                <div>{displayName}</div>
              </Link>
            </li>;
          })}
        </ul>}
      </>
  );
}
