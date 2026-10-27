import type {UrlValue} from '@enonic/react-components';

const endpoint = import.meta.env.VITE_GUILLOTINE_URL || '/api/com.enonic.app.guillotine:graphql';
const mediaRoot = (import.meta.env.VITE_ENONIC_MEDIA_URL
    || (endpoint.startsWith('/') ? endpoint.slice(0, endpoint.lastIndexOf('/')) : new URL('.', endpoint).href))
    .replace(/\/+$/, '');

export function mediaUrl(value?: UrlValue | null): string | undefined {
    if (typeof value === 'string') {
        return value;
    }
    return value ? mediaRoot + value.path + (value.queryString || '') : undefined;
}
