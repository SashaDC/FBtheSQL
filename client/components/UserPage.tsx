import { useOutletContext } from 'react-router'
import {
  useGetAllUsers,
  useGetUserById,
  useAddNewUser,
  useEditUser,
} from '../hooks/useUsers.ts'
import { Credentials } from '../../models/outletContext.ts'

function UserPage() {
  const { setCredentials } = useOutletContext<Credentials>()

  const { data: allUsers } = useGetAllUsers()
  const { data: specifiedUser } = useGetUserById(4)
  console.log(allUsers, specifiedUser)
  const addNewUser = useAddNewUser()
  const editUser = useEditUser(4)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.id == 'add'
      ? addNewUser.mutate({
          avatarUrl: '/images/avatar1.svg',
          fullName: 'Sailor Brian',
          accountName: 'ShipMate',
          email: 'brian@sea.co.nz',
        })
      : editUser.mutate({
          id: 4,
          avatarUrl: '/images/avatar2.svg',
          fullName: 'Jacky Jim',
          accountName: 'ShipMate',
          email: 'jimmybob@gmail.com',
        })
  }

  return (
    <>
      <div className="app">
        <h1>Fullstack Boilerplate!</h1>
        <button id="add" onClick={handleClick}>
          Add user
        </button>
        <button id="edit" onClick={handleClick}>
          Edit user
        </button>
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
