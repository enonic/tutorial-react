import type {LinkComponent} from '@enonic/react-components';


import React from 'react';
import type {RestProps} from './index';
// import {parse} from 'uri-js';


export const Link: LinkComponent<RestProps> = ({
    children,
    content,
    media,
    href,
    target,
    title,
    uri,
    ...rest
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
    if (content && content.type?.endsWith(':person')) {
        appHref = `/p/${content?._name}/${content?._id}`;
    } else if (media?.content) {
        appHref = href;
    } else {
        return <>{children}</>
    }

    return <a href={appHref} target={target} title={title}>{children}</a>;
}
