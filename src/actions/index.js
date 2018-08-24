import axios from 'axios';
import { FETCH_BOOKS, SAVE_BOOK, DELETE_BOOK } from './types';
import filterTitle from '../helpers/filterTitle'

const ROOT_URL = "https://www.googleapis.com/books/v1/volumes?q=how";

export const fetchBooks = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}`);

  let books = {};
  let id = 0;
  for(let i=0; i<9; i++){
    let book = res.data.items[i].volumeInfo;
    let imgSrc = book.imageLinks ? book.imageLinks.thumbnail.replace("zoom=1", "zoom=100") : 'https://www.classicposters.com/images/nopicture.gif'
    books[i] = {id: id++,
                title: filterTitle(book.title),
                author: book.authors[0], 
                img: imgSrc,
                published: book.publishedDate,
                content: book.description
    }
  }
  dispatch({ type: FETCH_BOOKS, payload: books });
}

export const saveBook = (values, callback) => dispatch => {
  callback();
  values.title = filterTitle(values.title);
  dispatch({ type: SAVE_BOOK, payload: values });
}

export const deleteBook = id => dispatch => {
  dispatch({ type: DELETE_BOOK, payload: id });
}
