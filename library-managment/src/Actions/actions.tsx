interface AuthorSubmitData {
    firstName: string;
    lastName: string;
}

interface BookSubmitData {
    index: number,
    authorKey: number,
    title: string,
    score: number,
    subject: string,
    publishedDate: number,
  }
  
// actions
export const createNewAuthor = (author: AuthorSubmitData) => {
    return { type: "CREATE_NEW_AUTHOR", payload: author }
}

export const updateBooks = (booksList: any) => {
    return { type: "UPDATE_BOOK", payload: booksList }
}

export const createNewBook = (book: BookSubmitData) => {
    return { type: "CREATE_NEW_BOOK", payload: book }
}

export const updateAthors = (authorsList: AuthorSubmitData[]) => {
    return { type: "UPDATE_AUTHOR", payload: authorsList }
}

export const filterBooks = (booksList: BookSubmitData[]) => {
    return { type: "FILTER_BOOKS", payload: booksList }
}
