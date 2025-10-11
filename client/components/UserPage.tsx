import { useOutletContext } from 'react-router'
import { Credentials } from '../../models/outletContext.ts'
import Profile from './Profile.tsx'

function UserPage() {
  const { setCredentials } = useOutletContext<Credentials>()

  return (
    <>
      <div className="app">
        {/* TODO - have userId relate to the login details so user can see their page */}
        <Profile userId={1} />
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
