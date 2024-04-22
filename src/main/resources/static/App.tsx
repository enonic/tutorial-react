/* eslint-disable react/prop-types */
// import { toStr } from '@enonic/js-utils';
import 'css/panel.css';
import {ElementType} from 'domelementtype';
import React, {
  useEffect,
  useState,
} from 'react';
import {RichText} from '@enonic/react-components/src';
import {Image} from './components/Image';
import {Link} from './components/Link';
import {Macro} from './components/Macro';
import {PersonList} from './components/PersonList';
import {RICH_TEXT_QUERY} from './richTextQuery';


export function App({
  guillotineUrl,
  siteKey
}: {
  guillotineUrl: string
  siteKey: string
}) {
  const [data, setData] = useState();
  // const id = useId();

  // console.debug(`React app id: ${toStr({id})}`);

  useEffect(() => {
    fetch(guillotineUrl, {
      body: JSON.stringify({
        query: RICH_TEXT_QUERY,
        variables: {
          siteKey
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
        const value = json.data.guillotine.getSite.components[1].text.value;
        // console.debug(value);
        value.macros = value.macrosAsJson;
        setData(value)
      });
  }, []);

  return (
    <>
      <PersonList/>
      {
        data
        ? <RichText
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
          data={data}
          Image={Image}
          Link={Link}
          Macro={Macro}
          tag='article'
        />
        : null
      }
    </>
  );
}
