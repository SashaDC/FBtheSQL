import { useState, ChangeEvent } from 'react'
import { Link, useOutletContext, useNavigate } from 'react-router'
import { Credentials } from '../../models/outletContext'
import { useCheckLogin } from '../hooks/useUsers'
import { UserLogin } from '../../models/users'

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

  const loginCheck = useCheckLogin()

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    loginCheck.mutate(formState, {
      onSuccess: (data: UserLogin) => {
        if (!data.id) {
          alert(data.message)
        } else {
          setCredentials({ loggedIn: true, userId: data.id })
          navigate('/')
        }
      },
    })
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
