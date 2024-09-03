const query = `query PersonMoviesQuery($personId: String!) {
  guillotine {
    queryDsl(
      query: {
        boolean: {
          must: [
            {
              term: {
                field: "type",
                value: {
                  string: "com.enonic.app.intro:movie"
                }
              }
            },
            {
              in: {
                field: "_references",
                stringValues: [$personId]
              }
            }
          ]
        }
      }
    ) {
      _id
      _name
      displayName
      ... on com_enonic_app_intro_Movie {
        data {
          photos(first: 1) {
            ... on media_Image {
              imageUrl(scale: "width(100)")
            }
          }
        }
      }
    }
  }
}`

export default query;
