import { Link } from 'react-router'
import { useAddNewUser } from '../hooks/useUsers'
import type { UserData } from '../../models/users'
import EditUserForm from './EditUserForm'

export default function SignUpForm() {
  const addNewUser = useAddNewUser()

  const submitForm = (updatedUser: UserData) => {
    // Adds info to database
    addNewUser.mutate(updatedUser)
  }

  return (
    <>
      <EditUserForm submitForm={submitForm} submitLabel="Sign up" />
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
