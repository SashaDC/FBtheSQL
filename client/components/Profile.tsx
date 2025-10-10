import { useGetUserById } from '../hooks/useUsers.ts'
import { Link } from 'react-router'

export default function Profile() {
  //TODO = remove hardcoding of userid
  const { data: user, isError, isPending } = useGetUserById(1)

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError || !user) {
    return <p>{`Error retrieving profile information`}</p>
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
        <Link to={`/edit/${user.id}`}>Edit profile</Link>
      </div>
    </div>
  )
}
