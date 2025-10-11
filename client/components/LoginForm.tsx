import { useState, ChangeEvent } from 'react'
import { Link, useOutletContext, useNavigate } from 'react-router'
import { Credentials } from '../../models/outletContext'

export default function SignUpForm() {
  // The useOutletContext passes down the useState from the parent component to all the children components.
  const { setCredentials } = useOutletContext<Credentials>()
  // Navigates the routes.
  const navigate = useNavigate()

  // The useState/handleChange allows the users text to show while typing.
  const [formState, setFormState] = useState({
    username: '',
    email: '',
  })

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.currentTarget
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // TO DO: fix this
  // hardcoded value temporary.
  const userId = 1

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    // TO DO: check if data matches anything in database so that user can log in.
    // If it's not a match it needs to specify where they got an issue. (eg. Username or email doesn't exist, username or email incorrect.)
    // Note: maybe make it its own hook/component.
    setCredentials({ loggedIn: true, userId: userId })
    navigate('/')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formState.username}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
        />
        <div></div>
        <button type="submit" className="button">
          Login
        </button>
      </form>
      {/* This gives the user an option to sign up rather than logging in */}
      <Link to="/sign_up" className="button">
        Don&apos;t Have An Account?
      </Link>
      <br />
      <Link to="/" className="button">
        Back
      </Link>
    </>
  )
}
