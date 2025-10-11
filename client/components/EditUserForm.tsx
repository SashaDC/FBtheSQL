import { useState, ChangeEvent } from 'react'
import type { UserData } from '../../models/users'

interface Props {
  submitForm: (updatedUser: UserData) => void
  currentUser?: UserData
  submitLabel: string
}

export default function EditUserForm({
  submitForm,
  currentUser,
  submitLabel,
}: Props) {
  // The useState/handleChange allows the users text to show while typing
  const [formState, setFormState] = useState<UserData>(
    currentUser
      ? { ...currentUser }
      : {
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          avatarUrl: '',
        },
  )

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
    // Need to capitalize the first character of both first/last name.
    // TO DO: set it up so that it verifies the data (No numbers/characters for first/last name)
    // TO DO: check against database whether the data is there or not.
    // If comes back as true: mention what needs to be changed, If it comes back false: add the new details to database and "login".
    // Note: maybe make the checking/verifying data it's own component/hook??
    submitForm({ ...formState })
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
        <fieldset className="flex-container">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <label
                className="flex-item"
                key={`label-avatar${i + 1}`}
                htmlFor={`avatar${i + 1}`}
              >
                <img
                  className="thumbnail"
                  src={`/images/avatar${i + 1}.svg`}
                  alt={`Avatar ${i + 1}`}
                />
                <input
                  type="radio"
                  value={`/images/avatar${i + 1}.svg`}
                  name="avatarUrl"
                  onChange={handleChange}
                />
                Avatar {i + 1}
              </label>
            ))}
        </fieldset>
        <div></div>
        <button type="submit" className="button">
          {submitLabel}
        </button>
      </form>
    </>
  )
}
