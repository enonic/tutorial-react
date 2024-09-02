import type {LinkComponent,} from '@enonic/react-components';


import React from 'react';
// import {parse} from 'uri-js';


export const Link: LinkComponent = ({
  children,
  content,
  media,
  href,
  target,
  title,
  uri,
}) => {
  // const {
  //   content: mediaContent,
  //   intent,
  // } = media || {} as LinkDataMedia;

  // const {
  //   _id,
  //   _name,
  //   _path,
  //   imageUrl,
  //   mediaUrl,
  //   type,
  // } = mediaContent || content;

  let appHref = '';
  if (content) {
    appHref = `/p/${content._name}/${content._id}`;
  } else if (media?.content) {
    appHref = href;
  }

  return <a href={appHref} target={target} title={title}>{children}</a>;
}
