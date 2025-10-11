import { useState } from 'react'
import { Link } from 'react-router'
import EditUserForm from './EditUserForm'
import DeleteAccount from './DeleteAccount'
import type { UserData } from '../../models/users'
import { useEditUser, useGetUserPlusFriends } from '../hooks/useUsers'

interface Props {
  userId: number
}

export default function ProfileDetail({ userId }: Props) {
  const { data: user, isError, isPending } = useGetUserPlusFriends(userId)
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false)
  const editUser = useEditUser(userId)

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError || !user) {
    return <p>{`Error retrieving profile information`}</p>
  }

  const submitForm = (editedUser: UserData) => {
    console.log(editedUser)
    editUser.mutate({ ...editedUser, id: userId })
  }

  const handleClick = () => {
    setEditFormVisible(true)
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <div>
        {!editFormVisible && (
          <div>
            <img
              className="thumbnail"
              src={user.avatarUrl}
              alt={`Avatar of ${user.username}`}
            />
            <p>Name: {`${user.firstName} ${user.lastName}`}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleClick}>Edit profile</button>
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
          </div>
        )}
        {/* TODO - edit form and delete account should only be visible if this is the users profile */}
        {editFormVisible && (
          <EditUserForm
            submitForm={submitForm}
            submitLabel="Save profile changes"
            currentUser={{
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              avatarUrl: user.avatarUrl,
            }}
          />
        )}
      </div>
      <DeleteAccount userId={user.id} />
    </div>
  )
}
