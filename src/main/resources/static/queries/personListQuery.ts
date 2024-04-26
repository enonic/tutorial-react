export const PERSON_LIST_QUERY: string = `query PersonListQuery {
  guillotine {
    queryDsl(
      first: 9
      query: {
        term: {
          field: "type",
          value: {
            string: "com.enonic.app.intro:person"
          }
        }
      }
      sort: {
        field: "modifiedTime",
        direction: DESC
      }
    ) {
      _id
      _name
      # _path
      # dataAsJson
      displayName
      type
      ... on com_enonic_app_intro_Person {
        data {
          photos {
            ... on media_Image {
              imageUrl(scale: "width(34)")
            }
          }
        }
      }
    }
  }
}`;
//
