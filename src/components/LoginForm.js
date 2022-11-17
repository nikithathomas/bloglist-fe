import { useState } from 'react'

const LoginForm = ({ handleLoginEvent }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (event) => {
    event.preventDefault()

    await handleLoginEvent({ username, password })
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={loginUser} className="login-form">
      <h2>Login</h2>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          className="login-form__username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          value={password}
          className="login-form__password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" className="login-form__submit">Login</button>
    </form>
  )
}

export default LoginForm
