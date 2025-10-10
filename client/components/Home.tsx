import { Link } from 'react-router'
import UserPage from './UserPage'

// Currently just displays a button leading to either signup or login
export default function Home() {
  return (
    <>
      <Link to="sign_up" className="button">
        Sign Up!
      </Link>
      <Link to="login" className="button">
        Login!
      </Link>
      <UserPage />
    </>
  )
}
