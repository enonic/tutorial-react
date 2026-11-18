import type {LinkComponent} from '@enonic/react-components';
import {Link as RouterLink} from 'react-router-dom';
import {mediaUrl} from '../api';

export const Link: LinkComponent = ({children, data, href, target, title}) => {
    if (!data) {
        return <a href={href} target={target} title={title}>{children}</a>;
    }
    if (data.media) {
        const url = mediaUrl(data.media.mediaUrl);
        return url ? <a href={url} target={target} title={title}>{children}</a> : <>{children}</>;
    }
    const content = data.content;
    if (content?.type?.endsWith(':person') && content._name && content._id) {
        const queryString = typeof data.pageUrl === 'object' ? data.pageUrl?.queryString || '' : '';
        const to = `/p/${encodeURIComponent(content._name)}/${content._id}${queryString}${data.fragment || ''}`;
        return <RouterLink to={to} title={title}>{children}</RouterLink>;
    }
    return <>{children}</>;
};
