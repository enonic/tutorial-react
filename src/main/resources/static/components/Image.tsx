import type {ImageComponent} from '@enonic/react-components';


import React from 'react';
import type {RestProps} from './index';


export const Image: ImageComponent<RestProps> = ({
    alt,
    image,
    imageStyle,
    sizes,
    src,
    srcSet,
    style,
    ...rest
}) => {
    // const {
    //   _id,
    //   _name,
    //   _path,
    //   type,
    //   imageUrl
    // } = image;
    // const {
    //   aspectRatio,
    //   filter,
    //   name
    // } = imageStyle;

    return <img
        alt={alt}
        sizes={sizes}
        src={src}
        srcSet={srcSet}
        style={style}
    />;
}
