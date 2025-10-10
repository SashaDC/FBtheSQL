import {
  useGetAllUsers,
  useGetUserById,
  useAddNewUser,
  useEditUser,
  useGetUserPlusFriends,
} from '../hooks/useUsers.ts'

function UserPage() {
  const userId = 1
  const { data: allUsers } = useGetAllUsers()
  const { data: specifiedUser } = useGetUserById(userId)
  const { data: userAndFriends } = useGetUserPlusFriends(userId)
  console.log(allUsers, specifiedUser, userAndFriends)
  const addNewUser = useAddNewUser()
  const editUser = useEditUser(userId)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.id == 'add'
      ? addNewUser.mutate({
          avatarUrl: '/images/avatar1.svg',
          fullName: 'Sailor Brian',
          accountName: 'ShipMate',
          email: 'brian@sea.co.nz',
        })
      : editUser.mutate({
          id: userId,
          avatarUrl: '/images/avatar2.svg',
          fullName: 'Jacky Jim',
          accountName: 'ShipMate',
          email: 'jimmybob@gmail.com',
        })
  }

  return (
    <>
      <div>
        <h1>User data</h1>
        <h2>All users</h2>
        <ol>
          {allUsers?.map((user) => (
            <li key={`user${user.fullName}`}>
              {user.fullName}: {user.email}
            </li>
          ))}
        </ol>
        <h2>User {specifiedUser && `${specifiedUser.fullName}`}</h2>
        {userAndFriends && userAndFriends.friends[0] && (
          <div>
            <h3>{`${userAndFriends.fullName}'s`} friends</h3>
            <ol>
              {userAndFriends.friends.map((friend) => (
                <li key={friend.fullName}>{friend.fullName}</li>
              ))}
            </ol>
          </div>
        )}
        <button id="add" onClick={handleClick}>
          Add user
        </button>
        <button id="edit" onClick={handleClick}>
          Edit user
        </button>
      </div>
    </>
  )
}

export default UserPage
