import { useDeleteUserById, useGetUserPlusFriends } from '../hooks/useUsers'
import { Link, useNavigate } from 'react-router'

interface Props {
  userId: number
}

export default function ProfileDetail({ userId }: Props) {
  const { data: user, isError, isPending } = useGetUserPlusFriends(userId)
  const deleteUser = useDeleteUserById(userId)
  const navigate = useNavigate()

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError || !user) {
    return <p>{`Error retrieving profile information`}</p>
  }

  const handleClick = () => {
    deleteUser.mutate(userId)
    navigate('/')
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <div>
        <img
          className="thumbnail"
          src={'/images/avatar1.svg'}
          alt={`Avatar of ${user.username}`}
        />
        <p>Name: {`${user.firstName} ${user.lastName}`}</p>
        <p>Email: {user.email}</p>
        {/* //TODO: have an edit user form at client route /edit/:id */}
        <Link to={`/edit/${user.id}`}>Edit profile</Link>
      </div>
      <div>
        <h3>Friends of {user.firstName}</h3>
        <ol>
          {user.friends[0] &&
            user.friends.map((friend) => (
              <li key={`friend${friend.id}`}>
                <Link
                  to={`/profile/${friend.id}`}
                >{`${friend.firstName + ' ' + friend.lastName}`}</Link>
              </li>
            ))}
        </ol>
      </div>
      <button onClick={handleClick}>Delete account</button>
    </div>
  )
}
