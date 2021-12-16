import { useState } from 'react'
import axios from 'axios'

export const BookForm = ({ token, setSubmitted }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pubDate, setPubDate] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('https://drf-library-api.herokuapp.com/api/books',
      {
        title: title,
        author: author,
        publication_date: pubDate
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`
        }
      }
    ).then(res => {
      setSubmitted(true)
      setTitle('')
      setAuthor('')
      setPubDate('')
      return res
    })
  }

  const handleChange = (inputType, event) => {
    if (inputType === 'title') {
      setTitle(event.target.value)
    }
    if (inputType === 'author') {
      setAuthor(event.target.value)
    }
    if (inputType === 'publication date') {
      setPubDate(event.target.value)
    }
  }

  return (
    <div className='uk-container uk-flex uk-flex-center uk-flex-middle uk-height-large'>
      <form className='uk-form-horizontal' onSubmit={handleSubmit}>
        <label className='uk-form-label'>Title</label>
        <input
          className='uk-input'
          type='text'
          placeholder='Book title'
          value={title}
          onChange={(e) => handleChange('title', e)}
        />
        <label className='uk-form-label'>Author</label>
        <input
          className='uk-input'
          placeholder='Author'
          type='text'
              // using state to pass a value to this attribute
              // makes this a controlled component
          value={author}
          onChange={(e) => handleChange('author', e)}
        />
        <label className='uk-form-label'>Publication Date</label>
        <input
          className='uk-input uk-margin-bottom'
          placeholder='Publication date'
          type='text'
              // using state to pass a value to this attribute
              // makes this a controlled component
          value={pubDate}
          onChange={(e) => handleChange('publication date', e)}
        />
        <button className='uk-button'>Submit</button>
      </form>
    </div>
  )
}
