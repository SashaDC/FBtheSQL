import { useOutletContext } from 'react-router'
import { Credentials } from '../../models/outletContext.ts'
import Profile from './Profile.tsx'

function UserPage() {
  const { credentials, setCredentials } = useOutletContext<Credentials>()
  return (
    <>
      <div className="app">
        {/* fallback number because userId can be null */}
        <Profile userId={credentials.userId ?? 0} />
        <button
          className="button"
          onClick={() => {
            // This signs the user out of the account.
            setCredentials(null)
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
