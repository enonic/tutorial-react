const query = `query PersonQuery($personId: ID!) {
    guillotine(project: "intro", branch: "master", scopeKey: "/") {
        get(key: $personId) {
            _id
            _path
            _name
            displayName
            ... on com_enonic_app_intro_Person {
                data {
                    dateofbirth
                    photos {
                        ... on media_Image {
                            imageUrl(scale: "width(1000)") { path queryString }
                            attachments {
                                name
                            }
                        }
                    }
                    bio(processHtml: { imageSrcWidth: 768, imageWidths: [400, 800, 1200], imageSizes: "(max-width: 800px) 100vw, 800px" }) {
                        processedHtml
                        links {
                            ref
                            uri
                            fragment
                            pageUrl { baseUrl path queryString }
                            media {
                                mediaUrl { path queryString }
                                intent
                                content {
                                    _id
                                }
                            }
                            content {
                                _id
                                _name
                                type
                            }
                        }
                        images {
                            ref
                            src { path queryString }
                            srcset {
                                width
                                imageUrl { path queryString }
                            }
                            image {
                                _id
                            }
                        }
                        macros {
                            ref
                            name
                            descriptor
                            config {
                                factbox {
                                    header
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}`;

export default query;
