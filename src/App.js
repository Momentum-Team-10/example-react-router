import { Login } from './components/Login'
import { Booklist } from './components/Booklist'
import { Navbar } from './components/Navbar'
import { Register } from './components/Register'
import { Book } from './components/Book'
import Account from './components/Account'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'

function App() {
  const [token, setToken] = useLocalStorageState('bookifyAuthToken', null)
  const [username, setUsername] = useLocalStorageState('bookifyUsername', '')

  function setAuth(username, token) {
    setUsername(username)
    setToken(token)
  }

  const isLoggedIn = username && token

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} username={username} setAuth={setAuth} />
      <Routes>
        <Route
          path="/login"
          element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/register" element={<Register setAuth={setAuth} />} />
        <Route
          path="/account"
          element={<Account token={token} username={username} />}
        />
        <Route path="/" element={<Booklist token={token} />} />
        <Route path="books/:bookId" element={<Book token={token} />} />
      </Routes>
    </Router>
  )
}

export default App
