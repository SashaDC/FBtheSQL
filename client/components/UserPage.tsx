import { useOutletContext } from 'react-router'
import { Credentials } from '../../models/outletContext.ts'
import Profile from './Profile.tsx'
import Posts from './Posts.tsx'
import CreatePosts from './CreatePosts.tsx'

function UserPage() {
  const { credentials, setCredentials } = useOutletContext<Credentials>()
  return (
    <>
      <div className="app">
        {/* fallback number because userId can be null */}
        <Profile userId={credentials.userId ?? 0} />
        <CreatePosts userId={credentials.userId ?? 0} />
        <Posts />
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
