import type {ImageComponent} from '@enonic/react-components';
import {mediaUrl} from '../api';

export const Image: ImageComponent = ({data, alt, sizes, style}) => {
    const src = mediaUrl(data?.src);
    if (!src) {
        return null;
    }
    const srcSet = data?.srcset?.map(source => `${mediaUrl(source.imageUrl)} ${source.width}w`).join(', ');
    return <img alt={alt} sizes={sizes} src={src} srcSet={srcSet} style={style}/>;
};
