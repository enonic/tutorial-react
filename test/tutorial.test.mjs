import assert from 'node:assert/strict';
import {before, test} from 'node:test';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {RichText} from '@enonic/react-components';
import {createServer} from 'vite';

let vite;
let api;
let Image;
let Link;
let Macro;
const queries = {};

before(async () => {
    vite = await createServer({
        configFile: false,
        server: {middlewareMode: true, watch: null, hmr: false},
        appType: 'custom',
        define: {
            'import.meta.env.VITE_GUILLOTINE_URL': JSON.stringify('/api/com.enonic.app.guillotine:graphql'),
            'import.meta.env.VITE_ENONIC_MEDIA_URL': JSON.stringify('')
        }
    });
    api = await vite.ssrLoadModule('/src/api.ts');
    ({Image} = await vite.ssrLoadModule('/src/components/Image.tsx'));
    ({Link} = await vite.ssrLoadModule('/src/components/Link.tsx'));
    ({Macro} = await vite.ssrLoadModule('/src/components/Macro.tsx'));
    for (const name of ['PersonList', 'Person', 'PersonMovies']) {
        queries[name] = (await vite.ssrLoadModule(`/src/queries/${name}.ts`)).default;
    }
    await vite.close();
});

function renderRichText(data) {
    return renderToStaticMarkup(createElement(RichText, {
        data,
        meta: {type: 'person', id: 'person', path: '/persons/person', mode: 'inline'},
        component: {type: 'contentType', contentType: 'person'},
        Image,
        Link,
        Macro
    }));
}

test('queries explicitly select the published Intro project without extra context variables', () => {
    for (const query of Object.values(queries)) {
        assert.match(query, /guillotine\(project: "intro", branch: "master", scopeKey: "\/"\)/);
        assert.doesNotMatch(query, /\$(project|branch|scopeKey)/);
    }
    assert.match(queries.Person, /\$personId: ID!/);
});

test('builds media URLs from parts, preserving query strings and resolved strings', () => {
    assert.equal(api.mediaUrl({path: '/media:attachment/intro/file.pdf', queryString: '?download'}), '/api/media:attachment/intro/file.pdf?download');
    assert.equal(api.mediaUrl('https://cdn.example/photo.jpg'), 'https://cdn.example/photo.jpg');
    assert.equal(api.mediaUrl(null), undefined);
});

test('also supports absolute GraphQL endpoints and explicit media roots', async () => {
    for (const [override, expected] of [
        ['', 'https://xp.example/api/media:image/photo.jpg'],
        ['https://cdn.example/api/', 'https://cdn.example/api/media:image/photo.jpg']
    ]) {
        const server = await createServer({
            configFile: false,
            server: {middlewareMode: true, watch: null, hmr: false},
            appType: 'custom',
            define: {
                'import.meta.env.VITE_GUILLOTINE_URL': JSON.stringify('https://xp.example/api/com.enonic.app.guillotine:graphql'),
                'import.meta.env.VITE_ENONIC_MEDIA_URL': JSON.stringify(override)
            }
        });
        try {
            const {mediaUrl} = await server.ssrLoadModule('/src/api.ts');
            assert.equal(mediaUrl({path: '/media:image/photo.jpg'}), expected);
        } finally {
            await server.close();
        }
    }
});

test('renders structured images, person links, downloads, ordinary links and macros', () => {
    const data = {
        processedHtml: '<a data-link-ref="person" href="placeholder">Person</a><a data-link-ref="file" href="placeholder">File</a><a href="https://example.com" target="_blank" title="External">External</a><img data-image-ref="photo" src="placeholder" alt="Photo" sizes="100vw"/><editor-macro data-macro-ref="fact"><strong>Body</strong></editor-macro>',
        links: [
            {ref: 'person', uri: 'content://person', content: {_id: '123', _name: 'person', type: 'intro:person'}, pageUrl: {path: '/persons/person', queryString: '?a=1'}, fragment: '#details'},
            {ref: 'file', uri: 'media://file', media: {content: null, intent: 'download', mediaUrl: {path: '/media:attachment/intro/file.pdf', queryString: '?download'}}}
        ],
        images: [{ref: 'photo', image: null, src: {path: '/media:image/intro/photo.jpg'}, srcset: [{width: 400, imageUrl: {path: '/media:image/intro/small.jpg'}}]}],
        macros: [{ref: 'fact', name: 'factbox', descriptor: 'com.enonic.app.intro:factbox', config: {factbox: {header: ['Facts']}}}]
    };
    const original = JSON.stringify(data);
    const html = renderRichText(data);
    assert.match(html, /href="\/p\/person\/123\?a=1#details"/);
    assert.match(html, /href="\/api\/media:attachment\/intro\/file.pdf\?download"/);
    assert.match(html, /href="https:\/\/example.com"/);
    assert.match(html, /target="_blank"/);
    assert.match(html, /src="\/api\/media:image\/intro\/photo.jpg"/);
    assert.match(html, /srcSet="\/api\/media:image\/intro\/small.jpg 400w"/i);
    assert.match(html, /sizes="100vw"/);
    assert.match(html, /Facts/);
    assert.match(html, /<strong>Body<\/strong>/);
    assert.doesNotMatch(html, /placeholder|\[object Object\]/);
    assert.equal(JSON.stringify(data), original);
});

