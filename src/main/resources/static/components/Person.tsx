import type {RichTextData} from '@enonic/react-components';
import {ElementType} from 'domelementtype';


import {forceArray} from '@enonic/js-utils/array/forceArray';
import {RichText} from '@enonic/react-components/src';
import React, {
  useEffect,
  useState,
} from 'react';
import {Image} from '../components/Image';
import {Link} from '../components/Link';
import {Macro} from '../components/Macro';
import {PERSON_QUERY} from '../queries/personQuery';


export function Person({
  guillotineUrl,
  personId,
}: {
  guillotineUrl: string
  personId: string
}) {
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
        // console.debug(json);
        const value = json.data.guillotine.get;
        console.debug(value);
        value.macros = value.macrosAsJson;
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
      <RichText
        customReplacer={(el, data) => {
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
        tag='article'
      />
    </section>
  );
}
