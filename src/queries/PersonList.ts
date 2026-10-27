const query = `query PersonListQuery {
    guillotine(project: "intro", branch: "master", scopeKey: "/") {
        queryDsl(
            first: 50
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
            displayName
            type
            ... on com_enonic_app_intro_Person {
                data {
                    photos {
                        ... on media_Image {
                            imageUrl(scale: "square(500)") { path queryString }
                        }
                    }
                }
            }
        }
    }
}`;

export default query;
