import { Link, useOutletContext, useNavigate } from 'react-router'
import { useAddNewUser } from '../hooks/useUsers'
import { Credentials } from '../../models/outletContext'
import type { UserData } from '../../models/users'
import EditUserForm from './EditUserForm'

export default function SignUpForm() {
  // The useOutletContext passes down the useState from the parent component to all the children components.
  const { setCredentials } = useOutletContext<Credentials>()
  // Navigates the routes.
  const navigate = useNavigate()

  const addNewUser = useAddNewUser()

  const submitForm = (updatedUser: UserData) => {
    // Adds info to database
    addNewUser.mutate(
      { ...updatedUser },
      {
        onSuccess: (data: number) => {
          if (!data) return
          setCredentials({ loggedIn: true, userId: data })
          navigate('/')
        },
      },
    )
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
