import { useState, ChangeEvent } from 'react'
import { Link } from 'react-router'

export default function SignUpForm() {
  // The useState/handleChange allows the users text to show while typing
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
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

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const full_Name = `${formState.firstName} ${formState.lastName}`
    console.log(full_Name)
    // TO DO: set it up so that it verifies the data (No numbers/characters for first/last name)
    // TO DO: check against database whether the data is there or not.
    // If comes back as true: mention what needs to be changed, If it comes back false: add the new details to database and "login"
    // Note: maybe make the checking/verifying data it's own component/hook??
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={formState.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formState.lastName}
          onChange={handleChange}
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="userName"
          name="userName"
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
          Sign Up
        </button>
      </form>
      {/* This gives the user an option to login rather than signing up */}
      <Link to="/login" className="button">
        Have An Account?
      </Link>
      <br />
      <Link to="/" className="button">
        Back
      </Link>
    </>
  )
}
