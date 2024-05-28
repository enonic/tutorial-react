import React, {
  useEffect,
  useState,
} from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';
import {MOVIE_QUERY} from '../queries/movieQuery';
import '../styles/movie.sass';


export function Movie({
  guillotineUrl,
}: {
  guillotineUrl: string
}) {
  const {
    // name,
    movieId
  } = useParams();

  const [data, setData] = useState<{
    _id: string
    _name: string
    displayName: string
    data: {
      abstract: string
      cast: {
        actor: {
          _id: string
          _name: string
          displayName: string
        }
        character: string
      }[]
      director: {
        _id: string
        _name: string
        displayName: string
      }
      photos: {
        imageUrl: string
      }[]
      release: string
      subtitle: string
      trailer: string
      website: string
    }
  }>();

  useEffect(() => {
    fetch(guillotineUrl, {
      body: JSON.stringify({
        query: MOVIE_QUERY,
        variables: {
          movieId,
        }
      }),
      headers: { // HTTP/2 uses lowercase header keys
        'content-type':	'application/json'
      },
      method: 'POST',
    })
      .then(response => response.json())
      .then(json => {
        const value = json.data.guillotine.get;
        // console.debug(value);
        // value.data.bio.macros = value.data.bio.macrosAsJson;
        setData(value)
      });
  }, []); // useEffect

  if (!data) {
    return null;
  }

  const {
    data: {
      abstract,
      cast,
      director,
      release,
      subtitle,
      trailer,
      website
    },
    displayName,
  } = data;

  return (
    <section className="movie">
      <h2>{displayName}</h2>
      <h3>{subtitle}</h3>
      <p>{abstract}</p>

      <dl>
        {director ? <>
          <dt>Director</dt>
        <dd>{director.displayName}</dd>
        </> : null}
        <dt>Release</dt>
        <dd>{release}</dd>
        <dt>Trailer</dt>
        <dd>{trailer ? <a href={trailer}>{trailer}</a> : null}</dd>
        <dt>Website</dt>
        <dd>{website ? <a href={website}>{website}</a> : null}</dd>
      </dl>

      <h3>Cast</h3>
      <ul>
        {cast.map(({actor, character}, i) => <li key={i}>
          <Link to={`/p/${actor._name}/${actor._id}`}>
            <h4>{actor.displayName}</h4>
            <p>{character}</p>
          </Link>
        </li>)}
      </ul>

      <Link to='/'>Back to list</Link>
    </section>
  );
}
