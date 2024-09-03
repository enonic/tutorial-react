const query = `query PersonQuery($personId: ID!) {
  guillotine {
    get(key: $personId) {
      _name
      displayName
      ... on com_enonic_app_intro_Person {
        data {
          dateofbirth
          photos {
            ... on media_Image {
              imageUrl(scale: "width(500)")
            }
          }
          bio(processHtml: {
              type: absolute
              imageWidths: [
                200,
                400,
              ]
              imageSizes: "(max-width: 600px) 200px, 50vw"
            }) {
              images {
                image {
                  _id
                  _path
                  type
                }
                ref
                style {
                  name
                  aspectRatio
                  filter
                }
              }
              links {
                content {
                  _id
                  _name
                  _path
                  type
                }
                media {
                  content {
                    _id
                    _name
                    _path
                    type
                    ... on media_Image {
                      mediaUrl
                    }
                  }
                  intent
                }
                ref
                uri
              }
              macros {
                ref
                name
                descriptor
                config {
                  filmography {
                    heading
                  }
                }
              }
              processedHtml
            }
        }
      }
    }
  }
}`;

export default query;
