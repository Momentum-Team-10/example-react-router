import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const Book = ({ token }) => {
  const { bookId } = useParams()
  console.log('CHECK OUT THE PARAMS!!', useParams())
  const [bookObj, setBookObj] = useState(null)

  useEffect(() => {
    axios
      .get(`https://drf-library-api.herokuapp.com/api/books/${bookId}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        setBookObj(res.data)
      })
  }, [token])

  return (
    <>
      <Link to="/">Back to All Books</Link>
      {bookObj ? (
        <div className="uk-flex uk-cover-container uk-container uk-flex-column">
          <h3 className="uk-text-center uk-heading-large">{bookObj.title}</h3>
          <h3 className="uk-text-center uk-text">
            Publication date: {bookObj.publication_year}
          </h3>
          <p>By {bookObj.author}</p>
        </div>
      ) : (
        <div className="uk-flex uk-cover-container uk-container uk-flex-column">
          <h3 className="uk-text-center uk-heading-x-large">Book Not Found</h3>
        </div>
      )}
    </>
  )
}
