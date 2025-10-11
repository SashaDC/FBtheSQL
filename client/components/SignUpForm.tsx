import { Link } from 'react-router'
import { useAddNewUser } from '../hooks/useUsers'
import type { UserData } from '../../models/users'
import EditUserForm from './EditUserForm'

export default function SignUpForm() {
  const addNewUser = useAddNewUser()

  const handleSubmit = (
    updatedUser: UserData,
    evt: React.FormEvent<HTMLFormElement>,
  ) => {
    evt.preventDefault()
    // Need to capitalize the first character of both first/last name.
    // TO DO: set it up so that it verifies the data (No numbers/characters for first/last name)
    // TO DO: check against database whether the data is there or not.
    // If comes back as true: mention what needs to be changed, If it comes back false: add the new details to database and "login".
    // Note: maybe make the checking/verifying data it's own component/hook??

    // Adds info to database
    addNewUser.mutate(updatedUser)
  }

  return (
    <>
      <EditUserForm handleSubmit={handleSubmit} submitLabel="Sign up" />
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
