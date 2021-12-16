import { useState } from 'react'
import axios from 'axios'

export const Register = ({ setAuth }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post('https://drf-library-api.herokuapp.com/api/auth/users', {
        email: email,
        username: username,
        password: password,
      })
      .then((res) => {
        return axios
          .post('https://drf-library-api.herokuapp.com/auth/token/login', {
            username: username,
            password: password,
          })
          .then((data) => {
            if (data && data.data.auth_token) {
              setAuth(data.data.auth_token)
            }
          })
      })
  }

  const handleChange = (inputType, event) => {
    if (inputType === 'username') {
      setUsername(event.target.value)
    }
    if (inputType === 'password') {
      setPassword(event.target.value)
    }
    if (inputType === 'email') {
      setEmail(event.target.value)
    }
  }

  return (
    <div className="uk-container uk-flex uk-flex-center uk-flex-middle uk-height-large">
      <form className="uk-form-horizontal" onSubmit={handleSubmit}>
        <label className="uk-form-label">email</label>
        <input
          className="uk-input"
          type="text"
          placeholder="jane@gmail.com"
          value={email}
          onChange={(e) => handleChange('email', e)}
        />
        <label className="uk-form-label">Username</label>
        <input
          className="uk-input"
          type="text"
          placeholder="janedoge123"
          value={username}
          onChange={(e) => handleChange('username', e)}
        />
        <label className="uk-form-label">Password</label>
        <input
          className="uk-input"
          placeholder="password"
          type="password"
          // using state to pass a value to this attribute
          // makes this a controlled component
          value={password}
          onChange={(e) => handleChange('password', e)}
        />
        <div id="form-buttons">
          <button className="uk-button uk-margin-right" type="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  )
}
