import { useAddNewFriendship } from '../hooks/useFriends.ts'
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
  const addFriend = useAddNewFriendship(5, userId)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (e.currentTarget.id) {
      case 'addUser':
        addNewUser.mutate({
          avatarUrl: '/images/avatar1.svg',
          fullName: 'Sailor Brian',
          accountName: 'ShipMate',
          email: 'brian@sea.co.nz',
        })
        break
      case 'editUser':
        editUser.mutate({
          id: userId,
          avatarUrl: '/images/avatar2.svg',
          fullName: 'Jacky Jim',
          accountName: 'ShipMate',
          email: 'jimmybob@gmail.com',
        })
        break
      case 'addFriend':
        addFriend.mutate({ userId1: 5, userId2: userId })
        break
    }
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
        <button id="addUser" onClick={handleClick}>
          Add user
        </button>
        <button id="editUser" onClick={handleClick}>
          Edit user
        </button>
        <button id="addFriend" onClick={handleClick}>
          Add Friend
        </button>
        {/* <button id="editFriend" onClick={handleClick}>
          Edit Friend
        </button> */}
      </div>
    </>
  )
}

export default UserPage