test('omits unresolved images and does not render unresolved or unsupported link destinations', () => {
    const html = renderRichText({
        processedHtml: '<img data-image-ref="missing" src="placeholder"/><a data-link-ref="missing" href="placeholder">Missing</a><a data-link-ref="movie" href="placeholder">Movie</a>',
        images: [{ref: 'missing', image: null, src: null}],
        links: [
            {ref: 'missing', uri: 'content://missing', content: null, pageUrl: null},
            {ref: 'movie', uri: 'content://movie', content: {_id: 'movie', _name: 'movie', type: 'intro:movie'}}
        ]
    });
    assert.doesNotMatch(html, /<img|<a\b|placeholder/);
    assert.match(html, /Missing/);
    assert.match(html, /Movie/);
});


test('serves GraphQL and media through the documented development proxy', {skip: !process.env.ENONIC_TEST_API}, async () => {
    const server = await createServer({server: {host: '127.0.0.1', port: 0, watch: null, hmr: false}});
    try {
        await server.listen();
        const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
        const response = await fetch(`${origin}/api/com.enonic.app.guillotine:graphql`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({query: queries.PersonList})
        });
        const result = await response.json();
        assert.equal(result.errors, undefined, JSON.stringify(result.errors));
        const photo = result.data.guillotine.queryDsl.find(person => person.data.photos?.[0]?.imageUrl)?.data.photos[0];
        assert.ok(photo);
        const image = await fetch(origin + api.mediaUrl(photo.imageUrl));
        assert.equal(image.status, 200);
        assert.match(image.headers.get('content-type'), /^image\//);
        await image.body?.cancel();
    } finally {
        await server.close();
    }
});

test('allows browser CORS preflight and the following JSON POST', {
    skip: !process.env.ENONIC_TEST_API || !process.env.ENONIC_TEST_ORIGIN
}, async () => {
    const endpoint = process.env.ENONIC_TEST_API.replace(/\/+$/, '') + '/com.enonic.app.guillotine:graphql';
    const origin = process.env.ENONIC_TEST_ORIGIN;
    const preflight = await fetch(endpoint, {
        method: 'OPTIONS',
        headers: {
            Origin: origin,
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'content-type'
        }
    });
    assert.ok(preflight.ok);
    const allowOrigin = preflight.headers.get('access-control-allow-origin');
    assert.ok(allowOrigin === origin || allowOrigin === '*', 'OPTIONS must allow the browser origin; successful POST queries alone do not verify CORS');
    assert.match(preflight.headers.get('access-control-allow-methods') || '', /\bPOST\b/i);
    assert.match(preflight.headers.get('access-control-allow-headers') || '', /content-type/i);
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {Origin: origin, 'Content-Type': 'application/json'},
        body: JSON.stringify({query: queries.PersonList})
    });
    assert.ok(response.ok);
    assert.equal(response.headers.get('access-control-allow-origin'), allowOrigin);
});

test('runs the tutorial queries and renders real XP rich text', {skip: !process.env.ENONIC_TEST_API}, async () => {
    const root = process.env.ENONIC_TEST_API.replace(/\/+$/, '');
    async function request(query, variables = {}) {
        const response = await fetch(`${root}/com.enonic.app.guillotine:graphql`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({query, variables})
        });
        assert.equal(response.status, 200);
        const result = await response.json();
        assert.equal(result.errors, undefined, JSON.stringify(result.errors));
        return result.data.guillotine;
    }
    const people = (await request(queries.PersonList)).queryDsl;
    assert.ok(people.length > 0, 'Publish the Intro sample content before running this test');
    const selected = people.find(person => person._id === 'a8b374a2-c532-45eb-9aa1-73d1c37cd681') || people[0];
    const person = (await request(queries.Person, {personId: selected._id})).get;
    assert.equal(person._id, selected._id);
    assert.ok(person.data.bio?.images?.length, 'The sample biography should contain a rich-text image');
    const html = renderRichText(person.data.bio);
    assert.match(html, /src="\/api\/media:image\//);
    assert.match(html, /srcSet=/i);
    assert.match(html, /\/p\//);
    assert.match(html, /\?download/);
    assert.match(html, /Fact Box/);
    assert.doesNotMatch(html, /\[object Object\]|href="\/persons\//);
    assert.ok(Array.isArray((await request(queries.PersonMovies, {personId: selected._id})).queryDsl));

    const image = person.data.bio.images[0];
    const download = person.data.bio.links.find(link => link.media?.intent === 'download');
    const values = [selected.data.photos[0].imageUrl, person.data.photos[0].imageUrl, image.src,
        ...image.srcset.map(source => source.imageUrl), download.media.mediaUrl];
    for (const value of values) {
        const response = await fetch(root + value.path + (value.queryString || ''));
        assert.equal(response.status, 200, value.path);
        await response.body?.cancel();
    }
});
