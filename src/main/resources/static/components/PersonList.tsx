import {forceArray} from '@enonic/js-utils/array/forceArray';
import React, {useEffect, useState,} from 'react';
import {Link} from 'react-router-dom';
import {BREAK_POINTS} from './constants';

import '../styles/personList.sass';

import PERSON_LIST_QUERY from '../queries/personList';


// Images are presented in a grid of 3 columns (and 30px gutter).
// The grid itself is centered on the page and has a max-width of 50%.
// Let's calculate the smallest image size:
// The smallest breakPoint is 320px, so the grid will be 160px wide.
// 160 -(2*30) = 100 / 3 = 33.333333 px
// So let's use 34px as the smallest image width.


export function PersonList({
  guillotineUrl,
}: {
  guillotineUrl: string
}) {
  const [data, setData] = useState<{
    _id: string
    _name: string
    data: {
      photos: {
        imageUrl: string
      }[]
    }
    // dataAsJson: {
    //   bio: string
    //   dateofbirth: string
    //   // photos: string
    // }
    displayName: string
  }[]>();

  useEffect(() => {
    fetch(guillotineUrl, {
      body: JSON.stringify({
        query: PERSON_LIST_QUERY,
      }),
      headers: { // HTTP/2 uses lowercase header keys
        'content-type': 'application/json'
      },
      method: 'POST',
    })
      .then(response => response.json())
      .then(json => {
        // console.debug(json);
        const value = json.data.guillotine.queryDsl;
        // console.debug(value);
        setData(value)
      });
  }, []);

  return (
    <>
      {data
        ? <ul className='person-list'>
          {
            data.map(({
              _id,
              _name,
              data: {
                photos
              },
              displayName
            }, i) => {
              const src = photos ? forceArray(photos)[0].imageUrl : undefined;

              // The styles.sass centers images and sets a max-width of 50%.
              const srcSet = src
                ? Object.values(BREAK_POINTS)
                  .map(
                    (width) => {
                      const w = Math.ceil((width/2-60)/3);
                      return `${
                        src.replace('/width-34/', `/width-${w}/`)
                        } ${w}w`}
                  )
                  .join(',')
                  : undefined;

              // The last slot width has no media condition (this is the default
              // that is chosen when none of the media conditions are true)
              // The browser ignores everything after the first matching
              // condition, so be careful how you order the media conditions.
              const sizes = src
                ? Object.values(BREAK_POINTS)
                  .map((width) => `(max-width: ${width}px) ${Math.ceil((width/2-60)/3)}px`)
                  .join(',').replace('(max-width: 3840px) ', '')
                  : undefined;

              const imgProps = {
                alt: displayName,
                sizes,
                src,
                srcSet,
              };
              return <li key={i}>
                <Link to={`/p/${_name}/${_id}`}>
                  <img {...imgProps}/>
                  <div>{displayName}</div>
                </Link>
              </li>;
            })
          }</ul>
        : null
      }
    </>
  );
}
