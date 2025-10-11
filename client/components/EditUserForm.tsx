import { useState, ChangeEvent } from 'react'
import type { UserData } from '../../models/users'

interface Props {
  handleSubmit: (
    updatedUser: UserData,
    evt: React.FormEvent<HTMLFormElement>,
  ) => void
  currentUser?: UserData
  submitLabel: string
}

export default function EditUserForm({
  handleSubmit,
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

  return (
    <>
      <form onSubmit={(evt) => handleSubmit(formState, evt)} className="form">
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
        <div></div>
        <button type="submit" className="button">
          {submitLabel}
        </button>
      </form>
    </>
  )
}
