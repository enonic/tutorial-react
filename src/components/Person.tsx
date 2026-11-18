import type {RichTextData, RichTextMetaData, ContentTypeData, UrlParts} from '@enonic/react-components';
import {RichText} from '@enonic/react-components';
import {useEffect, useState} from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';

import {Image} from './Image';
import {Link} from './Link';
// tag::macro-import[]
import {Macro} from './Macro';
// end::macro-import[]
import {fetchGuillotine, mediaUrl} from '../api';
import PERSON_QUERY from '../queries/Person';

import styles from './Person.module.css';

type PersonContent = {
    _path: string
    data: {
        bio: RichTextData
        photos: {
            imageUrl: UrlParts | null
            attachments: {
                name: string
            }[]
        }[]
    }
    displayName: string
};

export function Person() {

    const {
        personId = ''
    } = useParams();

    const [person, setPerson] = useState<PersonContent | null>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        fetchGuillotine<{get: PersonContent | null}>(PERSON_QUERY, {personId})
            .then(result => setPerson(result.get))
            .catch(setError);
    }, [personId]);

    if (error) {
        return <p>Failed to load person: {error.message}</p>;
    }

    if (person === null) {
        return <p>Person not found</p>;
    }

    if (!person) {
        return null;
    }

    const {
        data: {
            bio,
            photos
        },
        displayName
    } = person;

    // Minimal meta and component data required by RichText
    const meta: RichTextMetaData = {
        type: 'person',
        id: personId,
        path: person._path,
        mode: 'inline'
    };

    const component: ContentTypeData = {
        contentType: 'person',
        type: 'contentType'
    };

    return (
        <div className={styles.person}>
            <h2>{displayName}</h2>
            <RichText
                className={styles.bio}
                data={bio}
                meta={meta}
                component={component}
                Image={Image}
                Link={Link}
                // tag::macro-prop[]
                Macro={Macro}
                // end::macro-prop[]
                tag='article'
            />
            {
                photos.length > 0 && <h4 className={styles.photosheader}>Photos</h4>
            }
            <div className={styles.photos}>
                {
                    photos.map((photo, i) => {
                        const title = photo.attachments?.[0]?.name || displayName;
                        return <img key={i}
                                    src={mediaUrl(photo.imageUrl)}
                                    title={title}
                                    alt={title}
                                    width="500"
                        />;
                    })
                }
            </div>
            <RouterLink to="/">Back to list</RouterLink>
        </div>
    );
}
