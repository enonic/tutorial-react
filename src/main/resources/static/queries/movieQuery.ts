export const MOVIE_QUERY: string = `query MoiveQuery(
  $movieId: ID!
) {
  guillotine {
    get(key: $movieId) {
      _id
      _name
      displayName
      ... on com_enonic_app_intro_Movie {
        data {
          abstract
          cast {
            actor {
              _id
              _name
              displayName
            }
            character
          }
          director {
            _id
            _name
            displayName
          }
          photos(first: 1) {
            ... on media_Image {
              imageUrl(scale: "width(100)")
            }
          }
          release
          subtitle
          trailer
					website
        }
      }
    }
  }
}`;
