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

  const addNewUser = useAddNewUser()

  const submitForm = (updatedUser: UserData) => {
    // Adds info to database
    addNewUser.mutate(
      {
        username: formState.username,
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        avatarUrl: '/images/avatar1.svg',
      },
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
