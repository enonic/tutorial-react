export const RICH_TEXT_QUERY: string = `query RichTextQuery($siteKey: String!) {
  guillotine(siteKey: $siteKey) {
    getSite {
      ... on portal_Site {
        components {
          text {
            value(processHtml: {
              type: absolute
              imageWidths: [
                2048,
                1024
              ]
              imageSizes: "juhu"
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
                } # media
                ref
                uri
              } # links
              macrosAsJson
              processedHtml
            }
          }
        }
      }
    }
  }
}`;
