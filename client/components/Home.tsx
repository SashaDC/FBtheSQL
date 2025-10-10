import { Link, useOutletContext } from 'react-router'
import UserPage from './UserPage'
import { Credentials } from '../../models/outletContext'

// Currently just displays a button leading to either signup or login.
export default function Home() {
  // The useOutletContext passes down the useState from the parent component to all the children components.
  const { credentials } = useOutletContext<Credentials>()
  if (!credentials) {
    return (
      <>
        <Link to="sign_up" className="button">
          Sign Up!
        </Link>
        <Link to="login" className="button">
          Login!
        </Link>
      </>
    )
  }
  return (
    <>
      <UserPage />
    </>
  )
}
