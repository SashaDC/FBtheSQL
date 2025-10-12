import { useOutletContext } from 'react-router'
import { Credentials } from '../../models/outletContext.ts'
import Profile from './Profile.tsx'
import Posts from './Posts.tsx'
import CreatePosts from './CreatePosts.tsx'

function UserPage() {
  const { credentials, setCredentials } = useOutletContext<Credentials>()
  return (
    <>
      <div className="flex-container">
        <div className="flex-item">
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
          <CreatePosts userId={credentials.userId ?? 0} />
        </div>
        {/* fallback number because userId can be null */}
        <div className="flex-item">
          <Profile userId={credentials.userId ?? 0} />
        </div>
        <div className="flex-item post-container">
          <Posts />
        </div>
      </div>
    </>
  )
}

export default UserPage
