import { useOutletContext } from 'react-router'
import { Credentials } from '../../models/outletContext.ts'
import Profile from './Profile.tsx'

function UserPage() {
  const { setCredentials } = useOutletContext<Credentials>()

  return (
    <>
      <div className="app">
        <Profile />
        <button
          className="button"
          onClick={() => {
            // This signs the user out of the account.
            setCredentials(false)
            sessionStorage.removeItem('credentials')
          }}
        >
          Log Out
        </button>
      </div>
    </>
  )
}

export default UserPage
