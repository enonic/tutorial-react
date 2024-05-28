import type {RichTextData} from '@enonic/react-components';
import type {RestProps} from '.';


import {forceArray} from '@enonic/js-utils/array/forceArray';
import {RichText} from '@enonic/react-components/src';
import {ElementType} from 'domelementtype';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  Link as RouterLink,
  useParams,
} from 'react-router-dom';
import {Image} from '../components/Image';
import {Link} from '../components/Link';
import {Macro} from '../components/Macro';
import {PERSON_QUERY} from '../queries/personQuery';


export function Person({
  guillotineUrl,
}: {
  guillotineUrl: string
}) {
  const {
    // name,
    personId
  } = useParams();
  const [data, setData] = useState<{
    _name: string
    data: {
      bio: RichTextData
      dateofbirth: string
      photos: {
        imageUrl: string
      }[]
    }
    displayName: string
  }>();

  useEffect(() => {
    fetch(guillotineUrl, {
      body: JSON.stringify({
        query: PERSON_QUERY,
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
        const value = json.data.guillotine.get;
        setData(value)
      });
  }, []); // useEffect

  if (!data) {
    return null;
  }

  const {
    data: {
      bio,
      dateofbirth,
      photos
    },
    displayName
  } = data;
  const imageSrc = photos ? forceArray(photos)[0].imageUrl : null;

  return (
    <section>
      <h2>{displayName}</h2>
      <img src={imageSrc} alt={displayName}/>
      <p>{dateofbirth}</p>
      <RichText<RestProps>
        replacer={(el, data) => {
          // console.debug('el', el);
          // console.debug('data', data);
          if (
            el.name === 'p'
            && el.children[0].type === ElementType.Text
            && el.children[0].data === 'Some text'
          ) {
            return <p>Replaced text</p>;
          }
        }}
        data={bio}
        Image={Image}
        Link={Link}
        Macro={Macro}
        guillotineUrl={guillotineUrl}
        personId={personId}
        tag='article'
      />
      <RouterLink to='/'>Back to list</RouterLink>
    </section>
  );
}
