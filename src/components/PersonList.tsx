import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import '../styles/PersonList.sass';

import {fetchGuillotine, mediaUrl} from '../api';
import type {UrlParts} from '@enonic/react-components';

import PERSON_LIST_QUERY from '../queries/PersonList';

type PersonListItem = {
  _id: string
  _name: string
  data: {
    photos: {
      imageUrl: UrlParts | null
    }[]
  }
  displayName: string
};

export function PersonList() {
  const [persons, setPersons] = useState<PersonListItem[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchGuillotine<{queryDsl: PersonListItem[]}>(PERSON_LIST_QUERY)
        .then(result => setPersons(result.queryDsl))
        .catch(setError);
  }, []);

  if (error) {
    return <p>Failed to load persons: {error.message}</p>;
  }

  if (!persons) {
    return null;
  }

  return (
      <ul className='person-list'>
        {persons.map(({_id, _name, data: {photos}, displayName}) => (
            <li key={_id}>
              <Link to={`/p/${_name}/${_id}`}>
                <img alt={displayName} src={mediaUrl(photos?.[0]?.imageUrl)}/>
                <div>{displayName}</div>
              </Link>
            </li>
        ))}
      </ul>
  );
}
