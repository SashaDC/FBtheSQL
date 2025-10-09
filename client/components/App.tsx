import { useGetAllUsers, useGetUserById } from '../hooks/useUsers.ts'

function App() {
  const { data: allUsers } = useGetAllUsers()
  const { data: specifiedUser } = useGetUserById(1)
  console.log(allUsers, specifiedUser)

  return (
    <>
      <div className="app">
        <h1>Fullstack Boilerplate!</h1>
      </div>
    </>
  )
}

export default App
