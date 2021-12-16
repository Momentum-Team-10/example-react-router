import '../styles.css'
import { Link, useLocation } from 'react-router-dom'
export const Navbar = ({ isLoggedIn, username, setAuth }) => {
  const location = useLocation()

  return (
    <nav className="uk-navbar uk-navbar-container">
      <div className="uk-navbar-left">
        <Link className="uk-logo uk-margin-left" to="/">
          Bookify
        </Link>
      </div>
      {location.pathname !== '/login' && (
        <div className="uk-navbar-right uk-flex">
          <ul className="uk-navbar-nav">
            <li className="uk-margin-right">
              {isLoggedIn ? (
                <Link
                  to="/login"
                  onClick={() => {
                    setAuth(null, null)
                  }}
                >
                  Logout
                </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            {username && (
              <li className="uk-margin-right">
                <Link to="/account">Hello {username}! </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  )
}
