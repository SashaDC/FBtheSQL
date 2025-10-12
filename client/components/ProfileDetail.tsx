import { useState } from 'react'
import { Link } from 'react-router'
import EditUserForm from './EditUserForm'
import type { UserData } from '../../models/users'
import {
  useDeleteUserById,
  useEditUser,
  useGetUserPlusFriends,
} from '../hooks/useUsers'
import { useOutletContext } from 'react-router'
import { Credentials } from '../../models/outletContext'

interface Props {
  userId: number
}

export default function ProfileDetail({ userId }: Props) {
  const { setCredentials, credentials } = useOutletContext<Credentials>()
  const { data: user, isError, isPending } = useGetUserPlusFriends(userId)
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false)
  const editUser = useEditUser(userId)
  const deleteUser = useDeleteUserById(userId)

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError || !user) {
    return <p>{`Error retrieving profile information`}</p>
  }

  const submitForm = (editedUser: UserData) => {
    console.log(editedUser)
    editUser.mutate({ ...editedUser, id: userId })
    setEditFormVisible(false)
  }

  const handleClick = () => {
    setEditFormVisible(true)
  }

  const handleDelete = () => {
    deleteUser.mutate(userId)
    setCredentials(null)
    sessionStorage.removeItem('credentials')
  }

  return (
    <div>
      <div className="profile">
        {!editFormVisible && (
          <div>
            <h2>{user.username}</h2>
            <img
              className="thumbnail"
              src={user.avatarUrl}
              alt={`Avatar of ${user.username}`}
            />
            <p>{`${user.firstName} ${user.lastName}`}</p>
            <p>{user.email}</p>
            {credentials.userId === userId && (
              <>
                <button onClick={handleClick}>Edit profile</button>
                <button onClick={handleDelete}>Delete account</button>
              </>
            )}

            <div className="friends">
              <h3>Friends</h3>
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
        {editFormVisible && (
          <EditUserForm
            submitForm={submitForm}
            submitLabel="Save changes"
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
    </div>
  )
}
