import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

export const Login = ({ isLoggedIn, setAuth }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errors, setErrors] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post('https://drf-library-api.herokuapp.com/auth/token/login', {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.auth_token) {
          setAuth(username, res.data.auth_token)
        }
      })
      .catch((error) => setErrors(error))
  }

  const handleChange = (inputType, event) => {
    if (inputType === 'username') {
      setUsername(event.target.value)
    }
    if (inputType === 'password') {
      setPassword(event.target.value)
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <div className="uk-container-small uk-flex uk-flex-center uk-flex-middle uk-height-large">
      {errors && (
        <div>
          <div className="uk-background-secondary uk-light uk-padding uk-panel uk-margin-medium-right">
            {errors.message}
          </div>
        </div>
      )}
      <form className="uk-form-horizontal" onSubmit={handleSubmit}>
        <label className="uk-form-label">Username</label>
        <input
          className="uk-input"
          type="text"
          placeholder="email@domain.com or janedoge123"
          value={username}
          onChange={(e) => handleChange('username', e)}
        />
        <label className="uk-form-label">Password</label>
        <input
          className="uk-input uk-margin-bottom"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => handleChange('password', e)}
        />
        <div id="form-buttons">
          <button className="uk-button uk-margin-right" type="submit">
            Login
          </button>
          <span>
            New to Bookify? &nbsp;
            <Link to="/register" className="uk-link uk-primary">
              Register Now
            </Link>
          </span>
        </div>
      </form>
    </div>
  )
}
