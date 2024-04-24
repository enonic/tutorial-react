import {forceArray} from '@enonic/js-utils/array/forceArray';
import React, {
  useEffect,
  useState,
} from 'react';
import {PERSON_LIST_QUERY} from '../queries/personListQuery';


export function PersonList({
  guillotineUrl,
}: {
  guillotineUrl: string
}) {
  const [data, setData] = useState<{
    data: {
      photos: {
        imageUrl: string
      }[]
    }
    dataAsJson: {
      bio: string
      dateofbirth: string
      // photos: string
    }
    displayName: string
  }[]>();

  useEffect(() => {
    fetch(guillotineUrl, {
      body: JSON.stringify({
        query: PERSON_LIST_QUERY,
      }),
      headers: { // HTTP/2 uses lowercase header keys
        'content-type':	'application/json'
      },
      method: 'POST',
    })
      .then(response => response.json())
      .then(json => {
        // console.debug(json);
        const value = json.data.guillotine.queryDsl;
        console.debug(value);
        setData(value)
      });
  }, []);
  return (
    <>
      {data
        ? <ul>
          {
            data.map(({
              data: {
                photos
              },
              dataAsJson: {
                bio,
                dateofbirth,
              },
              displayName
            }, i) => {
              // http://localhost:8080/admin/site/preview/intro/draft/persons/lea-seydoux/_/image/09b3af0e-6da3-4bcf-88d9-11cbe9c41283:e1738c655c27bae3f1323e48916e49165f958239/width-500/Lea-Seydoux.jpg
              const imageSrc = photos ? forceArray(photos)[0].imageUrl : null;
              return <li key={i}>
                <h2>{displayName}</h2>
                <img src={imageSrc} alt={displayName}/>
                <p>{dateofbirth}</p>
                <p>{bio}</p>
              </li>;
            })
          }</ul>
        : null
      }
    </>
  );
}
