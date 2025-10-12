import { useState, ChangeEvent } from 'react'
import type { UserData } from '../../models/users'
import { useCheckLogin } from '../hooks/useUsers'
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

  const loginCheck = useCheckLogin()

  const validateDetails = (details: UserData) => {
    const lengthCheck = Object.entries(details)
      .filter(([key]) => key !== 'avatarUrl')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .every(([key, value]) => typeof value === 'string' && value.length >= 3)
    const nameCheck = Object.entries(details)
      .filter(([key]) => key === 'firstName' || key === 'lastName')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .every(([key, value]) => !/^([^0-9]* )$/.test(value))
    const avatarCheck = !!details.avatarUrl
    if (!lengthCheck) {
      return 'All input fields must be 3 characters or longer.'
    }
    if (!nameCheck) {
      return 'Names must not contain numbers, special characters or spaces.'
    }
    if (!avatarCheck) {
      return 'You must select an avatar.'
    } else {
      return details
    }
  }

  const nameFormatting = (name: string) => {
    const newName = name.toLowerCase()
    return newName.charAt(0).toUpperCase() + newName.slice(1)
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const result = validateDetails(formState)
    if (typeof result == 'string') {
      alert(result)
      return
    }
    loginCheck.mutate(formState, {
      onSuccess: (data) => {
        if (data.id || data.message == 'Incorrect Details') {
          alert('Username or Email already in use')
          return
        } else {
          return formState
        }
      },
    })

    const formattedState = {
      ...formState,
      firstName: nameFormatting(formState.firstName),
      lastName: nameFormatting(formState.lastName),
    }
    submitForm(formattedState)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form" id="edit-user-form">
        <h3>Edit your profile</h3>

        <div className="flex-container">
          <label htmlFor="firstName">
            First Name:
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formState.firstName}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="lastName">
            Last Name:
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formState.lastName}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="username">
            Username:
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formState.username}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="email">
            Email:
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <fieldset>
          <h4>Select an avatar</h4>
          <div className="flex-container">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <label
                  className="flex-item avatar"
                  key={`label-avatar${i + 1}`}
                  htmlFor={`avatar${i + 1}`}
                >
                  <img
                    className="thumbnail"
                    src={`/images/avatar${i + 1}.svg`}
                    alt={`Avatar ${i + 1}`}
                  />
                  <br></br>
                  <input
                    type="radio"
                    value={`/images/avatar${i + 1}.svg`}
                    name="avatarUrl"
                    onChange={handleChange}
                  />
                  Avatar {i + 1}
                </label>
              ))}
          </div>
        </fieldset>
        <div className="left">
          <button type="submit" className="button">
            {submitLabel}
          </button>
        </div>
      </form>
    </>
  )
}
