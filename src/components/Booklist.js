import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { BookForm } from './BookForm'
import axios from 'axios'

export const Booklist = ({ token }) => {
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [books, setBooks] = useState(null)

  useEffect(() => {
    axios
      .get('https://drf-library-api.herokuapp.com/api/books', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
      })
      .then((res) => setBooks(res.data))
  }, [token, setBooks])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search !== '') {
      axios
        .get(
          `https://drf-library-api.herokuapp.com/api/books?search=${search}`,
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `token ${token}`,
            },
          }
        )
        .then((res) => {
          setBooks(res.data)
          setSearch('')
          setError('')
        })
    }
    return setError('Must add search term')
  }

  return (
    <div
      className="
    uk-cover-container
    uk-container
    uk-flex-middle
    uk-flex-column
    uk-margin"
    >
      <input
        type="text"
        className="uk-input uk-margin-bottom"
        placeholder="search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="uk-button"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
      {error !== '' ? <p style={{ color: 'red' }}>{error}</p> : null}
      {books ? (
        books.map((book) => {
          return (
            <div
              key={book.pk}
              className="uk-flex uk-flex-column uk-align-center uk-width-1-2@m uk-card uk-card-default"
            >
              <h3 className="uk-text-left-">{book.title}</h3>
              <div className="uk-card-body">
                {book.featured && (
                  <>
                    Featured <i className="fas fa-trophy uk-margin-left" />
                  </>
                )}
                <Link to={`/books/${book.pk}`}>View Details</Link>
              </div>
            </div>
          )
        })
      ) : (
        <div>No results found</div>
      )}
      <Outlet />
      {token && <BookForm token={token} setBooks={setBooks} />}
    </div>
  )
}
