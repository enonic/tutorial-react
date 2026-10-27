import type {LinkComponent} from '@enonic/react-components';
import {mediaUrl} from '../api';

export const Link: LinkComponent = ({children, data, href, target, title}) => {
    let appHref: string | undefined;
    if (!data) {
        appHref = href;
    } else if (data.media) {
        appHref = mediaUrl(data.media.mediaUrl);
    } else {
        const content = data.content;
        if (content?.type?.endsWith(':person') && content._name && content._id) {
            const queryString = typeof data.pageUrl === 'object' ? data.pageUrl?.queryString || '' : '';
            appHref = `/p/${encodeURIComponent(content._name)}/${content._id}${queryString}${data.fragment || ''}`;
        }
    }
    if (!appHref) {
        return <>{children}</>;
    }
    return <a href={appHref} target={target} title={title}>{children}</a>;
};
