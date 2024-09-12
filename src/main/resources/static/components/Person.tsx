import type {RichTextData} from '@enonic/react-components';
import {RichText} from '@enonic/react-components';
import type {RestProps} from '.';
import React, {useEffect, useState} from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';

import {Image} from './Image';
import {Link} from './Link';
import {Macro} from './Macro';
import PERSON_QUERY from '../queries/person';

import styles from './Person.module.css';


export function Person() {
    const {
        // name,
        personId = ''
    } = useParams();

    const guillotineUrl = process.env.REACT_APP_GUILLOTINE_URL as string;

    const [data, setData] = useState<{
        _name: string
        data: {
            bio: RichTextData
            dateofbirth: string
            photos: {
                imageUrl: string
            }[]
        }
        displayName: string
    }>();

    useEffect(() => {
        fetch(guillotineUrl, {
            body: JSON.stringify({
                query: PERSON_QUERY,
                variables: {
                    personId,
                }
            }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        })
            .then(response => response.json())
            .then(json => {
                const value = json.data.guillotine.get;
                setData(value)
            });
    }, []); // useEffect

    if (!data) {
        return null;
    }

    const {
        data: {
            bio,
            photos
        },
        displayName
    } = data;

    return (
        <>
            <div className={styles.person}>
                <h2>{displayName}</h2>
                <RichText<RestProps>
                    className={styles.bio}
                    data={bio}
                    Image={Image}
                    Link={Link}
                    Macro={Macro}
                    guillotineUrl={guillotineUrl}
                    personId={personId}
                    tag='article'
                />
                {
                    photos.length && <h4 className={styles.photosheader}>Photos</h4>
                }
                <div className={styles.photos}>
                    {
                        photos.map((photo: any, i: number) => (
                            <img key={i}
                                 src={photo.imageUrl}
                                 title={getTitle(photo, displayName)}
                                 alt={getTitle(photo, displayName)}
                                 width="500"
                            />
                        ))
                    }
                </div>
                <RouterLink to="/">Back to list</RouterLink>
            </div>
        </>
    );
}

function getTitle(photo: any, displayName: string) {
    return (photo.attachments || [])[0].name || displayName;
}
