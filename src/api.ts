import type {UrlValue} from '@enonic/react-components';

const endpoint = import.meta.env.VITE_GUILLOTINE_URL || '/api/com.enonic.app.guillotine:graphql';
const mediaRoot = (import.meta.env.VITE_ENONIC_MEDIA_URL
    || (endpoint.startsWith('/') ? endpoint.slice(0, endpoint.lastIndexOf('/')) : new URL('.', endpoint).href))
    .replace(/\/+$/, '');

export async function fetchGuillotine<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({query, variables}),
    });
    if (!response.ok) {
        throw new Error(`Guillotine responded with ${response.status}`);
    }
    const json = await response.json();
    if (json.errors) {
        throw new Error(json.errors[0].message);
    }
    return json.data.guillotine;
}

export function mediaUrl(value?: UrlValue | null): string | undefined {
    if (typeof value === 'string') {
        return value;
    }
    return value ? mediaRoot + value.path + (value.queryString || '') : undefined;
}
