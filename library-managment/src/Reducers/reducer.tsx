const initState = {
    authors: [
        {
            key: '1',
            firstName: 'J. K.',
            lastName: 'Rowling',
            booksCount: 3
        },
        {
            key: '2',
            firstName: 'Leo',
            lastName: 'Tolstoy',
            booksCount: 2
        }
    ],

    books: [
        {
            index: 1,
            authorKey: 1,
            title: 'Harry potter',
            score: 4.75,
            subject: 'Fantasy',
            publishedDate: 2002,
        },
        {
            index: 2,
            authorKey: 1,
            title: 'Fantastic Beasts and Where to Find Them',
            score: 4.1,
            subject: 'Fantasy',
            publishedDate: 2005,
        },
        {
            index: 3,
            authorKey: 1,
            title: 'Cormoran Strike',
            score: 4.75,
            subject: 'Crime fiction',
            publishedDate: 2010,
        },
        {
            index: 4,
            authorKey: 2,
            title: 'War and Peace',
            score: 4.9,
            subject: '‎Historical',
            publishedDate: 1950,
        },
        {
            index: 5,
            authorKey: 2,
            title: 'Anna Karenina',
            score: 5,
            subject: 'DramaRomance',
            publishedDate: 1959,
        },
    ],

    filteredBooks: []
}

const reducer = (state = initState, action: any) => {
    const payload = action.payload;
    const { books, authors } = state;

    switch (action.type) {
        case "CREATE_NEW_AUTHOR":
            return {
                ...state,
                authors: [...authors, {
                    key: `${authors.length + 1}`,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    booksCount: 0,
                    books: []
                }]
            }

        case "CREATE_NEW_BOOK":
            const newAuthorsList = [...authors];
            newAuthorsList[payload.authorKey - 1].booksCount = authors[payload.authorKey - 1].booksCount + 1;
            return {
                ...state,
                books: [...books, {
                    index: `${books.length + 1}`,
                    title: payload.title,
                    score: payload.score,
                    subject: payload.subject,
                    authorKey: payload.authorKey,
                }],
                authors: newAuthorsList
            }

        case "UPDATE_BOOK":
            return {
                ...state,
                books: payload
            }

        case "UPDATE_AUTHOR":
            return {
                ...state,
                authors: payload
            }

        case "FILTER_BOOKS":
            return {
                ...state,
                filteredBooks: payload
            }

        default:
            return state
    }
}
export default reducer;